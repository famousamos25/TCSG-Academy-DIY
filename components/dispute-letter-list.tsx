'use client';

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/date-utils';
import { Eye, FileText, Mail, CheckCircle2, Trash2 } from 'lucide-react';
import { getDisputeLetters, markLetterAsSent, markLetterAsCompleted } from '@/lib/dispute-letters';

interface DisputeLetterListProps {
  status: 'draft' | 'ready' | 'sent' | 'completed';
  onViewLetter: (letterId: string) => void;
}

export function DisputeLetterList({ status, onViewLetter }: DisputeLetterListProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [letters, setLetters] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedLetters, setSelectedLetters] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!user) return;

    const fetchLetters = async () => {
      try {
        const fetchedLetters = await getDisputeLetters(user.uid, status);
        setLetters(fetchedLetters);
      } catch (error) {
        console.error('Error fetching letters:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dispute letters',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [user, status, toast]);

  const handleMarkAsSent = async (letterId: string) => {
    if (!user) return;

    try {
      await markLetterAsSent(user.uid, letterId);
      toast({
        title: 'Success',
        description: 'Letter marked as sent',
      });
      // Refresh letters
      const updatedLetters = await getDisputeLetters(user.uid, status);
      setLetters(updatedLetters);
    } catch (error) {
      console.error('Error marking letter as sent:', error);
      toast({
        title: 'Error',
        description: 'Failed to update letter status',
        variant: 'destructive',
      });
    }
  };

  const handleMarkAsCompleted = async (letterId: string) => {
    if (!user) return;

    try {
      await markLetterAsCompleted(user.uid, letterId);
      toast({
        title: 'Success',
        description: 'Letter marked as completed',
      });
      // Refresh letters
      const updatedLetters = await getDisputeLetters(user.uid, status);
      setLetters(updatedLetters);
    } catch (error) {
      console.error('Error marking letter as completed:', error);
      toast({
        title: 'Error',
        description: 'Failed to update letter status',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'ready':
        return <Badge className="bg-blue-50 text-blue-600">Ready to Send</Badge>;
      case 'sent':
        return <Badge className="bg-green-50 text-green-600">Sent</Badge>;
      case 'completed':
        return <Badge className="bg-purple-50 text-purple-600">Completed</Badge>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="h-32 text-center text-gray-500">
          Loading...
        </TableCell>
      </TableRow>
    );
  }

  if (letters.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="h-32 text-center">
          <div className="flex flex-col items-center">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Letters Found</h3>
            <p className="text-gray-600">
              {status === 'draft' && 'Start creating dispute letters to see them here'}
              {status === 'sent' && 'No letters have been sent yet'}
              {status === 'completed' && 'No completed disputes yet'}
            </p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableBody>
      {letters.map((letter) => (
        <TableRow key={letter.id}>
          <TableCell>
            <Checkbox
              checked={selectedLetters.includes(letter.id)}
              onCheckedChange={(checked) => {
                setSelectedLetters(prev =>
                  checked
                    ? [...prev, letter.id]
                    : prev.filter(id => id !== letter.id)
                );
              }}
            />
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="font-medium">{letter.title || 'Untitled Letter'}</span>
            </div>
          </TableCell>
          <TableCell>{letter.creditorName}</TableCell>
          <TableCell>{formatDate(letter.createdAt)}</TableCell>
          <TableCell>Round {letter.round || 1}</TableCell>
          <TableCell>{letter.disputedItems?.length || 0} items</TableCell>
          <TableCell>
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewLetter(letter.id)}
                className="text-gray-500 hover:text-brand-navy"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {status === 'ready' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMarkAsSent(letter.id)}
                  className="text-gray-500 hover:text-green-600"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              )}
              {status === 'sent' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMarkAsCompleted(letter.id)}
                  className="text-gray-500 hover:text-purple-600"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              )}
              {status === 'draft' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}