import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../config/supabaseClient";
import { googleAuthUser } from "@/api/auth/authApi";
import { useAppDispatch } from "@/redux/store/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";

const OAuthCallback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribed = false;

    const handleSession = async (accessToken: string) => {
      try {
        const res = await googleAuthUser(accessToken);
        dispatch(setCredentials({ token: res.token, user: res.user }));
        toast.success("Google Login successful");
        navigate("/profile");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Google OAuth failed";
        toast.error(message);
        navigate("/signup");
      }
    };

    const handleOAuth = async () => {
      // First try: session may already be available
      const { data: { session } } = await supabaseClient.auth.getSession();

      if (session?.access_token) {
        return handleSession(session.access_token);
      }

      // Fallback: wait for Supabase to parse the hash fragment
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
        async (event, session) => {
          if (unsubscribed) return;
          if (event === "SIGNED_IN" && session?.access_token) {
            unsubscribed = true;
            subscription.unsubscribe();
            await handleSession(session.access_token);
          } else if (event === "SIGNED_OUT" || (!session && event !== "INITIAL_SESSION")) {
            toast.error("Google authentication failed");
            navigate("/signup");
          }
        }
      );

      // Safety timeout — don't leave user stuck forever
      setTimeout(() => {
        if (!unsubscribed) {
          unsubscribed = true;
          subscription.unsubscribe();
          toast.error("Login timed out. Please try again.");
          navigate("/signup");
        }
      }, 10000);
    };

    handleOAuth();

    return () => {
      unsubscribed = true;
    };
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 animate-pulse">Logging you in...</p>
    </div>
  );
};

export default OAuthCallback;