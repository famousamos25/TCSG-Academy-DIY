'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Mail, Lock, Shield, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface EmailUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentEmail: string;
}

export function EmailUpdateDialog({ open, onOpenChange, currentEmail }: EmailUpdateDialogProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    newEmail: '',
    currentPassword: '',
  });

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to update your email.',
        variant: 'destructive',
      });
      return;
    }

    if (!details.newEmail || !details.currentPassword) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // First, reauthenticate the user
      const credential = EmailAuthProvider.credential(
        currentEmail,
        details.currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Update email in Firebase Auth
      await updateEmail(user, details.newEmail);

      // Update email in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        email: details.newEmail,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: 'Success',
        description: 'Your email has been updated successfully.',
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating email:', error);
      toast({
        title: 'Update Failed',
        description: error instanceof Error ? error.message : 'Failed to update email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setDetails({ newEmail: '', currentPassword: '' });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Update Email Address
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleUpdateEmail} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label>Current Email</Label>
              <Input
                value={currentEmail}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div>
              <Label>New Email Address</Label>
              <div className="relative">
                <Input
                  value={details.newEmail}
                  onChange={(e) => setDetails(prev => ({ ...prev, newEmail: e.target.value }))}
                  type="email"
                  placeholder="Enter new email address"
                  className="pl-10"
                  disabled={loading}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <Label>Current Password</Label>
              <div className="relative">
                <Input
                  value={details.currentPassword}
                  onChange={(e) => setDetails(prev => ({ ...prev, currentPassword: e.target.value }))}
                  type="password"
                  placeholder="Enter your current password"
                  className="pl-10"
                  disabled={loading}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
            <Shield className="h-5 w-5 text-brand-navy mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">Security Verification Required</p>
              <p className="text-gray-600 mt-1">
                For your security, please enter your current password to verify your identity before updating your email address.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Email'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}