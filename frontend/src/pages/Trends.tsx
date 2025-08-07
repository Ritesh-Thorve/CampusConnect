'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const updatesData = [
  {
    id: 1,
    type: 'Hackathon',
    title: 'hi',
    link: 'https://example.com',
    date: 'August 1, 2025',
  },
  {
    id: 2,
    type: 'News',
    title: 'hello',
    date: 'July 24, 2025',
  },
];

export default function UpdatesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUpdates = updatesData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-10 bg-white border-b border-gray-200 py-3 px-4">
        <div className="flex items-center justify-center">
          <img
            src="/compus-connect_logo.png"
            alt="Campus Connect"
            className="h-6 w-6 mr-2"
          />
          <span className="text-sm font-semibold text-gray-800">Campus Connect</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-28 md:pb-0 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Page Title */}
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Campus <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Updates</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Stay up to date with the latest opportunities and announcements
            </p>
          </div>

          {/* Search and Add */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Update
            </Button>
          </div>

          {/* Update Cards */}
          <div className="space-y-4">
            {filteredUpdates.map((item) => (
              <Card key={item.id} className="bg-white shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-semibold text-white px-2 py-1 rounded-full ${
                        item.type === 'Hackathon'
                          ? 'bg-purple-600'
                          : 'bg-blue-600'
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {item.date}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  {item.link && (
                    <a
                      href={item.link}
                      className="text-sm text-indigo-600 hover:underline mt-2 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Link
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Bottom Navbar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 w-full z-20">
        <Navbar />
      </div>
    </div>
  );
}
