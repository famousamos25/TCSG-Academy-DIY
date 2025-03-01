'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Download, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DigitalSignatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FONTS = [
  { value: 'dancing-script', label: 'Dancing Script', family: '"Dancing Script", cursive' },
  { value: 'homemade-apple', label: 'Homemade Apple', family: '"Homemade Apple", cursive' },
  { value: 'caveat', label: 'Caveat', family: '"Caveat", cursive' },
  { value: 'sacramento', label: 'Sacramento', family: '"Sacramento", cursive' },
  { value: 'great-vibes', label: 'Great Vibes', family: '"Great Vibes", cursive' },
];

const DigitalSignatureDialog = ({ open, onOpenChange }: DigitalSignatureDialogProps) => {
  const { toast } = useToast();
  const [typedSignature, setTypedSignature] = useState('');
  const [selectedFont, setSelectedFont] = useState(FONTS[0].value);

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Homemade+Apple&family=Caveat:wght@700&family=Sacramento&family=Great+Vibes&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const saveSignature = () => {
    // Create a temporary canvas to render the typed signature
    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');
    if (!tempContext) return;

    tempCanvas.width = 600;
    tempCanvas.height = 200;

    const font = FONTS.find(f => f.value === selectedFont);
    tempContext.font = `48px ${font?.family}`;
    tempContext.fillStyle = '#203965';
    tempContext.textAlign = 'center';
    tempContext.textBaseline = 'middle';
    tempContext.fillText(typedSignature, tempCanvas.width / 2, tempCanvas.height / 2);

    const signatureData = tempCanvas.toDataURL('image/png');

    // Here you would typically save the signature to your backend
    console.log('Signature saved:', signatureData);

    toast({
      title: 'Signature Saved',
      description: 'Your digital signature has been saved successfully.',
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-semibold text-brand-navy">
                Digital Signature
              </DialogTitle>
              <p className="text-gray-600 mt-2">
                Type your signature below. This will be used to sign your documents.
              </p>
            </div>
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

        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label className="text-brand-navy">Select Font Style</Label>
            <Select value={selectedFont} onValueChange={setSelectedFont}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a font style" />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map((font) => (
                  <SelectItem
                    key={font.value}
                    value={font.value}
                    style={{ fontFamily: font.family }}
                  >
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-brand-navy">Type Your Signature</Label>
            <div className="relative">
              <Input
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                placeholder="Type your signature here"
                className="text-2xl py-6 px-4 bg-gray-50 border-gray-200 focus:border-brand-navy focus:ring-brand-navy"
                style={{
                  fontFamily: FONTS.find(f => f.value === selectedFont)?.family
                }}
              />
              <Type className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Preview</p>
              <div
                className="min-h-[60px] flex items-center justify-center text-3xl text-brand-navy"
                style={{
                  fontFamily: FONTS.find(f => f.value === selectedFont)?.family
                }}
              >
                {typedSignature || 'Your signature will appear here'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
          >
            Cancel
          </Button>
          <Button
            onClick={saveSignature}
            disabled={!typedSignature}
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
          >
            <Download className="h-4 w-4 mr-2" />
            Save Signature
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { DigitalSignatureDialog };
export default DigitalSignatureDialog;