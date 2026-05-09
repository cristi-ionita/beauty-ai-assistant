"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import type { GeneratedPost } from "@/types/dashboard";

export function useDashboard() {
  const [businessType, setBusinessType] = useState("Restaurant");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Friendly");
  const [goal, setGoal] = useState("Get bookings");
  const [postCount, setPostCount] = useState(3);

  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [creditsLeft, setCreditsLeft] = useState<number | null>(null);
  const [imageCreditsLeft, setImageCreditsLeft] = useState<number | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const isPaid = plan === "normal" || plan === "pro";

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        await supabase.auth.signOut();
        window.location.href = "/";
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("success") === "true") {
      toast.success("Upgrade successful. Your plan is now active.");
      window.history.replaceState({}, "", "/dashboard");
    }

    if (params.get("canceled") === "true") {
      toast.error("Checkout canceled.");
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        await supabase.auth.signOut();
        window.location.href = "/";
        return;
      }

      const { data: creditData, error: creditError } = await supabase
        .from("user_credits")
        .select("credits, image_credits, plan, stripe_customer_id")
        .eq("user_id", user.id)
        .single();

      if (creditError) {
        console.error("Failed to load user credits:", creditError);
        toast.error("Could not load your account data");
      }

      if (creditData) {
        setPlan(creditData.plan);
        setCreditsLeft(creditData.credits);
        setImageCreditsLeft(creditData.image_credits);
        setStripeCustomerId(creditData.stripe_customer_id);
      }

      setCheckingAuth(false);
    }

    checkUser();
  }, []);

  async function getCurrentUserOrRedirect() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      await supabase.auth.signOut();
      window.location.href = "/";
      return null;
    }

    return user;
  }

  async function generatePosts() {
    if (!topic.trim()) {
      toast.error("Please enter a topic, promotion, service, offer or campaign idea first");
      return;
    }

    try {
      setLoading(true);

      const user = await getCurrentUserOrRedirect();

      if (!user) return;

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessType,
          topic,
          language,
          platform,
          tone,
          goal,
          postCount,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "No credits left") {
          setShowUpgradeModal(true);
        } else {
          toast.error(data.error || "AI generation failed");
        }

        return;
      }

      setPosts(data.result);

      toast.success("Posts generated successfully");

      if (data.creditsLeft !== undefined) {
        setCreditsLeft(data.creditsLeft);
      }

      if (data.imageCreditsLeft !== undefined) {
        setImageCreditsLeft(data.imageCreditsLeft);
      }

      if (data.plan) {
        setPlan(data.plan);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function generateImage() {
    if (!topic.trim()) {
      toast.error("Please enter a topic before generating an image");
      return;
    }

    if (imageCreditsLeft !== null && imageCreditsLeft <= 0) {
      setShowUpgradeModal(true);
      return;
    }

    try {
      setImageLoading(true);

      const user = await getCurrentUserOrRedirect();

      if (!user) return;

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          prompt: `
Create a premium square social media marketing image for a ${businessType}.

Business type:
${businessType}

Topic / promotion / campaign:
${topic}

Platform:
${platform}

Tone:
${tone}

Goal:
${goal}

Visual direction:
professional local business advertising image, clean composition, premium lighting, modern commercial style, high quality, platform-ready social media creative, relevant to the selected business type, no unreadable text, no distorted faces, no logos, no watermarks.
`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "No image credits left") {
          setShowUpgradeModal(true);
        } else {
          toast.error(data.error || "Image generation failed");
        }

        return;
      }

      setGeneratedImage(data.image);

      if (data.imageCreditsLeft !== undefined) {
        setImageCreditsLeft(data.imageCreditsLeft);
      } else if (imageCreditsLeft !== null) {
        setImageCreditsLeft(imageCreditsLeft - 1);
      }

      toast.success("Image generated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Image generation failed");
    } finally {
      setImageLoading(false);
    }
  }

  async function upgradeToPlan(planType: "normal" | "pro") {
    try {
      const user = await getCurrentUserOrRedirect();

      if (!user || !user.email) {
        window.location.href = "/";
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          planType,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Checkout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Stripe checkout failed");
    }
  }

  async function manageSubscription() {
    try {
      const user = await getCurrentUserOrRedirect();

      if (!user || !user.email) {
        window.location.href = "/";
        return;
      }

      const response = await fetch("/api/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: stripeCustomerId,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Portal failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Stripe portal failed");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return {
    businessType,
    setBusinessType,

    topic,
    setTopic,

    language,
    setLanguage,

    platform,
    setPlatform,

    tone,
    setTone,

    goal,
    setGoal,

    postCount,
    setPostCount,

    posts,
    generatedImage,

    loading,
    imageLoading,
    checkingAuth,

    creditsLeft,
    imageCreditsLeft,
    plan,

    showUpgradeModal,
    setShowUpgradeModal,

    isPaid,

    generatePosts,
    generateImage,

    upgradeToPlan,
    manageSubscription,
    logout,
  };
}