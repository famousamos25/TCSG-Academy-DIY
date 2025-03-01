'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { signUp } from '@/lib/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Mail, Lock, RefreshCw, ArrowLeft, User, AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [user] = useAuthState(auth);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.firstName || !formData.lastName) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      await signUp(formData.email, formData.password);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-md w-full p-8">
            <div className="text-center mb-8">
              <div className="relative w-32 h-12 mx-auto mb-6">
                <Image
                  src="https://i.imgur.com/xFHDLUO.png"
                  alt="TCSG Academy Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy">
                Create your account
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Join TCSG Academy and start your credit repair journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="pl-10"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="pl-10"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Important Note
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                        Your password must be at least 6 characters long.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-brand-navy hover:text-brand-navy/80"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Side - Image */}
        <div className="hidden lg:block flex-1 bg-cover bg-center" style={{ backgroundImage: 'url(https://i.imgur.com/8KZJZzF.jpg)' }} />
      </div>
    </div>
  );
}