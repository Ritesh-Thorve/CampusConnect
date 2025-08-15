import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabaseClient';
import { googleAuthUser } from '@/api/auth/authApi';
import { useAppDispatch } from '@/redux/store/hooks';
import { setCredentials } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';

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

        const user = session.user;

        const res = await googleAuthUser({
          fullname: user.user_metadata.full_name || user.user_metadata.name || "",
          email: user.email || "",
          provider: "google",
          supabaseId: user.id,
          accessToken: session.access_token
        });

        dispatch(setCredentials(res));
        toast.success("Logged in with Google!");
        navigate("/profile");
      } catch (err: any) {
        toast.error(err.message || "Google OAuth failed");
      }
    };

    handleOAuth();
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
