'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, FileText, Upload, X } from 'lucide-react';
import { REQUIRED_DOCUMENTS } from '@/services/document.service';

interface MissingDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  missingDocuments: string[];
  onUploadClick: () => void;
}

export function MissingDocumentsDialog({
  open,
  onOpenChange,
  missingDocuments,
  onUploadClick,
}: MissingDocumentsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Required Documents Missing
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

        <div className="py-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Documents Required
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  The following documents are required to submit your dispute. Please upload them to continue.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {REQUIRED_DOCUMENTS.filter(doc => 
              missingDocuments.includes(doc.label)
            ).map((doc) => (
              <Card key={doc.type} className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{doc.label}</h3>
                    <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                    <div className="text-xs text-gray-500 mt-2">
                      Accepted formats: {doc.acceptedTypes.map(type => 
                        type.split('/')[1].toUpperCase()
                      ).join(', ')}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
            >
              Cancel
            </Button>
            <Button
              onClick={onUploadClick}
              className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}