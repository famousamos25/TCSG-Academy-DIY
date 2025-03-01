'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { mailingService } from '@/lib/mailing-service';
import {
  Mail,
  Truck,
  FileText,
  Printer,
  RefreshCw,
  DollarSign,
  Clock,
  CheckCircle2,
  X,
} from 'lucide-react';

interface MailingOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  letterId: string;
  letterContent: string;
  recipientAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
  };
  senderAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
  };
  onSuccess: (trackingNumber: string) => void;
}

export function MailingOptionsDialog({
  open,
  onOpenChange,
  letterId,
  letterContent,
  recipientAddress,
  senderAddress,
  onSuccess,
}: MailingOptionsDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState({
    method: 'first-class' as 'first-class' | 'certified',
    color: 'bw' as 'bw' | 'color',
    envelopeSize: 'small' as 'small' | 'large',
    pages: Math.ceil(letterContent.length / 3000), // Rough estimate
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const result = await mailingService.submitForMailing({
        userId: 'current-user-id', // This should come from auth context
        letterId,
        content: letterContent,
        recipientAddress,
        senderAddress,
        options,
      });

      toast({
        title: 'Letter Submitted',
        description: `Your letter has been submitted for mailing. Tracking number: ${result.trackingNumber}`,
      });

      onSuccess(result.trackingNumber);
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting letter:', error);
      toast({
        title: 'Submission Failed',
        description: 'Failed to submit letter for mailing. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateCost = () => {
    let cost = 0;
    
    // Base cost by mailing method
    cost += options.method === 'certified' ? 7.75 : 0.63;
    
    // Additional cost for color printing
    cost += options.color === 'color' ? (options.pages * 0.50) : (options.pages * 0.15);
    
    // Additional cost for large envelope
    cost += options.envelopeSize === 'large' ? 1.00 : 0;
    
    return cost.toFixed(2);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Mailing Options
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

        {loading ? (
          <div className="py-12 text-center">
            <RefreshCw className="h-16 w-16 text-brand-yellow mx-auto mb-6 animate-spin" />
            <h3 className="text-xl font-medium text-gray-900 mb-3">
              Submitting Your Letter
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Please wait while we process your letter for mailing...
            </p>
            <Progress value={65} className="w-full h-2" />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <Label className="text-base">Mailing Method</Label>
              <RadioGroup
                value={options.method}
                onValueChange={(value: 'first-class' | 'certified') => 
                  setOptions(prev => ({ ...prev, method: value }))}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <Card className={`p-4 cursor-pointer ${
                  options.method === 'first-class' ? 'border-brand-yellow ring-2 ring-brand-yellow/50' : ''
                }`}>
                  <RadioGroupItem value="first-class" id="first-class" className="sr-only" />
                  <Label htmlFor="first-class" className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-brand-navy" />
                        <span className="font-medium">First Class</span>
                      </div>
                      <span className="text-sm text-gray-600">$0.63</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">3-5 business days</p>
                  </Label>
                </Card>

                <Card className={`p-4 cursor-pointer ${
                  options.method === 'certified' ? 'border-brand-yellow ring-2 ring-brand-yellow/50' : ''
                }`}>
                  <RadioGroupItem value="certified" id="certified" className="sr-only" />
                  <Label htmlFor="certified" className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Truck className="h-5 w-5 text-brand-navy" />
                        <span className="font-medium">Certified Mail</span>
                      </div>
                      <span className="text-sm text-gray-600">$7.75</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">2-3 business days + tracking</p>
                  </Label>
                </Card>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base">Print Options</Label>
              <RadioGroup
                value={options.color}
                onValueChange={(value: 'bw' | 'color') => 
                  setOptions(prev => ({ ...prev, color: value }))}
                className="grid grid-cols-2 gap-4 mt-2"
              >
                <Card className={`p-4 cursor-pointer ${
                  options.color === 'bw' ? 'border-brand-yellow ring-2 ring-brand-yellow/50' : ''
                }`}>
                  <RadioGroupItem value="bw" id="bw" className="sr-only" />
                  <Label htmlFor="bw" className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Printer className="h-5 w-5 text-brand-navy" />
                        <span className="font-medium">Black & White</span>
                      </div>
                      <span className="text-sm text-gray-600">$0.15/page</span>
                    </div>
                  </Label>
                </Card>

                <Card className={`p-4 cursor-pointer ${
                  options.color === 'color' ? 'border-brand-yellow ring-2 ring-brand-yellow/50' : ''
                }`}>
                  <RadioGroupItem value="color" id="color" className="sr-only" />
                  <Label htmlFor="color" className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Printer className="h-5 w-5 text-brand-navy" />
                        <span className="font-medium">Color</span>
                      </div>
                      <span className="text-sm text-gray-600">$0.50/page</span>
                    </div>
                  </Label>
                </Card>
              </RadioGroup>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-brand-navy" />
                  <span className="font-medium">Letter Summary</span>
                </div>
                <div className="text-sm text-gray-600">
                  {options.pages} page{options.pages > 1 ? 's' : ''}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mailing Cost:</span>
                  <span>${options.method === 'certified' ? '7.75' : '0.63'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Printing Cost:</span>
                  <span>
                    ${((options.color === 'color' ? 0.50 : 0.15) * options.pages).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total Cost:</span>
                  <span>${calculateCost()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                disabled={loading}
              >
                <Mail className="h-4 w-4 mr-2" />
                Submit for Mailing
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}