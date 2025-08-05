import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SignUpForm from '../components/SignUp/SignUpForm'

function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 py-16">
        <SignUpForm />
      </div>
      <Footer />
    </div>
  );
}

export default SignUpPage;
