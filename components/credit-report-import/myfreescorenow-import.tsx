'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, AlertCircle, Lock, Shield, Mail } from 'lucide-react';
import { myFreeScoreNow } from '@/lib/credit-services/myfreescorenow';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface MyFreeScoreNowImportProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export function MyFreeScoreNowImport({ onSuccess, onError }: MyFreeScoreNowImportProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleImport = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to import your credit report.',
        variant: 'destructive',
      });
      return;
    }

    if (!credentials.email || !credentials.password) {
      toast({
        title: 'Missing Information',
        description: 'Please enter both email and password.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      // Simulate progress during import
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      await myFreeScoreNow.importCreditReport(user.uid, credentials);
      
      clearInterval(progressInterval);
      setProgress(100);

      toast({
        title: 'Success',
        description: 'Credit report imported successfully.',
      });
      
      onSuccess();
    } catch (error) {
      console.error('Import error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to import credit report';
      
      toast({
        title: 'Import Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      
      onError(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-start space-x-3 text-sm">
          <Shield className="h-5 w-5 text-brand-navy mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900">MyFreeScoreNow.com Import</h4>
            <p className="text-gray-600 mt-1">
              Enter your MyFreeScoreNow.com credentials to import your credit report.
              Your credentials are securely encrypted and only used for importing your report.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your MyFreeScoreNow.com email"
                disabled={loading}
                className="pl-10"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter your MyFreeScoreNow.com password"
                disabled={loading}
                className="pl-10"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {loading && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-center text-gray-600">
              Importing your credit report... {progress}%
            </p>
          </div>
        )}

        <Button
          onClick={handleImport}
          disabled={loading || !credentials.email || !credentials.password}
          className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
        >
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            'Import Credit Report'
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          By proceeding, you agree to MyFreeScoreNow.com's Terms of Service and Privacy Policy
        </div>
      </div>
    </Card>
  );
}