'use client';

import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface BuildCreditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PROFILES = [
  {
    image: "https://nyc3.digitaloceanspaces.com/production-creditfixrr-1930/AFFILIATE_LINKS_FILES/NklrhuL1owBsCutmXUMTbLlisiwzJy3C4qz7b0N1.png",
    heading: "Alliant Credit Union - Checking",
    subheading: "Elevate your checking from 'meh' to YEAH!",
    summary: "Alliant Credit Union offers a free checking account with no monthly fees, no minimum balance, and no ATM fees.",
    link: "https://track.flexlinkspro.com/g.ashx?foid=1.52846.1000000006&trid=1453429.237693&foc=16&fot=9999&fos=6"
  },
  {
    image: "https://nyc3.digitaloceanspaces.com/production-creditfixrr-1930/AFFILIATE_LINKS_FILES/qgyAJF5Jcf5ZGENJsnot5yZ6m5b60nzyqbwMb6Cg.png",
    heading: "Alliant Credit Union - Savings",
    subheading: "Earn more on your savings!",
    summary: "More savings, fewer fees from an award-winning online savings account",
    link: "https://fxo.co/IojA"
  },
  {
    image: "https://nyc3.digitaloceanspaces.com/production-creditfixrr-1930/AFFILIATE_LINKS_FILES/NklrhuL1owBsCutmXUMTbLlisiwzJy3C4qz7b0N1.png",
    heading: "Alliant Credit Union - Checking",
    subheading: "Elevate your checking from 'meh' to YEAH!",
    summary: "Alliant Credit Union offers a free checking account with no monthly fees, no minimum balance, and no ATM fees.",
    link: "https://track.flexlinkspro.com/g.ashx?foid=1.52846.1000000006&trid=1453429.237693&foc=16&fot=9999&fos=6"
  },
  {
    image: "https://nyc3.digitaloceanspaces.com/production-creditfixrr-1930/AFFILIATE_LINKS_FILES/qgyAJF5Jcf5ZGENJsnot5yZ6m5b60nzyqbwMb6Cg.png",
    heading: "Alliant Credit Union - Savings",
    subheading: "Earn more on your savings!",
    summary: "More savings, fewer fees from an award-winning online savings account",
    link: "https://fxo.co/IojA"
  }
];

export function BuildCreditProfileDialog({ open, onOpenChange }: BuildCreditProfileDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Build Your Credit Profile
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

        <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="">
            <p className="text-gray-600 mb-8">
              Credit builder programs serve as a bridge for consumers who need to establish or repair their credit, giving them opportunities to gain financial independence, qualify for loans, and manage their personal finances with more favorable terms.
            </p>
            <Image
              src={"/bcp.png"}
              alt="Build Your Credit Profile"
              width={200}
              height={200}
              className='w-auto object-cover'
            />
          </div>

          <div className="flex flex-col gap-20 max-h-[370px] overflow-y-auto">
            {
              PROFILES.map((profile, idx) => (
                <div key={idx}>
                  <div className="flex gap-4">
                    <Image
                      src={profile.image}
                      alt={profile.heading}
                      width={150}
                      height={200}
                      className='object-cover_ shrink-0'
                    />

                    <div className="">
                      <h2 className='text-md font-semibold text-brand-navy leading-5'>
                        {profile.heading}
                      </h2>
                      <p className='text-sm mt-1 text-gray-600'>
                        {profile.subheading}
                      </p>

                      <p className='text-sm text-gray-600 mt-4'>
                        {profile.summary}
                      </p>

                    </div>
                  </div>
                  <a href={profile.link} target="_blank" className='flex mt-3' rel="noopener noreferrer">
                    <Button
                      variant="default"
                      className="flex-1 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    >
                      Apply now
                    </Button>
                  </a>
                </div>
              ))
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}