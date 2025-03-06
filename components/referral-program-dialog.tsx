'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Send,
  UserPlus,
  Gift,
  ChevronDown,
  DollarSign,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

interface ReferralProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FAQ_ITEMS = [
  {
    question: 'Who is eligible for the TCSG Academy referral program?',
    answer: 'Any active TCSG Academy member can participate in our referral program. You just need to have a valid account to get started.'
  },
  {
    question: 'Do I need to have a TCSG Academy membership to get a unique referral code?',
    answer: 'Yes, you need to be a registered member to receive your unique referral code and start earning commissions.'
  },
  {
    question: 'Does my referral have to sign up for TCSG Academy?',
    answer: 'Yes, to earn a commission, your referral needs to sign up and subscribe to any TCSG Academy membership plan.'
  },
  {
    question: 'Who can I refer to TCSG Academy?',
    answer: 'You can refer anyone interested in credit repair services, including friends, family, and business contacts.'
  },
  {
    question: 'How do I ensure my friend\'s application is linked to my referral account?',
    answer: 'Your unique referral link automatically tracks all sign-ups. Make sure your friends use your specific link when registering.'
  },
  {
    question: 'How do I get paid?',
    answer: 'You\'ll earn 30% commission when your referral successfully signs up and pays for any membership plan. Payments are processed monthly.'
  }
];

export function ReferralProgramDialog({ open, onOpenChange }: ReferralProgramDialogProps) {
  const { toast } = useToast();
  const [step, setStep] = React.useState<'info' | 'faq'>('info');
  const referralLink = 'https://tcsgacademy.com/ref/123456'; // This would be dynamic in production

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: 'Success!',
        description: 'Referral link copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const handleMarkComplete = () => {
    toast({
      title: 'Completed!',
      description: 'Referral program introduction marked as complete',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              TCSG Academy Refer and Earn Program
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

        <div className="mt-4">
          <div className="text-gray-600 mb-8">
            Invite friends and family to TCSG Academy and earn 30% commission for every successful sign-up
            and payment through any of TCSG Academy&apos;s membership plans (DIY, Business, or Premium).
          </div>

          {step === 'info' ? (
            <>
              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-16 w-16 text-brand-yellow" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 space-y-8">
                    <h3 className="text-lg font-medium text-brand-navy mb-4">How It Works</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Send className="h-6 w-6 text-brand-yellow" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Send Invitation</h4>
                        <p className="text-sm text-gray-600">Share your unique referral link</p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <UserPlus className="h-6 w-6 text-brand-yellow" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Registration</h4>
                        <p className="text-sm text-gray-600">They sign up through your link</p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Gift className="h-6 w-6 text-brand-yellow" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Earn Rewards</h4>
                        <p className="text-sm text-gray-600">Get 30% when they subscribe</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-brand-navy mb-4">Your Referral Link</h3>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-white border rounded-lg px-4 py-2 text-sm text-gray-600">
                        {referralLink}
                      </div>
                      <Button
                        variant="outline"
                        className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                        onClick={handleCopyLink}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  className="text-brand-navy hover:bg-brand-navy/5"
                  onClick={() => setStep('faq')}
                >
                  View FAQ
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                    onClick={handleMarkComplete}
                  >
                    Mark As Complete
                  </Button>
                  <Button
                    className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    onClick={() => window.open('/rewards', '_blank')}
                  >
                    Visit Referral Center
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-lg font-medium text-brand-navy mb-4">Common Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {FAQ_ITEMS.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  className="text-brand-navy hover:bg-brand-navy/5"
                  onClick={() => setStep('info')}
                >
                  Back to Program Details
                </Button>

                <Button
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  onClick={handleMarkComplete}
                >
                  Mark As Complete
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}