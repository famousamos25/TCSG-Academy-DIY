'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { signIn } from '@/lib/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Mail, Lock, RefreshCw, ArrowLeft, Info } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (!email || !password || loading) return;

    try {
      setLoading(true);
      await signIn(email, password);
      router.replace('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: 'Authentication Failed',
        description: 'Please check your email and password.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
          <Card className="max-w-md w-full p-8 shadow-xl">
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
                Welcome back
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="link" className="text-sm text-brand-navy p-0">
                      Forgot password?
                    </Button>
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
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    href="/signup"
                    className="font-medium text-brand-navy hover:text-brand-navy/80"
                  >
                    Sign up
                  </Link>
                </p>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">
                        Secure Login
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Your connection is encrypted and your data is protected by industry-standard security measures.
                      </p>
                    </div>
                  </div>
                </div>
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