'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Send,
  Bot,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  ChevronRight,
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

interface SuggestedQuestion {
  text: string;
  action?: () => void;
}

export function AIChatbot() {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions: SuggestedQuestion[] = [
    {
      text: "How do I start a dispute?",
      action: () => handleSendMessage("How do I start a dispute?")
    },
    {
      text: "What documents do I need?",
      action: () => handleSendMessage("What documents do I need for a dispute?")
    },
    {
      text: "How long does the process take?",
      action: () => handleSendMessage("How long does the dispute process typically take?")
    },
    {
      text: "What if my dispute is rejected?",
      action: () => handleSendMessage("What should I do if my dispute is rejected?")
    }
  ];

  useEffect(() => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'users', user.uid, 'chat_messages'),
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
          scrollToBottom();
        },
        (error) => {
          console.error('Error fetching messages:', error);
          toast({
            title: 'Error',
            description: 'Failed to load chat history',
            variant: 'destructive',
          });
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up chat listener:', error);
    }
  }, [user, toast]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (text: string = message) => {
    if (!text.trim() || !user || loading) return;

    const userMessage = text.trim();
    setMessage('');
    setLoading(true);
    setIsFirstLoad(false);

    try {
      // Add user message to Firestore
      await addDoc(collection(db, 'users', user.uid, 'chat_messages'), {
        content: userMessage,
        role: 'user',
        timestamp: serverTimestamp()
      });

      // Get AI response
      // TODO:  Uncomment the following code to enable AI response
      // const response = await openai.chat.completions.create({
      //   model: 'gpt-4-turbo-preview',
      //   messages: [
      //     {
      //       role: 'system',
      //       content: `You are a credit repair expert helping users with dispute guidance. 
      //       Provide clear, step-by-step advice using simple language. 
      //       Keep responses concise and focused on practical actions.
      //       If the user needs to create a dispute, guide them to use the AI Dispute Assistant.`
      //     },
      //     {
      //       role: 'user',
      //       content: userMessage
      //     }
      //   ],
      //   max_tokens: 500,
      //   temperature: 0.7,
      // });

      // const aiResponse = response.choices[0].message.content;

      // // Add AI response to Firestore
      // await addDoc(collection(db, 'users', user.uid, 'chat_messages'), {
      //   content: aiResponse || 'I apologize, but I was unable to generate a response. Please try again.',
      //   role: 'assistant',
      //   timestamp: serverTimestamp()
      // });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to get response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-auto' : 'w-[400px]'}`}>
      {isMinimized ? (
        <Button
          className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 shadow-lg"
          onClick={() => setIsMinimized(false)}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          AI Assistant
        </Button>
      ) : (
        <Card className="flex flex-col h-[600px] shadow-xl">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-brand-navy text-white">
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              <span className="font-medium">AI Dispute Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsMinimized(true)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 && isFirstLoad ? (
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-brand-yellow/10 rounded-lg p-4 ml-2">
                    <p className="text-brand-navy font-medium mb-2">
                      Hello! I&apos;m your AI Dispute Assistant. How can I help you today?
                    </p>
                    <div className="space-y-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start text-left text-gray-600 hover:text-brand-navy"
                          onClick={question.action}
                        >
                          <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                          {question.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center mr-2">
                        <Bot className="h-4 w-4 text-brand-navy" />
                      </div>
                    )}
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
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1"
                disabled={loading}
              />
              <Button 
                onClick={() => handleSendMessage()}
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
          </div>
        </Card>
      )}
    </div>
  );
}