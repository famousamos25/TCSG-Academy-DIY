'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Download, Printer, ExternalLink, CheckCircle2 } from 'lucide-react';

interface MailDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mailDetails: any;
}

export function MailDetailsDialog({ open, onOpenChange, mailDetails }: MailDetailsDialogProps) {
  if (!mailDetails) return null;

  const getTrackingStatus = () => {
    const statuses = [
      { label: 'Preparing to Mail', done: true },
      { label: 'On the Way', done: true },
      { label: 'Delivered', done: false }
    ];

    return (
      <div className="relative flex items-center justify-between mb-12 px-8">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-200">
          <div className="h-full bg-green-500 transition-all duration-500" style={{ width: '66%' }} />
        </div>

        {statuses.map((status, index) => (
          <div key={status.label} className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              status.done 
                ? 'bg-green-500 text-white' 
                : 'bg-white border-2 border-gray-200'
            }`}>
              {status.done ? <CheckCircle2 className="h-5 w-5" /> : null}
            </div>
            <span className={`text-sm mt-4 font-medium ${
              status.done ? 'text-green-600' : 'text-gray-400'
            }`}>
              {status.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Letter Tracking Status
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

        {getTrackingStatus()}

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-brand-navy mb-4 flex items-center">
                Recipient Details
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-600">Verified</Badge>
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-medium text-gray-900">{mailDetails.recipient}</p>
                <p className="text-gray-600">{mailDetails.recipientAddress}</p>
                <p className="text-gray-600">{mailDetails.recipientCityState}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-brand-navy mb-4">Sender Information</h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="font-medium text-gray-900">{mailDetails.senderName}</p>
                <p className="text-gray-600">{mailDetails.senderAddress}</p>
                <p className="text-gray-600">{mailDetails.senderCityState}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-brand-navy mb-4">Mail Information</h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Letter Name</span>
                  <span className="font-medium text-gray-900">{mailDetails.letterName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Number of Pages</span>
                  <span className="font-medium text-gray-900">{mailDetails.pages}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Print Color</span>
                  <span className="font-medium text-gray-900">{mailDetails.color}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Envelope Size</span>
                  <span className="font-medium text-gray-900">{mailDetails.envelopeSize}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-gray-600">Mail Service</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    {mailDetails.mailType}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-600">Expected Delivery</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-600">
                    In Production
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-brand-navy mb-4">Letter Preview</h3>
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-between p-3 bg-gray-800">
                <span className="text-white text-sm font-medium">{mailDetails.fileName}</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-white hover:text-gray-200 hover:bg-white/10">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:text-gray-200 hover:bg-white/10">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:text-gray-200 hover:bg-white/10">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="aspect-[8.5/11] bg-white m-4 rounded-lg shadow-lg">
                {/* Letter preview would be rendered here */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Letter Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}