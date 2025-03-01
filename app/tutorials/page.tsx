'use client';

import React from 'react';
import { Play, Clock, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TutorialVideoDialog } from '@/components/tutorial-video-dialog';

interface TutorialVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoId: string;
}

const TUTORIAL_VIDEOS: TutorialVideo[] = [
  {
    id: '1',
    title: 'TCSG Academy Portal Tour',
    description: 'Get started with a comprehensive tour of the TCSG Academy portal and learn how to navigate its features.',
    duration: '5:30',
    thumbnail: 'https://i.imgur.com/XjhZVKN.jpg',
    videoId: 'xlnfx1ax34'
  },
  {
    id: '2',
    title: 'Personal Information Tutorial',
    description: 'Learn how to properly set up your personal information and upload required documents.',
    duration: '4:15',
    thumbnail: 'https://i.imgur.com/8KZJZzF.jpg',
    videoId: 'personal-info-id'
  },
  {
    id: '3',
    title: 'One-Click Credit Report Import',
    description: 'See how to easily import your credit reports with our one-click import feature.',
    duration: '3:45',
    thumbnail: 'https://i.imgur.com/QF2JXk9.jpg',
    videoId: 'credit-import-id'
  },
  {
    id: '4',
    title: 'Dispute Letter Tracker Tutorial',
    description: 'Master the dispute letter tracking system to monitor your credit repair progress.',
    duration: '6:20',
    thumbnail: 'https://i.imgur.com/vN3nK9x.jpg',
    videoId: 'dispute-tracker-id'
  },
  {
    id: '5',
    title: 'Dispute Center Tutorial',
    description: 'Learn how to effectively use the dispute center to manage your credit disputes.',
    duration: '7:10',
    thumbnail: 'https://i.imgur.com/L5JyZR8.jpg',
    videoId: 'dispute-center-id'
  },
  {
    id: '6',
    title: 'Update Family Tutorial',
    description: 'Discover how to add and manage family members in your account.',
    duration: '3:30',
    thumbnail: 'https://i.imgur.com/M4XkVsd.jpg',
    videoId: 'family-update-id'
  }
];

export default function TutorialsPage() {
  const [selectedVideo, setSelectedVideo] = React.useState<TutorialVideo | null>(null);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Tutorial Videos</h1>
          <p className="text-gray-600">Learn how to use TCSG Academy effectively with our comprehensive video tutorials.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Info className="h-4 w-4" />
          <span>New tutorials are added regularly</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TUTORIAL_VIDEOS.map((video) => (
          <Card key={video.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  onClick={() => setSelectedVideo(video)}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Now
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-brand-navy mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{video.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{video.duration}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedVideo && (
        <TutorialVideoDialog
          open={!!selectedVideo}
          onOpenChange={(open) => !open && setSelectedVideo(null)}
          videoId={selectedVideo.videoId}
        />
      )}
    </div>
  );
}