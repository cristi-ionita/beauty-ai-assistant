"use client";

import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type DashboardActionsProps = {
  businessType: string;
  topic: string;
  language: string;
  platform: string;
  tone: string;
  goal: string;
  postCount: number;

  creditsLeft: number | null;
  imageCreditsLeft: number | null;

  stripeCustomerId: string | null;

  setLoading: (value: boolean) => void;
  setImageLoading: (value: boolean) => void;

  setPosts: (value: any[]) => void;
  setGeneratedImage: (value: string | null) => void;

  setCreditsLeft: (value: number | null) => void;
  setImageCreditsLeft: (value: number | null) => void;
  setPlan: (value: string | null) => void;

  setShowUpgradeModal: (value: boolean) => void;

  getCurrentUserOrRedirect: () => Promise<any>;
};

export function useDashboardActions({
  businessType,
  topic,
  language,
  platform,
  tone,
  goal,
  postCount,

  creditsLeft,
  imageCreditsLeft,

  stripeCustomerId,

  setLoading,
  setImageLoading,

  setPosts,
  setGeneratedImage,

  setCreditsLeft,
  setImageCreditsLeft,
  setPlan,

  setShowUpgradeModal,

  getCurrentUserOrRedirect,
}: DashboardActionsProps) {
  async function generatePosts() {
    if (!topic.trim()) {
      toast.error(
        "Please enter a topic, promotion, service, offer or campaign idea first"
      );

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
          businessType,
          topic,
          platform,
          tone,
          goal,

          prompt: `
You are a world-class advertising creative director.

Create a premium square social media advertisement image for a ${businessType}.

Business type:
${businessType}

Business goal:
${goal}

Platform:
${platform}

Tone:
${tone}

Target content idea:
${topic}

IMPORTANT:
Do NOT copy the user text directly onto the image.
Do NOT create posters with large blocks of text.
Instead, transform the idea into a visually powerful marketing concept.

The image must:
- feel premium and cinematic
- look like a real luxury brand advertisement
- use professional lighting
- have modern composition
- create emotion and desire
- be visually clean and elegant
- look highly realistic
- be suitable for viral social media marketing
- be specific to the selected business type
- feel like an expensive commercial campaign

Style direction:
- luxury commercial photography
- dramatic lighting
- realistic textures
- high-end brand aesthetic
- modern marketing campaign
- visually rich composition
- depth of field
- cinematic atmosphere
- premium color grading
- polished editorial look

If text appears:
- keep it minimal
- elegant typography only
- short premium headline only
- no long paragraphs
- no cluttered text
- no misspelled words

Avoid:
- distorted hands
- distorted faces
- too much text
- low quality typography
- generic AI look
- amateur design
- poster style layouts
- random logos
- watermarks

The final result should look like a €10,000 professional advertising campaign.
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
        window.location.replace("/login");
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
        window.location.replace("/login");
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
    window.location.replace("/");
  }

  return {
    generatePosts,
    generateImage,
    upgradeToPlan,
    manageSubscription,
    logout,
  };
}