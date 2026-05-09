import { supabase } from "@/lib/supabase";

export function setupAuthListener() {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      window.location.href = "/";
      return;
    }

    if (!session) {
      await supabase.auth.signOut();

      window.location.href = "/";
    }
  });
}