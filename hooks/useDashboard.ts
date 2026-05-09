"use client";

import { useMemo } from "react";

import { useDashboardState } from "@/hooks/dashboard/useDashboardState";
import { useDashboardAuth } from "@/hooks/dashboard/useDashboardAuth";
import { useDashboardActions } from "@/hooks/dashboard/useDashboardActions";

export function useDashboard() {
  const state = useDashboardState();

  const { getCurrentUserOrRedirect } = useDashboardAuth({
    setPlan: state.setPlan,
    setCreditsLeft: state.setCreditsLeft,
    setImageCreditsLeft: state.setImageCreditsLeft,
    setStripeCustomerId: state.setStripeCustomerId,
    setCheckingAuth: state.setCheckingAuth,
  });

  const actions = useDashboardActions({
    businessType: state.businessType,
    topic: state.topic,
    language: state.language,
    platform: state.platform,
    tone: state.tone,
    goal: state.goal,
    postCount: state.postCount,

    creditsLeft: state.creditsLeft,
    imageCreditsLeft: state.imageCreditsLeft,

    stripeCustomerId: state.stripeCustomerId,

    setLoading: state.setLoading,
    setImageLoading: state.setImageLoading,

    setPosts: state.setPosts,
    setGeneratedImage: state.setGeneratedImage,

    setCreditsLeft: state.setCreditsLeft,
    setImageCreditsLeft: state.setImageCreditsLeft,
    setPlan: state.setPlan,

    setShowUpgradeModal: state.setShowUpgradeModal,
    setImageHistoryVersion: state.setImageHistoryVersion,

    getCurrentUserOrRedirect,
  });

  return useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );
}