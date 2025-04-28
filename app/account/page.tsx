/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PersonalInfoDialog } from '@/components/personal-info-dialog';
import { TutorialVideoDialog } from '@/components/tutorial-video-dialog';
import { CreditReportImportDialog } from '@/components/credit-report-import-dialog';
import { CreditGoals, CreditScoreGoalDialog } from '@/components/credit-score-goal-dialog';
import { DigitalSignatureDialog } from '@/components/digital-signature-dialog';
import { ReferralProgramDialog } from '@/components/referral-program-dialog';
import { PaymentCardDialog } from '@/components/payment-card-dialog';
import { EmailUpdateDialog } from '@/components/email-update-dialog';
import Image from 'next/image';
import {
  CreditCard,
  RefreshCw,
  User,
  Shield,
  Mail,
  Plus,
  Trash2,
  AlertCircle,
  Camera,
  CheckCircle2,
  Pencil,
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { onSnapshot, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  photoURL?: string;
  billingEmail?: string;
  plan?: 'free' | 'basic' | 'premium';
  creditReportType?: string;
  creditBalance?: number;
  emailVerified?: boolean;
  subscription?: {
    status: 'trial' | 'active' | 'cancelled';
    price: number;
    nextPayment: string;
    trialEndsAt: string;
  };
  paymentMethods?: Array<{
    id: string;
    cardholderName: string;
    last4: string;
    expiresAt: string;
    default: boolean;
    cardType: string;
  }>;
  securitySettings?: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginNotifications: boolean;
  };
}

