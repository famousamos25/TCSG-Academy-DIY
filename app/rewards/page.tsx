'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Eye,
  Users,
  Infinity,
  DollarSign,
  Send,
  UserPlus,
  Gift,
  Copy,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';
import { FAQDialog } from '@/components/faq-dialog';

interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
}

const STATS: Stat[] = [
  { label: 'Visitors', value: '3', icon: Eye },
  { label: 'Leads', value: '0', icon: Users },
  { label: 'Conversions', value: '0', icon: Infinity },
  { label: 'Commissions Due', value: '$0', icon: DollarSign },
];

const REFERRAL_STEPS = [
  {
    icon: Send,
    title: 'Send Invitation',
    description: 'Send your referral link to your friend',
  },
  {
    icon: UserPlus,
    title: 'Registration',
    description: 'Let them register to our services',
  },
  {
    icon: Gift,
    title: 'Free Trial',
    description: 'Earn 30% when they sign up via your link',
  },
];

export default function RewardsPage() {
  const [referralLink, setReferralLink] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const { toast } = useToast();

  const handleCopyLink = async () => {
    if (!referralLink) {
      toast({
        title: 'No Link Available',
        description: 'Please generate or enter your referral link first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: 'Link Copied!',
        description: 'Referral link copied to clipboard.',
      });
    } catch (error) {
      toast({
        title: 'Copy Failed',
        description: 'Failed to copy link to clipboard.',
        variant: 'destructive',
      });
    }
  };

  const handleSendInvite = () => {
    if (!email) return;

    setUpdating(true);
    setTimeout(() => {
      toast({
        title: 'Invitation Sent!',
        description: 'Your friend will receive an invitation email shortly.',
      });
      setEmail('');
      setUpdating(false);
    }, 1000);
  };

  const handleUpdateLink = () => {
    setUpdating(true);
    setTimeout(() => {
      toast({
        title: 'Link Updated',
        description: 'Your referral link has been updated.',
      });
      setUpdating(false);
    }, 1000);
  };

  const handleSocialShare = (platform: string) => {
    if (!referralLink) return;

    const encodedUrl = encodeURIComponent(referralLink);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">TCSG Academy Rewards</h1>
          <p className="text-gray-600">Earn rewards by referring friends and completing actions</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-brand-navy">{stat.value}</span>
            </div>
            <h3 className="text-gray-600">{stat.label}</h3>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Refer & Earn */}
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-brand-navy mb-4">Refer & Earn</h2>
            <p className="text-gray-600 mb-8">
              Invite your friends to TCSG Academy. When they sign up, you'll receive 30% of their first subscription.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {REFERRAL_STEPS.map((step, index) => (
                <div key={step.title} className="text-center">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto">
                      <step.icon className="h-6 w-6 text-brand-yellow" />
                    </div>
                    {index < REFERRAL_STEPS.length - 1 && (
                      <div className="absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 -translate-x-4" />
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                onClick={() => window.open('/signup', '_blank')}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Sign Up Now!
              </Button>
              <Button
                variant="outline"
                className="w-full text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                onClick={() => setFaqOpen(true)}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Common Questions
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-brand-navy mb-6">Progress</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Monthly Goal</span>
                  <span className="font-medium">0 of 5 referrals</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-medium">$0 earned</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Invite & Share */}
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-brand-navy mb-4">Invite your friends</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Enter your friend's email address and invite them to join TCSG Academy 😊
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    onClick={handleSendInvite}
                    disabled={!email || updating}
                  >
                    {updating ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">
                  Share the referral link
                </label>
                <p className="text-xs text-gray-500 mb-4">
                  You can also copy and send it or share it on your social media 🚀
                </p>
                <div className="flex space-x-2 mb-4">
                  <Input
                    value={referralLink}
                    onChange={(e) => setReferralLink(e.target.value)}
                    placeholder="Enter or generate your referral link"
                  />
                  <Button
                    variant="outline"
                    className="shrink-0 text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                    onClick={handleCopyLink}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                    onClick={handleUpdateLink}
                    disabled={updating}
                  >
                    {updating ? (
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Share2 className="h-4 w-4 mr-2" />
                    )}
                    Update Link
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-[#1877F2] border-[#1877F2] hover:bg-[#1877F2]/10"
                    onClick={() => handleSocialShare('facebook')}
                    disabled={!referralLink}
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-[#1DA1F2] border-[#1DA1F2] hover:bg-[#1DA1F2]/10"
                    onClick={() => handleSocialShare('twitter')}
                    disabled={!referralLink}
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-[#0A66C2] border-[#0A66C2] hover:bg-[#0A66C2]/10"
                    onClick={() => handleSocialShare('linkedin')}
                    disabled={!referralLink}
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-brand-navy mb-6">Referred Users</h2>
            <div className="border rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 text-sm font-medium text-gray-600">EMAIL</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-600">STATUS</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-600">DATE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={3}>
                      No referrals yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <FAQDialog open={faqOpen} onOpenChange={setFaqOpen} />
    </div>
  );
}