import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Bell, TrendingUp, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'College', path: '/college', icon: Users },
    { name: 'Updates', path: '/updates', icon: Bell },
    { name: 'Trends', path: '/trends', icon: TrendingUp },
    { name: 'Account', path: '/profile', icon: User },
  ];

  return (
    <>
      {/* Desktop Navbar - Rounded Design */}
      <div className="hidden md:block sticky top-0 z-50 px-4 pt-4">
        <nav className="bg-white/90 backdrop-blur-sm border rounded-full shadow-sm hover:shadow-md transition-all duration-300 max-w-7xl mx-auto">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              {/* Logo with Gradient */}
              <Link 
                to="/" 
                className="flex items-center space-x-2 group ml-1 hover:opacity-90 transition-opacity"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CampusConnect
                </span>
              </Link>

              {/* Navigation Links - Rounded Items */}
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

              {/* Auth Buttons - Rounded */}
              <div className="flex items-center space-x-3 mr-1">
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
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Bottom Navigation - Fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 shadow-xl">
        <div className="flex justify-around items-center pt-2 pb-3 safe-bottom">
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
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="pb-20 md:pb-0"></div>
    </>
  );
};

export default Navbar;