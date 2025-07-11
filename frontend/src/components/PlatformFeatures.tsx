
import { Users, Briefcase, Trophy, TrendingUp, Linkedin, Twitter, Globe, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PlatformFeatures = () => {
  const features = [
    {
      icon: Users,
      title: "Connect with Current Students",
      description: "Before applying to any college, connect directly with current students through their social profiles.",
      benefits: [
        "Access LinkedIn profiles of students from your target colleges",
        "Follow Twitter accounts for real-time campus updates",
        "Get authentic insights about college life and academics",
        "Ask questions about admission processes and requirements"
      ],
      color: "blue"
    },
    {
      icon: Trophy,
      title: "Discover Hackathons & Competitions",
      description: "Find and participate in hackathons that match your skills and interests.",
      benefits: [
        "Browse hackathons from top universities and tech companies",
        "Filter by technology stack, prize money, and location",
        "Get notifications for registration deadlines",
        "Connect with potential teammates"
      ],
      color: "orange"
    },
    {
      icon: Briefcase,
      title: "Internships & Job Opportunities",
      description: "Access exclusive internship and job postings from leading companies.",
      benefits: [
        "Early access to student-focused opportunities",
        "Direct applications without multiple platforms",
        "Company insights from current and former interns",
        "Salary information and application tips"
      ],
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Stay Updated with Trends",
      description: "Keep up with the latest trends in technology, academia, and student life.",
      benefits: [
        "Weekly trend reports in your field of interest",
        "Popular topics among students worldwide",
        "Industry insights from student perspectives",
        "Emerging technologies and career paths"
      ],
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
      blue: { bg: "bg-blue-50", icon: "text-blue-600", text: "text-blue-800" },
      orange: { bg: "bg-orange-50", icon: "text-orange-600", text: "text-orange-800" },
      green: { bg: "bg-green-50", icon: "text-green-600", text: "text-green-800" },
      purple: { bg: "bg-purple-50", icon: "text-purple-600", text: "text-purple-800" }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CampusConnect?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most comprehensive platform for students to connect, 
            discover opportunities, and stay informed about what matters most in their academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = getColorClasses(feature.color);
            
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${colors.icon}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-3">
                        <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center mt-0.5 flex-shrink-0`}>
                          <div className={`w-2 h-2 ${colors.icon} bg-current rounded-full`} />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Social Connection Highlight */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Connect Through Social Profiles</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Get direct access to students' LinkedIn and Twitter profiles. Build your network 
              before you even step on campus and make informed decisions about your college choice.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Linkedin className="w-6 h-6" />
                <span className="font-semibold">Professional Networking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Twitter className="w-6 h-6" />
                <span className="font-semibold">Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;
