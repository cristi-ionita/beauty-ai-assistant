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
    async function checkUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          setCheckingAuth(false);
          window.location.href = "/login";
          return;
        }

        const { data: creditData, error: creditError } = await supabase
          .from("user_credits")
          .select("credits, image_credits, plan, stripe_customer_id")
          .eq("user_id", user.id)
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
        } else {
          const { data: newCredits, error: insertError } = await supabase
            .from("user_credits")
            .insert({
              user_id: user.id,
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
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      window.location.href = "/login";
      return null;
    }

    return user;
  }

  return {
    getCurrentUserOrRedirect,
  };
}