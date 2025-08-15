import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Users, Bell, TrendingUp, User, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../config/supabaseClient';
import { useToast } from "@/components/ui/use-toast"; // ✅ Toast hook

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  const handleLogout = async () => {
    try {
      await supabaseClient.auth.signOut();
      window.location.reload(); 
      localStorage.removeItem('cc_token');
      localStorage.removeItem('cc_user');
      localStorage.removeItem('cc_expiry');
      localStorage.removeItem('sb-rqrildgkhqojltpjxhyq-auth-token');
      localStorage.removeItem('sb-access-token');
      localStorage.removeItem('sb-refresh-token');

      setUser(null);

      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account.",
        duration: 3000,
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Logout failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

   useEffect(() => {
    // Get current session on mount
    supabaseClient.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    // Listen for login/logout changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'College', path: '/college', icon: Users },
    { name: 'Updates', path: '/updates', icon: Bell },
    { name: 'Trends', path: '/trends', icon: TrendingUp },
    { name: 'Account', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block sticky top-0 z-50 px-4 pt-4">
        <nav className="bg-white/90 backdrop-blur-sm border rounded-full shadow-sm hover:shadow-md transition-all duration-300 max-w-7xl mx-auto">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 group ml-1 hover:opacity-90 transition-opacity"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full overflow-hidden group-hover:rotate-12 transition-transform duration-300">
                  <img
                    src="/compus-connect_logo.png"
                    alt="Campus Connect Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CampusConnect
                </span>
              </Link>

              {/* Main Nav Links */}
              <div className="flex items-center space-x-1">
                {navItems.slice(0, -1).map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-indigo-600 bg-indigo-50/60'
                          : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/30'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.3px]' : ''}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-3 mr-1">
                {user ? (
                  <>
                    {/* ✅ Profile Button when logged in */}
                    <Link to="/profile">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/40 px-5 flex items-center gap-1.5 border border-gray-200"
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Button>
                    </Link>

                    {/* ✅ Logout Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="rounded-full text-gray-600 hover:text-red-600 hover:bg-red-50/40 px-5 flex items-center gap-1.5 border border-gray-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/40 px-5 flex items-center gap-1.5 border border-gray-200"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Log In</span>
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        size="sm"
                        className="rounded-full px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm hover:shadow-md transition-all"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 bg-white border-t border-gray-200 shadow-xl">
        <nav className="flex justify-around items-center pt-2 pb-3 safe-bottom">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center p-1 w-full transition-colors duration-200 ${
                  isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`p-2 rounded-full ${isActive ? 'bg-indigo-50' : ''}`}>
                  <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                </div>
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </Link>
            );
          })}

          {/* ✅ Mobile: Profile + Logout if logged in */}
          {user && (
            <>
              <Link
                to="/profile"
                className="flex flex-col items-center p-1 w-full text-indigo-600 hover:text-indigo-700"
              >
                <div className="p-2 rounded-full bg-indigo-50">
                  <User className="w-6 h-6" />
                </div>
                <span className="text-xs mt-1 font-medium">Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex flex-col items-center p-1 w-full text-red-600 hover:text-red-700"
              >
                <div className="p-2 rounded-full bg-red-50">
                  <LogOut className="w-6 h-6" />
                </div>
                <span className="text-xs mt-1 font-medium">Log Out</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
