'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MessageSquare,
  Send,
  Bot,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { openai } from '@/lib/openai';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: any;
}

export default function ChatGPTPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [user] = useAuthState(auth);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'users', user.uid, 'messages'),
        orderBy('timestamp', 'desc'),
        limit(50)
      );

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const newMessages = snapshot.docs
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            } as Message))
            .reverse();
          setMessages(newMessages);
          // Scroll to bottom after messages update
          setTimeout(() => scrollToBottom(), 100);
        },
        (error) => {
          console.error('Error fetching messages:', error);
          toast({
            title: 'Error',
            description: 'Failed to load messages. Please try again.',
            variant: 'destructive',
          });
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up message listener:', error);
    }
  }, [user, toast]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || loading) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);

    try {
      // Add user message to Firestore
      await addDoc(collection(db, 'users', user.uid, 'messages'), {
        content: userMessage,
        role: 'user',
        timestamp: serverTimestamp()
      });

      // Get AI response
      const response = await openai.analyzeDispute(user.uid, {
        creditor_name: "General Question",
        dispute_type: "Credit Education",
        additional_info: userMessage
      });

      if (!response || !response.analysis) {
        throw new Error('Failed to get AI response');
      }

      // Add AI response to Firestore
      await addDoc(collection(db, 'users', user.uid, 'messages'), {
        content: response.analysis,
        role: 'assistant',
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-gray-600">
            Please sign in to use the AI Credit Assistant.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">AI Credit Assistant</h1>
          <p className="text-gray-600">Get instant answers to your credit repair questions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-brand-yellow" />
                <span className="font-medium text-gray-900">Credit AI</span>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-center text-gray-500">
                  <div>
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-brand-yellow" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      How can I help you today?
                    </h3>
                    <p className="text-sm">
                      Ask me anything about credit repair, disputes, or credit building strategies
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.role === 'user'
                            ? 'bg-brand-yellow text-brand-navy'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                  disabled={loading}
                />
                <Button 
                  type="submit" 
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  disabled={loading || !message.trim()}
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <h3 className="font-medium text-gray-900 mb-3">Suggested Topics</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-left text-gray-600 hover:text-brand-navy"
                onClick={() => setMessage("How do I dispute errors on my credit report?")}
              >
                How to dispute errors?
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left text-gray-600 hover:text-brand-navy"
                onClick={() => setMessage("What are the best ways to improve my credit score?")}
              >
                Improve credit score tips
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-left text-gray-600 hover:text-brand-navy"
                onClick={() => setMessage("How do I read and understand my credit report?")}
              >
                Understanding credit reports
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-brand-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1">AI Assistant Tips</h3>
                <p className="text-sm text-gray-600">
                  Be specific with your questions for more accurate answers. The AI can help with
                  general guidance but cannot provide legal advice.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}