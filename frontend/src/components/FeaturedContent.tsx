
import { Clock, Users, MapPin, ExternalLink, Trophy, Briefcase, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FeaturedContent = () => {
  const hackathons = [
    {
      title: "Tech Innovation Hackathon 2024",
      date: "March 15-17, 2024",
      location: "MIT Campus",
      participants: 500,
      prize: "$50,000",
      tags: ["AI/ML", "Web Dev", "Mobile"],
      description: "Join students from top universities to build innovative solutions using cutting-edge technology."
    },
    {
      title: "Sustainability Challenge",
      date: "April 2-4, 2024",
      location: "Stanford University",
      participants: 300,
      prize: "$30,000",
      tags: ["GreenTech", "IoT", "Social Impact"],
      description: "Create sustainable solutions for environmental challenges with like-minded innovators."
    }
  ];

  const jobs = [
    {
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      type: "Internship",
      posted: "2 days ago",
      tags: ["Python", "React", "Machine Learning"],
      description: "Work on large-scale systems that impact billions of users worldwide."
    },
    {
      title: "Product Manager Intern",
      company: "Microsoft",
      location: "Seattle, WA",
      type: "Internship",
      posted: "1 week ago",
      tags: ["Product Strategy", "Analytics", "Leadership"],
      description: "Drive product decisions for Microsoft's enterprise solutions."
    }
  ];

  const trends = [
    {
      title: "AI Tools Every CS Student Should Know in 2024",
      author: "Sarah Chen",
      university: "UC Berkeley",
      engagement: "245 likes • 67 comments",
      timeAgo: "3 hours ago",
      preview: "From GitHub Copilot to ChatGPT integrations, here are the essential AI tools that are transforming how we code and learn."
    },
    {
      title: "Breaking: New Scholarship Program for Underrepresented Students",
      author: "Marcus Johnson",
      university: "Georgia Tech",
      engagement: "189 likes • 43 comments",
      timeAgo: "8 hours ago",
      preview: "Tech giants announce $10M scholarship fund specifically for students from underrepresented communities in STEM."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover What's Available Right Now
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          From hackathons and internships to the latest trends in academia and technology - 
          everything you need to stay ahead is curated in one place.
        </p>
      </div>

      {/* Hackathons Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Hackathons</h2>
              <p className="text-gray-600">Compete with the best minds and win amazing prizes</p>
            </div>
          </div>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hackathons.map((hackathon, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">{hackathon.title}</CardTitle>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    {hackathon.prize}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-3">{hackathon.description}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{hackathon.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{hackathon.participants} participants expected</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">
                  Register Now
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Jobs Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Opportunities</h2>
              <p className="text-gray-600">Exclusive internships and jobs from top companies</p>
            </div>
          </div>
          <Button variant="outline">View All Jobs</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold text-gray-900">{job.title}</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                    {job.type}
                  </Badge>
                </div>
                <p className="text-lg font-semibold text-gray-700">{job.company}</p>
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">
                  Apply Now
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Trending Posts */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Trending Discussions</h2>
              <p className="text-gray-600">What students are talking about right now</p>
            </div>
          </div>
          <Button variant="outline">View All Posts</Button>
        </div>
        
        <div className="space-y-4">
          {trends.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.preview}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{post.author}</span>
                    <span>{post.university}</span>
                    <span>{post.timeAgo}</span>
                  </div>
                  <span>{post.engagement}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
