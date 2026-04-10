import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { loginUser } from "../../api/auth/authApi";
import { useAppDispatch } from "@/redux/store/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { supabaseClient } from "../../config/supabaseClient";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [emailLoading, setEmailLoading] = useState(false);   // separate
  const [googleLoading, setGoogleLoading] = useState(false); // separate
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailLoading(true);
    try {
      const res = await loginUser(formData.email, formData.password);
      dispatch(setCredentials(res));
      toast.success("Logged in successfully!");
      navigate("/profile");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setEmailLoading(false);
    }
  };

  // Form field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Google OAuth — triggers redirect, loading only resets on error
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      // Don't reset loading here — page will redirect
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google login failed";
      toast.error(message);
      setGoogleLoading(false); // only reset on error
    }
  };

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="text-center mt-5 mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Welcome
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ml-3">
            back
          </span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Sign in to continue your journey
        </p>
      </div>

      <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 rounded-3xl">
        <CardContent className="p-8">
          {/* Google Sign-In button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={googleLoading || emailLoading}
            variant="outline"
            className="w-full h-14 text-gray-700 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl mb-6 font-medium flex items-center justify-center"
          >
            {googleLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <div className="flex items-center justify-center space-x-3">
                {/* Filled Google SVG */}
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span className="text-lg">Continue with Google</span>
              </div>
            )}
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                or continue with email
              </span>
            </div>
          </div>

          {/* Email login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-14 rounded-xl border-2 border-gray-200 focus:border-indigo-500 text-lg"
              />
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-indigo-500 text-lg pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={emailLoading || googleLoading}
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-lg flex items-center justify-center"
            >
              {emailLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Signup link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;