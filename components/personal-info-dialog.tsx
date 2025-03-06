"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  X,
  User,
  Home,
  Phone,
  Lock,
  RefreshCw,
  Shield,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import {
  savePersonalInfo,
  getPersonalInfo,
  type PersonalInfo,
} from "@/lib/personal-info";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import UploadedUserDocuments from './personal-info/uploaded-user-documents';
import { CHECKLIST_ITEMS } from '@/constants/checklist';

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

interface PersonalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PersonalInfoDialog({
  open,
  onOpenChange,
}: PersonalInfoDialogProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState("info");
  const [info, setInfo] = useState<Partial<PersonalInfo>>({
    firstName: "",
    middleName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    email: "",
    ssn: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your information.",
        variant: "destructive",
      });
      return;
    }

    // Basic validation
    if (
      !info.firstName ||
      !info.lastName ||
      !info.address1 ||
      !info.city ||
      !info.state ||
      !info.zipcode
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await savePersonalInfo(user.uid, info);

      // Update the checklist item status
      const checklistItem = CHECKLIST_ITEMS.find(
        (item) => item.title === "Personal Information"
      );
      if (checklistItem) {
        checklistItem.completed = true;
        checklistItem.status = "Completed";
      }

    
      await setDoc(doc(db, "users", user.uid, "activity", "personalInfo"), {
        completed: true,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Success",
        description: "Your personal information has been saved.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving personal info:", error);
      toast({
        title: "Error",
        description: "Failed to save personal information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!user) return;

      try {
        const existingInfo = await getPersonalInfo(user.uid);
        if (existingInfo) {
          setInfo(existingInfo);
        } else if (user.email) {
          setInfo((prev) => ({ ...prev, email: user.email ?? "" }));
        }
      } catch (error) {
        console.error("Error fetching personal info:", error);
      }
    };

    if (open) {
      fetchPersonalInfo();
    }
  }, [user, open]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold text-brand-navy">
              Personal Information
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Personal Info</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <Input
                        id="firstName"
                        value={info.firstName}
                        onChange={(e) =>
                          setInfo((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        placeholder="First name"
                        className="pl-10"
                        disabled={loading}
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      value={info.middleName}
                      onChange={(e) =>
                        setInfo((prev) => ({
                          ...prev,
                          middleName: e.target.value,
                        }))
                      }
                      placeholder="Middle name (optional)"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={info.lastName}
                      onChange={(e) =>
                        setInfo((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      placeholder="Last name"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address1">Address Line 1</Label>
                  <div className="relative">
                    <Input
                      id="address1"
                      value={info.address1}
                      onChange={(e) =>
                        setInfo((prev) => ({
                          ...prev,
                          address1: e.target.value,
                        }))
                      }
                      placeholder="Street address"
                      className="pl-10"
                      disabled={loading}
                    />
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address2">Address Line 2</Label>
                  <Input
                    id="address2"
                    value={info.address2}
                    onChange={(e) =>
                      setInfo((prev) => ({ ...prev, address2: e.target.value }))
                    }
                    placeholder="Apartment, suite, etc. (optional)"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={info.city}
                      onChange={(e) =>
                        setInfo((prev) => ({ ...prev, city: e.target.value }))
                      }
                      placeholder="City"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={info.state}
                      onValueChange={(value) =>
                        setInfo((prev) => ({ ...prev, state: value }))
                      }
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="zipcode">Zipcode</Label>
                    <Input
                      id="zipcode"
                      value={info.zipcode}
                      onChange={(e) =>
                        setInfo((prev) => ({
                          ...prev,
                          zipcode: e.target.value.replace(/\D/g, ""),
                        }))
                      }
                      placeholder="Zipcode"
                      maxLength={5}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        value={info.phone}
                        onChange={(e) =>
                          setInfo((prev) => ({
                            ...prev,
                            phone: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="Phone number"
                        className="pl-10"
                        disabled={loading}
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ssn">Social Security Number</Label>
                    <div className="relative">
                      <Input
                        id="ssn"
                        type="password"
                        value={info.ssn}
                        onChange={(e) =>
                          setInfo((prev) => ({
                            ...prev,
                            ssn: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="SSN"
                        maxLength={9}
                        className="pl-10"
                        disabled={loading}
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                <Shield className="h-5 w-5 text-brand-navy mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">
                    Your Information is Secure
                  </p>
                  <p className="text-gray-600 mt-1">
                    Your personal information is encrypted and securely stored.
                    We use this information to auto-fill your dispute letters
                    and verify your identity with credit bureaus.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                  className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Information"
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>

          <UploadedUserDocuments />
        </Tabs>

        
      </DialogContent>
    </Dialog>
  );
}