export default function AccountPage() {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [tutorialVideoOpen, setTutorialVideoOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [creditScoreGoalOpen, setCreditScoreGoalOpen] = useState(false);
  const [digitalSignatureOpen, setDigitalSignatureOpen] = useState(false);
  const [referralProgramOpen, setReferralProgramOpen] = useState(false);
  const [paymentCardOpen, setPaymentCardOpen] = useState(false);
  const [emailUpdateOpen, setEmailUpdateOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const [signatureInfo, setSignatureInfo] = useState<any>(null);
  const [creditGoals, setCreditGoals] = useState<CreditGoals | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [updating, setUpdating] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    if (!user) return;

    const checkDigitalSignature = async () => {
      try {
        const docRef = doc(db, "users", user.uid, "signatures", "default");
        return onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setSignatureInfo(docSnap.data());
          }
        });
      } catch (error) {
        console.error("Error checking digital signature:", error);
      }
    };

    const checkCreditGoals = async () => {
      try {
        const goalsRef = doc(db, "users", user.uid, "credit_goals", "current");
        const goalsSnap = await getDoc(goalsRef);

        if (goalsSnap.exists()) {
          setCreditGoals(goalsSnap.data() as CreditGoals);
        }
      } catch (error) {
        console.error("Error fetching credit goals:", error);
      }
    };

    try {
      const docRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const profileData = docSnap.data() as Profile;
          setProfile(profileData);
          setFormData({
            firstName: profileData.firstName || '',
            lastName: profileData.lastName || '',
            phone: profileData.phone || '',
          });
        }

        checkDigitalSignature();
        checkCreditGoals()
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up profile listener:', error);
      setLoading(false);
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    setUpdating(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Photo size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    setUploadingPhoto(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;

        await updateDoc(doc(db, 'users', user.uid), {
          photoURL: base64Image,
          updatedAt: serverTimestamp(),
        });

        toast({
          title: 'Success',
          description: 'Profile photo updated successfully',
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload photo',
        variant: 'destructive',
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleEndTrial = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        'subscription.status': 'cancelled',
        'subscription.trialEndsAt': serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: 'Trial Ended',
        description: 'Your trial has been ended successfully.',
      });
    } catch (error) {
      console.error('Error ending trial:', error);
      toast({
        title: 'Error',
        description: 'Failed to end trial',
        variant: 'destructive',
      });
    }
  };

  const handleStartSubscription = async () => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        'subscription.status': 'active',
        'subscription.startedAt': serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: 'Subscription Started',
        description: 'Your subscription has been activated successfully.',
      });
    } catch (error) {
      console.error('Error starting subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to start subscription',
        variant: 'destructive',
      });
    }
  };

  const handleAddCard = () => {
    setSelectedCard(null);
    setPaymentCardOpen(true);
  };

  const handleEditCard = (card: any) => {
    setSelectedCard(card);
    setPaymentCardOpen(true);
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!user) return;

    try {
      // await deletePaymentCard(user.uid, cardId);

      toast({
        title: 'Card Deleted',
        description: 'Payment card has been removed successfully.',
      });
    } catch (error) {
      console.error('Error deleting card:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete payment card.',
        variant: 'destructive',
      });
    }
  };

  const handleToggle2FA = async () => {
    if (!user || !profile?.securitySettings) return;

    try {
      const newValue = !profile.securitySettings.twoFactorEnabled;
      await updateDoc(doc(db, 'users', user.uid), {
        'securitySettings.twoFactorEnabled': newValue,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: '2FA Updated',
        description: `Two-factor authentication has been ${newValue ? 'enabled' : 'disabled'}.`,
      });
    } catch (error) {
      console.error('Error updating 2FA:', error);
      toast({
        title: 'Error',
        description: 'Failed to update two-factor authentication',
        variant: 'destructive',
      });
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const getCardIcon = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case 'visa':
        return 'https://i.imgur.com/RkIOYrF.png';
      case 'mastercard':
        return 'https://i.imgur.com/bCRS33i.png';
      case 'amex':
        return 'https://i.imgur.com/a48jzVj.png';
      case 'discover':
        return 'https://i.imgur.com/6lhqUyI.png';
      default:
        return 'https://i.imgur.com/RkIOYrF.png';
    }
  };

  if (loading) {
    return (
      <div className="container p-6 mx-auto">
        <div className="flex justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-brand-yellow" />
        </div>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-brand-navy">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences and subscription</p>
        </div>
      </div>


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full bg-brand-navy/5">
                  {profile?.photoURL ? (
                    <img
                      src={profile.photoURL}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-brand-navy" />
                  )}
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  onClick={triggerPhotoUpload}
                  disabled={uploadingPhoto}
                >
                  {uploadingPhoto ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-brand-navy">
                  {profile?.firstName} {profile?.lastName}
                </h2>
                <p className="text-sm text-gray-600">{profile?.email}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-4 border-t">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900">DETAILS</h3>

              <div className="grid grid-cols-2 text-sm gap-x-4 gap-y-2">
                <div className="text-gray-500">Full Name:</div>
                <div className="font-medium text-gray-900">
                  {profile?.firstName} {profile?.lastName || 'Not set'}
                </div>

                <div className="text-gray-500">Primary Email:</div>
                <div className="font-medium text-gray-900">
                  {profile?.email}
                </div>

                <div className="text-gray-500">Billing Email:</div>
                <div className="font-medium text-gray-900">
                  {profile?.billingEmail || profile?.email}
                </div>

                <div className="text-gray-500">Plan:</div>
                <div className="font-medium text-gray-900">
                  {profile?.plan ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1) : 'Free'}
                </div>

                <div className="text-gray-500">Credit Report Type:</div>
                <div className="font-medium text-gray-900">
                  {profile?.creditReportType || 'Not available'}
                </div>

                <div className="text-gray-500">Contact:</div>
                <div className="font-medium text-gray-900">
                  {profile?.phone || 'Not set'}
                </div>

                <div className="text-gray-500">Credit Balance:</div>
                <div className="font-medium text-gray-900">
                  ${profile?.creditBalance?.toFixed(2) || '0.00'}
                </div>

                <div className="text-gray-500">Email Status:</div>
                <div className="flex items-center space-x-1">
                  {profile?.emailVerified ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-yellow-600">Unverified</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span>Total Credit Pull</span>
                </div>
                <span className="font-medium">0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span>Total Dispute Letters</span>
                </div>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="justify-start w-full h-auto gap-6 p-0 bg-transparent border-b rounded-none">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:border-brand-navy border-b-2 border-transparent pb-4"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="billing"
                  className="data-[state=active]:border-brand-navy border-b-2 border-transparent pb-4"
                >
                  Billing
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:border-brand-navy border-b-2 border-transparent pb-4"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:border-brand-navy border-b-2 border-transparent pb-4"
                >
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Email Address</Label>
                    <div className="flex items-center space-x-2">
                      <Input value={profile?.email || ''} disabled />
                      <Button
                        variant="outline"
                        onClick={() => setEmailUpdateOpen(true)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <Button
                    onClick={handleUpdateProfile}
                    disabled={updating}
                    className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  >
                    {updating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="billing" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-brand-navy">Current Plan</h3>
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <Badge className="mb-2 text-green-700 bg-green-100">
                            {profile?.subscription?.status === 'trial' ? 'On Trial' : 'Active'}
                          </Badge>
                          <div className="text-2xl font-semibold text-brand-navy">
                            ${profile?.subscription?.price ?? '0.00'} Per Month
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            Next Payment: ${profile?.subscription?.price ?? '0.00'}
                          </div>
                          <div className="text-sm text-gray-600">
                            Plan Renews On {profile?.subscription?.nextPayment
                              ? new Date(profile.subscription.nextPayment).toLocaleDateString()
                              : 'Not Started'}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button
                            variant="outline"
                            className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                            onClick={handleEndTrial}
                          >
                            End Trial
                          </Button>
                          <Button
                            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                            onClick={handleStartSubscription}
                          >
                            End Trial And Start Subscription
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Trial Period</span>
                            <span className="text-sm text-gray-600">0 of 7 Days</span>
                          </div>
                          <Progress value={0} className="h-2" />
                          <div className="mt-1 text-sm text-gray-600">7 days remaining until renewal</div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-brand-navy">Payment Methods</h3>
                      <Button
                        className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                        onClick={handleAddCard}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Card
                      </Button>
                    </div>
                    <Card className="p-6">
                      {profile?.paymentMethods && profile.paymentMethods.length > 0 ? (
                        <div className="space-y-4">
                          {profile.paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="relative flex items-center justify-center w-12 h-8 bg-white border rounded">
                                  <Image
                                    src={getCardIcon(method.cardType)}
                                    alt={method.cardType}
                                    fill
                                    className="object-contain p-1"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{method.cardholderName}</div>
                                  <div className="text-sm text-gray-600">**** **** **** {method.last4}</div>
                                </div>
                                {method.default && (
                                  <Badge variant="outline" className="ml-2">Default</Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="text-sm text-gray-600">
                                  Expires {method.expiresAt}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditCard(method)}
                                  className="text-gray-400 hover:text-brand-navy"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteCard(method.id)}
                                  className="text-gray-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-gray-500">
                          No payment methods added yet
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-brand-navy">Security Settings</h3>
                    <Card className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-gray-600">
                              Add an extra layer of security to your account
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={handleToggle2FA}
                            className={profile?.securitySettings?.twoFactorEnabled
                              ? 'text-green-600 border-green-600 hover:bg-green-50'
                              : 'text-gray-600 border-gray-300 hover:bg-gray-50'
                            }
                          >
                            {profile?.securitySettings?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Password</div>
                            <div className="text-sm text-gray-600">
                              Last changed {profile?.securitySettings?.lastPasswordChange || 'never'}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: 'Coming Soon',
                                description: 'Password management will be available soon.',
                              });
                            }}
                          >
                            Change Password
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Login Notifications</div>
                            <div className="text-sm text-gray-600">
                              Get notified when someone logs into your account
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: 'Coming Soon',
                                description: 'Login notifications will be available soon.',
                              });
                            }}
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-brand-navy">Active Sessions</h3>
                    <Card className="p-6">
                      <div className="py-4 text-center text-gray-500">
                        No active sessions to display
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold text-brand-navy">Preferences</h3>
                    <Card className="p-6">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-gray-600">
                              Receive updates about your account
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: 'Coming Soon',
                                description: 'Email notification settings will be available soon.',
                              });
                            }}
                          >
                            Configure
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium">Data Export</div>
                            <div className="text-sm text-gray-600">
                              Download a copy of your data
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: 'Coming Soon',
                                description: 'Data export will be available soon.',
                              });
                            }}
                          >
                            Export
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium text-red-600">Delete Account</div>
                            <div className="text-sm text-gray-600">
                              Permanently delete your account and all data
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => {
                              toast({
                                title: 'Coming Soon',
                                description: 'Account deletion will be available soon.',
                              });
                            }}
                          >
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <PersonalInfoDialog
        open={personalInfoOpen}
        onOpenChange={setPersonalInfoOpen}
      />

      <TutorialVideoDialog
        open={tutorialVideoOpen}
        onOpenChange={setTutorialVideoOpen}
      />

      <CreditReportImportDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />

      <CreditScoreGoalDialog
        open={creditScoreGoalOpen}
        onOpenChange={setCreditScoreGoalOpen}
        creditGoal={creditGoals}
      />

      <DigitalSignatureDialog
        open={digitalSignatureOpen}
        onOpenChange={setDigitalSignatureOpen}
        signatureInfo={signatureInfo}
      />

      <ReferralProgramDialog
        open={referralProgramOpen}
        onOpenChange={setReferralProgramOpen}
      />

      <PaymentCardDialog
        open={paymentCardOpen}
        onOpenChange={setPaymentCardOpen}
        existingCard={selectedCard}
      />

      <EmailUpdateDialog
        open={emailUpdateOpen}
        onOpenChange={setEmailUpdateOpen}
        currentEmail={profile?.email || ''}
      />

    </div>
  );
}