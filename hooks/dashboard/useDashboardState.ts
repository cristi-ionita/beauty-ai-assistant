"use client";

import { useState } from "react";
import type { GeneratedPost } from "@/types/dashboard";

export function useDashboardState() {
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

  const [imageHistoryVersion, setImageHistoryVersion] = useState(0);

  const isPaid = plan === "normal" || plan === "pro";

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
    setPosts,

    generatedImage,
    setGeneratedImage,

    loading,
    setLoading,

    imageLoading,
    setImageLoading,

    checkingAuth,
    setCheckingAuth,

    creditsLeft,
    setCreditsLeft,

    imageCreditsLeft,
    setImageCreditsLeft,

    plan,
    setPlan,

    stripeCustomerId,
    setStripeCustomerId,

    showUpgradeModal,
    setShowUpgradeModal,

    imageHistoryVersion,
    setImageHistoryVersion,

    isPaid,
  };
}