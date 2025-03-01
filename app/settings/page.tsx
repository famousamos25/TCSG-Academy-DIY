'use client';

import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export default function SettingsPage() {
  const { toast } = useToast();
  const [videoId, setVideoId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    let mounted = true;

    async function fetchVideoId() {
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please sign in to access settings.',
          variant: 'destructive',
        });
        return;
      }

      try {
        const settingsRef = doc(db, 'settings', 'tutorial_video');
        const docSnap = await getDoc(settingsRef);

        if (docSnap.exists() && mounted) {
          setVideoId(docSnap.data().value);
        }
      } catch (error) {
        console.error('Failed to fetch video ID:', error);
        if (mounted) {
          toast({
            title: 'Error',
            description: 'Failed to load video settings',
            variant: 'destructive',
          });
        }
      }
    }

    fetchVideoId();
    return () => { mounted = false; };
  }, [toast, user]);

  const handleSave = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to update settings.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'tutorial_video'), {
        value: videoId,
        updatedAt: new Date().toISOString()
      });

      toast({
        title: 'Settings Updated',
        description: 'The tutorial video has been updated successfully.',
      });
    } catch (error) {
      console.error('Failed to update video settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update video settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tutorial Video Settings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="videoId">Wistia Video ID</Label>
              <div className="mt-1.5">
                <Input
                  id="videoId"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="Enter Wistia video ID"
                />
              </div>
              <div className="flex items-start mt-2 text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 mr-1.5 mt-0.5 flex-shrink-0" />
                <p>
                  Enter the Wistia video ID from your dashboard. This video will be shown to all users
                  when they click &quot;Watch Now&quot; in the tutorial section.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                onClick={handleSave} 
                className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}