"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import type { GeneratedPost } from "@/types/dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GeneratorForm from "@/components/dashboard/GeneratorForm";
import ResultsPanel from "@/components/dashboard/ResultsPanel";

export default function DashboardPage() {
  const [businessType, setBusinessType] = useState("Barbershop");
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

  const isPaid = plan === "normal" || plan === "pro";

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
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { data: creditData, error } = await supabase
        .from("user_credits")
        .select("credits, image_credits, plan, stripe_customer_id")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to load user credits:", error);
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

  async function generatePosts() {
    if (!topic.trim()) {
      toast.error("Please enter a topic or promotion first");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

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
        toast.error(data.error || "AI generation failed");
        return;
      }

      setPosts(data.result);
      toast.success("Posts generated successfully");

      if (data.creditsLeft !== undefined) {
        setCreditsLeft(data.creditsLeft);
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
      toast.error("No image credits left. Upgrade your plan to generate more images.");
      return;
    }

    try {
      setImageLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          prompt: `
Create a premium square social media marketing image for a ${businessType}.

Topic:
${topic}

Platform:
${platform}

Tone:
${tone}

Goal:
${goal}

Visual direction:
modern beauty industry aesthetic, premium lighting, clean composition, elegant colors, professional advertising image, no unreadable text, no distorted faces, high quality, suitable for social media.
`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Image generation failed");
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !user.email) {
        window.location.href = "/login";
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !user.email) {
        window.location.href = "/login";
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
    window.location.href = "/login";
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <p className="text-zinc-400">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <DashboardHeader
          plan={plan}
          creditsLeft={creditsLeft}
          imageCreditsLeft={imageCreditsLeft}
          onUpgradeNormal={() => upgradeToPlan("normal")}
          onUpgradePro={() => upgradeToPlan("pro")}
          onManageSubscription={manageSubscription}
          onLogout={logout}
        />

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <GeneratorForm
            businessType={businessType}
            setBusinessType={setBusinessType}
            language={language}
            setLanguage={setLanguage}
            platform={platform}
            setPlatform={setPlatform}
            tone={tone}
            setTone={setTone}
            goal={goal}
            setGoal={setGoal}
            postCount={postCount}
            setPostCount={setPostCount}
            topic={topic}
            setTopic={setTopic}
            isPro={isPaid}
            creditsLeft={creditsLeft}
            loading={loading}
            imageLoading={imageLoading}
            onGeneratePosts={generatePosts}
            onGenerateImage={generateImage}
          />

          <ResultsPanel posts={posts} generatedImage={generatedImage} />
        </div>
      </div>
    </main>
  );
}