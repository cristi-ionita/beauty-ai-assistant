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

type UserCreditsRow = {
  credits: number;
  image_credits: number;
  plan: string | null;
  stripe_customer_id: string | null;
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
    let isMounted = true;

    function applyCredits(data: UserCreditsRow) {
      if (!isMounted) return;

      setPlan(data.plan || "free");
      setCreditsLeft(data.credits);
      setImageCreditsLeft(data.image_credits);
      setStripeCustomerId(data.stripe_customer_id);
    }

    async function loadUserCredits(userId: string) {
      const { data: creditData, error: creditError } = await supabase
        .from("user_credits")
        .select("credits, image_credits, plan, stripe_customer_id")
        .eq("user_id", userId)
        .maybeSingle();

      if (creditError) {
        console.error("Failed to load user credits:", creditError);
        toast.error("Could not load your account data.");
        return;
      }

      if (creditData) {
        applyCredits(creditData);
        return;
      }

      const { data: newCredits, error: insertError } = await supabase
        .from("user_credits")
        .insert({
          user_id: userId,
          credits: DEFAULT_FREE_CREDITS,
          image_credits: DEFAULT_FREE_IMAGE_CREDITS,
          plan: "free",
        })
        .select("credits, image_credits, plan, stripe_customer_id")
        .single();

      if (insertError || !newCredits) {
        console.error("Failed to create user credits:", insertError);
        toast.error("Could not create your free account credits.");
        return;
      }

      applyCredits(newCredits);
    }

    async function checkUser() {
      try {
        setCheckingAuth(true);

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          window.location.replace("/login");
          return;
        }

        await loadUserCredits(session.user.id);
      } catch (error) {
        console.error("Dashboard auth check failed:", error);
        toast.error("Authentication failed. Please log in again.");
        window.location.replace("/login");
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT" || !session?.user) {
        window.location.replace("/login");
        return;
      }

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await loadUserCredits(session.user.id);
      }
    });

    checkUser();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
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