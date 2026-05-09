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
      await supabase.auth.signOut();
      window.location.href = "/";
      return null;
    }

    return user;
  }

  return {
    getCurrentUserOrRedirect,
  };
}