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
    const handleOAuth = async () => {
      try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();

        if (error || !session) {
          toast.error("Google authentication failed");
          return navigate("/signup");
        }

        // Only send access_token — backend derives everything else
        const res = await googleAuthUser(session.access_token);

        // Use correct field names from backend response
        dispatch(setCredentials({ token: res.token, user: res.user }));

        toast.success("Google Login successful");
        navigate("/profile");

      } catch (err) {
        const message = err instanceof Error ? err.message : "Google OAuth failed";
        toast.error(message);
        navigate("/signup"); // don't leave user stuck on /auth/callback
      }
    };

    handleOAuth();
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500 animate-pulse">Logging you in...</p>
    </div>
  );
};

export default OAuthCallback;