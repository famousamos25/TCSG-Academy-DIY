'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FAQDialog({ open, onOpenChange }: FAQDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Common Questions
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

        <div className="mt-6">
          <p className="text-gray-600 mb-6">
            Get paid. Refer a friend to TCSG Academy and you'll earn 30% when they complete their first successful TCSG Academy membership payment.*
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Who is eligible for the TCSG Academy referral program?</AccordionTrigger>
              <AccordionContent>
                Any active TCSG Academy member can participate in our referral program. You just need to have a valid account to get started.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need to have a TCSG Academy membership to get a unique referral code?</AccordionTrigger>
              <AccordionContent>
                Yes, you need to be a registered member to receive your unique referral code and start earning commissions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Does my referral have to sign up for TCSG Academy?</AccordionTrigger>
              <AccordionContent>
                Yes, to earn a commission, your referral needs to sign up and subscribe to any TCSG Academy membership plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Who can I refer to TCSG Academy?</AccordionTrigger>
              <AccordionContent>
                You can refer anyone interested in credit repair services, including friends, family, and business contacts.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I ensure my friend's application is linked to my referral account?</AccordionTrigger>
              <AccordionContent>
                Your unique referral link automatically tracks all sign-ups. Make sure your friends use your specific link when registering.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How do I get paid 💰?</AccordionTrigger>
              <AccordionContent>
                You'll earn 30% commission when your referral successfully signs up and pays for any membership plan. Payments are processed monthly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}