'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Shield,
  TrendingUp,
  Sparkles,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Shield,
    title: 'Secure Credit Repair',
    description: 'Advanced security measures to protect your sensitive information',
  },
  {
    icon: TrendingUp,
    title: 'Score Tracking',
    description: 'Monitor your credit score progress in real-time',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Analysis',
    description: 'Get personalized insights and recommendations',
  },
  {
    icon: GraduationCap,
    title: 'Credit Education',
    description: 'Learn credit repair strategies from industry experts',
  },
];

const BENEFITS = [
  'Automated dispute letter generation',
  'Real-time credit monitoring',
  'Expert credit repair guidance',
  'Comprehensive credit analysis',
  'Secure document management',
  'Progress tracking dashboard',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="relative w-32 h-12">
            <Image
              src="https://i.imgur.com/xFHDLUO.png"
              alt="TCSG Academy Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-brand-navy text-brand-navy hover:bg-brand-navy/10">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-brand-navy mb-6">
                Take Control of Your Credit Journey
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                TCSG Academy provides you with the tools and knowledge to repair your credit and achieve your financial goals.
              </p>
              <div className="flex space-x-4">
                <Link href="/signup">
                  <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                    Start Your Journey
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://i.imgur.com/L5JyZR8.jpg"
                alt="Credit Score Dashboard"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools and features to help you repair and maintain your credit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-brand-yellow mb-4" />
                <h3 className="text-xl font-semibold text-brand-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-6">
                Why Choose TCSG Academy?
              </h2>
              <div className="space-y-4">
                {BENEFITS.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px]">
              <Image
                src="https://i.imgur.com/QF2JXk9.jpg"
                alt="Credit Report Analysis"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="p-12 bg-brand-navy text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Credit?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have successfully improved their credit scores with TCSG Academy.
            </p>
            <Link href="/signup">
              <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                Get Started Now
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="relative w-32 h-12 mb-4 md:mb-0">
              <Image
                src="https://i.imgur.com/xFHDLUO.png"
                alt="TCSG Academy Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} TCSG Academy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}