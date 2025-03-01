'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TutorialVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId?: string;
}

// Default Wistia video ID for the tutorial
const DEFAULT_VIDEO_ID = 'xlnfx1ax34';

const TutorialVideoDialog = ({ open, onOpenChange, videoId }: TutorialVideoDialogProps) => {
  // Use the provided videoId or fall back to the default
  const activeVideoId = videoId || DEFAULT_VIDEO_ID;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-semibold text-brand-navy">
            TCSG Academy Portal Tour
          </DialogTitle>
        </DialogHeader>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            src={`https://fast.wistia.net/embed/iframe/${activeVideoId}?videoFoam=true`}
            className="absolute top-0 left-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="TCSG Academy Portal Tour"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { TutorialVideoDialog };
export default TutorialVideoDialog;