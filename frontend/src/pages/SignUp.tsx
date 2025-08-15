import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignUpForm from '../components/SignUp/SignUpForm';

function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">

      {/* Desktop Navbar (hidden on mobile) */}
      <div className="hidden md:block sticky top-0 z-20 from-indigo-50 via-white to-purple-50">
        <Navbar />
      </div>

      {/* Mobile top header (logo only, NOT <Navbar />) */}
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img
            src="/compus-connect_logo.png"
            alt="Campus Connect"
            className="h-6 w-6 mr-2"
          />
          <span className="text-sm font-semibold text-gray-800">
            Campus Connect
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 py-16 mb-10">
        <SignUpForm />
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile bottom navbar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-20 bg-white border-t border-gray-200">
        <Navbar />
      </div>
    </div>
  );
}

export default SignUpPage;
