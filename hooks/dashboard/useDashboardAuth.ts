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

const DEFAULT_FREE_CREDITS = 10;
const DEFAULT_FREE_IMAGE_CREDITS = 1;

export function useDashboardAuth({
  setPlan,
  setCreditsLeft,
  setImageCreditsLeft,
  setStripeCustomerId,
  setCheckingAuth,
}: DashboardAuthOptions) {
  useEffect(() => {
    let mounted = true;

    async function loadUserCredits(userId: string) {
      const { data, error } = await supabase
        .from("user_credits")
        .select("credits, image_credits, plan, stripe_customer_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error(error);
        toast.error("Could not load your account data.");
        return;
      }

      if (data) {
        setPlan(data.plan || "free");
        setCreditsLeft(data.credits);
        setImageCreditsLeft(data.image_credits);
        setStripeCustomerId(data.stripe_customer_id);
        return;
      }

      const { data: created, error: createError } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits: DEFAULT_FREE_CREDITS,
          image_credits: DEFAULT_FREE_IMAGE_CREDITS,
          plan: "free",
        })
        .select("credits, image_credits, plan, stripe_customer_id")
        .single();

      if (createError || !created) {
        console.error(createError);
        toast.error("Could not create your free credits.");
        return;
      }

      setPlan(created.plan || "free");
      setCreditsLeft(created.credits);
      setImageCreditsLeft(created.image_credits);
      setStripeCustomerId(created.stripe_customer_id);
    }

    async function checkUser() {
      try {
        setCheckingAuth(true);

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          window.location.replace("/login");
          return;
        }

        await loadUserCredits(user.id);
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.replace("/login");
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    }

    checkUser();

    return () => {
      mounted = false;
    };
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
      window.location.replace("/login");
      return null;
    }

    return user;
  }

  return {
    getCurrentUserOrRedirect,
  };
}