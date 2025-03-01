'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Clock, Eye, ChevronDown, PlayCircle, ShoppingBag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number | 'Free';
  duration: string;
  rating: number;
  reviews: number;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

const COURSES: Course[] = [
  {
    id: '1',
    title: 'Credit Repair Basics',
    description: 'Learn the fundamentals of credit repair and credit scoring',
    instructor: 'Creditfixrr',
    price: 'Free',
    duration: '20 mins 45 secs',
    rating: 4.8,
    reviews: 18,
    thumbnail: 'https://i.imgur.com/L5JyZR8.jpg',
    category: 'Credit Repair',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Building Your Credit Repair Empire',
    description: 'Step by step credit business launch course',
    instructor: 'Keliah LaCour',
    price: 14.97,
    duration: '32 mins 11 secs',
    rating: 5.0,
    reviews: 2,
    thumbnail: 'https://i.imgur.com/QF2JXk9.jpg',
    category: 'Credit Repair',
    level: 'Advanced'
  },
  {
    id: '3',
    title: 'Dealing With Creditors',
    description: 'Advanced strategies for negotiating with creditors',
    instructor: 'Creditfixrr',
    price: 4.97,
    duration: '16 mins 12 secs',
    rating: 3.5,
    reviews: 2,
    thumbnail: 'https://i.imgur.com/8KZJZzF.jpg',
    category: 'Credit Repair',
    level: 'Intermediate'
  },
  {
    id: '4',
    title: 'Dealing With Credit Debt',
    description: 'Master strategies for managing and reducing credit card debt',
    instructor: 'Creditfixrr',
    price: 9.97,
    duration: '25 mins 30 secs',
    rating: 4.5,
    reviews: 4,
    thumbnail: 'https://i.imgur.com/vN3nK9x.jpg',
    category: 'Credit Repair',
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Negotiating Settlements',
    description: 'Learn effective debt settlement negotiation techniques',
    instructor: 'Creditfixrr',
    price: 19.97,
    duration: '45 mins 15 secs',
    rating: 4.7,
    reviews: 6,
    thumbnail: 'https://i.imgur.com/M4XkVsd.jpg',
    category: 'Credit Repair',
    level: 'Advanced'
  },
  {
    id: '6',
    title: 'Combatting Collections',
    description: 'Strategies for dealing with collection agencies',
    instructor: 'Creditfixrr',
    price: 14.97,
    duration: '28 mins 45 secs',
    rating: 4.2,
    reviews: 5,
    thumbnail: 'https://i.imgur.com/RecPXag.jpg',
    category: 'Credit Repair',
    level: 'Advanced'
  }
];

export default function AllCoursesPage() {
  const [filter, setFilter] = useState('all');
  const [showPurchased, setShowPurchased] = useState(false);

  const getRatingStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">All Courses</h1>
          <p className="text-gray-600">Expand your credit repair knowledge with our comprehensive courses</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              checked={showPurchased}
              onCheckedChange={setShowPurchased}
              id="purchased"
            />
            <label htmlFor="purchased" className="text-sm text-gray-600">
              Show Purchased
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button className="bg-white/90 text-brand-navy hover:bg-white">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Preview Course
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-brand-yellow/10 text-brand-navy">
                  {course.category}
                </Badge>
                <Badge variant="outline" className="text-brand-navy">
                  {course.level}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-brand-navy mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {getRatingStars(course.rating)}
                  <span className="text-sm text-gray-500 ml-2">
                    {course.rating} ({course.reviews})
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-600">Instructor:</div>
                  <div className="font-medium">{course.instructor}</div>
                </div>
                <div className="text-xl font-bold text-brand-navy">
                  {course.price === 'Free' ? 'Free' : `$${course.price}`}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {course.price === 'Free' ? 'Enroll Now' : 'Buy Now'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}