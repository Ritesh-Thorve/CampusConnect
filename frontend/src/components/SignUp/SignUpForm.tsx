import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State to hold form field values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Sign up attempt:', formData);
    navigate('/profile');
  };

  // Update formData state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for Google sign up button click (simulated)
  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    navigate('/profile');
  };

  return (
    <div className="w-full max-w-lg">
      {/* Form header with title and subtitle */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join CampusConnect</h1>
        <p className="text-gray-600 text-lg">Create your account and start connecting</p>
      </div>

      {/* Card container for the signup form */}
      <Card className="backdrop-blur-sm bg-white/90 shadow-2xl border-0 rounded-3xl">
        <CardContent className="p-8">
          {/* Google sign up button */}
          <Button
            onClick={handleGoogleSignUp}
            variant="outline"
            className="w-full h-14 text-gray-700 border-2 border-gray-200 hover:bg-gray-50 rounded-2xl mb-6 font-medium"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">{/* paths omitted for brevity */}</svg>
              <span className="text-lg">Continue with Google</span>
            </div>
          </Button>

          {/* Divider with text */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">or continue with email</span>
            </div>
          </div>

          {/* Email signup form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-2 text-indigo-600" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="h-14 rounded-xl border-2 border-gray-200 focus:border-indigo-500 text-lg"
              />
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-indigo-600" />
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

            {/* Password input with toggle visibility */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-2 text-indigo-600" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-indigo-500 text-lg pr-14"
                />
                {/* Button to toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Confirm Password input with toggle visibility */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="h-14 rounded-xl border-2 border-gray-200 focus:border-indigo-500 text-lg pr-14"
                />
                {/* Button to toggle confirm password visibility */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Submit button for form */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl text-lg font-semibold shadow-lg"
            >
              Create Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Link to login page for existing users */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
