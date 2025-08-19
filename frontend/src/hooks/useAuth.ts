import { useEffect, useState, useCallback } from "react";
import { supabaseClient } from "../config/supabaseClient";
import { toast } from "react-hot-toast";

export function useGoogleAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // --- Initialize session on load ---
  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getInitialSession();

    // --- Subscribe to auth state changes ---
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- Trigger Google Login ---
  const signInWithGoogle = useCallback(async () => {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/profile`, // after login
        },
      });

      if (error) throw error;
    } catch (err: any) {
      toast.error(err.message || "Google login failed");
    }
  }, []);

  // --- Logout ---
  const signOut = useCallback(async () => {
    await supabaseClient.auth.signOut();
    setSession(null);
  }, []);

  return {
    session,
    loading,
    signInWithGoogle,
    signOut,
  };
}
