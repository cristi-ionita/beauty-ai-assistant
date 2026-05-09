import { supabase } from "@/lib/supabase";

let authListenerInitialized = false;

export function setupAuthListener() {
  if (authListenerInitialized) return;

  authListenerInitialized = true;

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      window.location.replace("/");
      return;
    }

    if (!session) {
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.error("Auth cleanup failed:", error);
      }

      window.location.replace("/");
    }
  });
}