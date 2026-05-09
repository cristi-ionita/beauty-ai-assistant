"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type DashboardAuthOptions = {
  setPlan: (value: string | null) => void;
  setCreditsLeft: (value: number | null) => void;
  setImageCreditsLeft: (value: number | null) => void;
  setStripeCustomerId: (value: string | null) => void;
  setCheckingAuth: (value: boolean) => void;
};

export function useDashboardAuth({
  setPlan,
  setCreditsLeft,
  setImageCreditsLeft,
  setStripeCustomerId,
  setCheckingAuth,
}: DashboardAuthOptions) {
  useEffect(() => {
    async function loadUserCredits(userId: string) {
      const { data: creditData, error: creditError } = await supabase
        .from("user_credits")
        .select("credits, image_credits, plan, stripe_customer_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (creditError) {
        console.error("Failed to load user credits:", creditError);
        toast.error("Could not load your account data");
      }

      if (creditData) {
        setPlan(creditData.plan);
        setCreditsLeft(creditData.credits);
        setImageCreditsLeft(creditData.image_credits);
        setStripeCustomerId(creditData.stripe_customer_id);
        return;
      }

      const { data: newCredits, error: insertError } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits: 10,
          image_credits: 1,
          plan: "free",
        })
        .select("credits, image_credits, plan, stripe_customer_id")
        .single();

      if (insertError || !newCredits) {
        console.error("Failed to create user credits:", insertError);
        toast.error("Could not create your free account credits");
        return;
      }

      setPlan(newCredits.plan);
      setCreditsLeft(newCredits.credits);
      setImageCreditsLeft(newCredits.image_credits);
      setStripeCustomerId(newCredits.stripe_customer_id);
    }

    async function checkUser() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          window.location.replace("/login");
          return;
        }

        await loadUserCredits(session.user.id);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkUser();
  }, [
    setPlan,
    setCreditsLeft,
    setImageCreditsLeft,
    setStripeCustomerId,
    setCheckingAuth,
  ]);

  async function getCurrentUserOrRedirect() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.user) {
      window.location.replace("/login");
      return null;
    }

    return session.user;
  }

  return {
    getCurrentUserOrRedirect,
  };
}