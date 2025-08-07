import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    navigate('/profile'); // Simulated login success
  };

  // Handle input value changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulate Google login
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    navigate('/profile');
  };

  return (
    <div className="w-full max-w-lg">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome back</h1>
        <p className="text-gray-600 text-lg">Sign in to continue your journey</p>
      </div>

      <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 rounded-3xl">
        <CardContent className="p-8">
          {/* Google Sign-In button */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-14 text-gray-700 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl mb-6 font-medium"
          >
            <div className="flex items-center justify-center space-x-3">
              {/* Google logo SVG */}
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                {/* ...paths omitted for brevity... */}
              </svg>
              <span className="text-lg">Continue with Google</span>
            </div>
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
            </div>
          </div>

          {/* Email login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
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

            {/* Password field with visibility toggle */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-indigo-500 text-lg pr-14"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="remember" className="rounded-md" />
                <Label htmlFor="remember" className="text-sm text-gray-600">Remember me</Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-lg"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Signup link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
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
