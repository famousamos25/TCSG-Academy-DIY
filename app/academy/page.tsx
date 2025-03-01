'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  BookOpen,
  Star,
  Play,
  Lock,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  FileText,
  MessageSquare,
  BarChart
} from 'lucide-react';

const COURSES = [
  {
    title: 'Credit Basics 101',
    description: 'Learn the fundamentals of credit and credit scoring',
    duration: '2 hours',
    modules: 5,
    locked: false,
    progress: 0,
    nextSession: '2025-03-15T10:00:00',
    attendees: 24,
    chapters: [
      {
        title: 'Understanding Credit Scores',
        duration: '30 mins',
        type: 'video',
        completed: false
      },
      {
        title: 'Credit Report Components',
        duration: '25 mins',
        type: 'interactive',
        completed: false
      },
      {
        title: 'Credit Building Strategies',
        duration: '35 mins',
        type: 'webinar',
        completed: false
      },
      {
        title: 'Common Credit Myths',
        duration: '15 mins',
        type: 'quiz',
        completed: false
      },
      {
        title: 'Live Q&A Session',
        duration: '15 mins',
        type: 'live',
        completed: false
      }
    ]
  },
  {
    title: 'Advanced Credit Repair',
    description: 'Master advanced credit repair techniques and strategies',
    duration: '3 hours',
    modules: 8,
    locked: true,
    progress: 0,
    nextSession: '2025-03-20T14:00:00',
    attendees: 18,
    chapters: []
  },
  {
    title: 'Credit Bureau Secrets',
    description: 'Understanding how credit bureaus work and report information',
    duration: '2.5 hours',
    modules: 6,
    locked: true,
    progress: 0,
    nextSession: '2025-03-25T15:30:00',
    attendees: 15,
    chapters: []
  },
  {
    title: 'Dispute Letter Mastery',
    description: 'Learn how to write effective dispute letters',
    duration: '1.5 hours',
    modules: 4,
    locked: true,
    progress: 0,
    nextSession: '2025-03-30T11:00:00',
    attendees: 20,
    chapters: []
  },
];

const LEARNING_STATS = [
  {
    label: 'Course Progress',
    value: '0%',
    icon: BarChart,
    color: 'text-blue-500'
  },
  {
    label: 'Time Invested',
    value: '0 hrs',
    icon: Clock,
    color: 'text-green-500'
  },
  {
    label: 'Modules Completed',
    value: '0/5',
    icon: CheckCircle2,
    color: 'text-purple-500'
  },
  {
    label: 'Live Sessions Attended',
    value: '0',
    icon: Users,
    color: 'text-orange-500'
  }
];

export default function AcademyPage() {
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="h-4 w-4" />;
      case 'interactive':
        return <MessageSquare className="h-4 w-4" />;
      case 'webinar':
        return <Users className="h-4 w-4" />;
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      case 'live':
        return <Play className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">TCSG Academy</h1>
          <p className="text-gray-600">Master credit repair with our comprehensive courses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-2 space-y-6">
          {COURSES.map((course) => (
            <Card 
              key={course.title} 
              className={`p-6 cursor-pointer transition-all duration-300 ${
                selectedCourse.title === course.title 
                  ? 'border-brand-yellow ring-2 ring-brand-yellow/50' 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => !course.locked && setSelectedCourse(course)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1.5" />
                      {course.modules} Modules
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1.5" />
                      {course.attendees} Enrolled
                    </div>
                  </div>
                </div>
                {course.locked ? (
                  <Lock className="h-5 w-5 text-gray-400" />
                ) : (
                  <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    Available
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Next Session: {new Date(course.nextSession).toLocaleDateString()}
                    </span>
                  </div>
                  <Button 
                    className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    disabled={course.locked}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {course.locked ? 'Unlock Course' : 'Continue Learning'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Course Details & Progress */}
        <div className="space-y-6">
          {/* Learning Stats */}
          <div className="grid grid-cols-2 gap-4">
            {LEARNING_STATS.map((stat) => (
              <Card key={stat.label} className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-lg font-semibold">{stat.value}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Next Live Session */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Next Live Session</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-brand-yellow" />
                  </div>
                  <div>
                    <div className="font-medium">Credit Basics Live Q&A</div>
                    <div className="text-sm text-gray-600">
                      {new Date(selectedCourse.nextSession).toLocaleString()}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-600">
                  15 mins
                </Badge>
              </div>
              <Button className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                Join Session
              </Button>
            </div>
          </Card>

          {/* Course Content */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-brand-navy mb-4">Course Content</h3>
            <div className="space-y-4">
              {selectedCourse.chapters.map((chapter, index) => (
                <div 
                  key={chapter.title}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getContentTypeIcon(chapter.type)}
                    </div>
                    <div>
                      <div className="font-medium">{chapter.title}</div>
                      <div className="text-sm text-gray-600">
                        {chapter.duration} • {chapter.type.charAt(0).toUpperCase() + chapter.type.slice(1)}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}