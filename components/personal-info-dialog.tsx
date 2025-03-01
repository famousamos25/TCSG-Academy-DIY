'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, User, Home, Phone, Lock, RefreshCw, Shield, Upload, AlertCircle, CheckCircle2, Trash2, Crop } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { savePersonalInfo, getPersonalInfo, type PersonalInfo } from '@/lib/personal-info';
import { uploadDocument, REQUIRED_DOCUMENTS, type UserDocument } from '@/lib/document-management';
import { Badge } from '@/components/ui/badge';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' }
];

interface PersonalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PersonalInfoDialog({ open, onOpenChange }: PersonalInfoDialogProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [info, setInfo] = useState<Partial<PersonalInfo>>({
    firstName: '',
    middleName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    email: '',
    ssn: '',
  });
  const [documents, setDocuments] = useState<Record<string, UserDocument[]>>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null; }>({});
  const [cropData, setCropData] = useState<{
    file: File | null;
    type: string;
    preview: string;
  } | null>(null);
  const cropperRef = useRef<any>(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      if (!user) return;

      try {
        const existingInfo = await getPersonalInfo(user.uid);
        if (existingInfo) {
          setInfo(existingInfo);
        } else if (user.email) {
          setInfo(prev => ({ ...prev, email: user.email ?? "" }));
        }
      } catch (error) {
        console.error('Error fetching personal info:', error);
      }
    };

    const fetchDocuments = async () => {
      if (!user) return;

      try {
        // Fetch documents for each type
        const docs: Record<string, UserDocument[]> = {};

        for (const docType of REQUIRED_DOCUMENTS) {
          const userDocs = await getDocumentsByType(user.uid, docType.type);
          if (userDocs.length > 0) {
            docs[docType.type] = userDocs;
          }
        }

        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    if (open) {
      fetchPersonalInfo();
      fetchDocuments();
    }
  }, [user, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to save your information.',
        variant: 'destructive',
      });
      return;
    }

    // Basic validation
    if (!info.firstName || !info.lastName || !info.address1 || !info.city || !info.state || !info.zipcode) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await savePersonalInfo(user.uid, info);

      // Update the checklist item status
      const checklistItem = CHECKLIST_ITEMS.find(item => item.title === 'Personal Information');
      if (checklistItem) {
        checklistItem.completed = true;
        checklistItem.status = 'Completed';
      }

      toast({
        title: 'Success',
        description: 'Your personal information has been saved.',
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Error saving personal info:', error);
      toast({
        title: 'Error',
        description: 'Failed to save personal information.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'File size must be less than 10MB',
        variant: 'destructive',
      });
      return;
    }

    // Validate file type
    const docConfig = REQUIRED_DOCUMENTS.find(doc => doc.type === documentType);
    if (!docConfig?.acceptedTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: `Please upload a ${docConfig?.acceptedTypes.join(' or ')} file`,
        variant: 'destructive',
      });
      return;
    }

    // For image files that need cropping
    if (
      documentType === 'drivers_license' ||
      documentType === 'social_security' ||
      documentType === 'utility_bill'
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropData({
          file,
          type: documentType,
          preview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      await uploadFile(file, documentType);
    }
  };

  const uploadFile = async (file: File, documentType: string) => {
    if (!user) return;

    try {
      setLoading(true);
      const uploadedDoc = await uploadDocument(user.uid, file, documentType);

      setDocuments(prev => ({
        ...prev,
        [documentType]: [...(prev[documentType] || []), uploadedDoc],
      }));

      toast({
        title: 'Document Uploaded',
        description: 'Your document has been uploaded successfully.',
      });

      // Check if all required documents are uploaded
      checkDocumentsCompletion();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const checkDocumentsCompletion = () => {
    // Check if all required documents are uploaded
    const requiredDocTypes = REQUIRED_DOCUMENTS.filter(doc => doc.required).map(doc => doc.type);
    const hasAllRequired = requiredDocTypes.every(type => documents[type] && documents[type].length > 0);

    if (hasAllRequired) {
      // Update the checklist item status
      const checklistItem = CHECKLIST_ITEMS.find(item => item.title === 'Personal Information');
      if (checklistItem) {
        checklistItem.completed = true;
        checklistItem.status = 'Completed';
      }
    }
  };

  const handleCrop = async () => {
    if (!cropData || !cropperRef.current || !user) return;

    try {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      canvas.toBlob(async (blob: Blob) => {
        const croppedFile = new File([blob], cropData.file?.name || 'cropped-image.jpg', {
          type: 'image/jpeg',
        });
        await uploadFile(croppedFile, cropData.type);
        setCropData(null);
      }, 'image/jpeg');
    } catch (error) {
      console.error('Error cropping image:', error);
      toast({
        title: 'Error',
        description: 'Failed to crop image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUploadClick = (documentType: string) => {
    const fileInput = fileInputRefs.current[documentType];
    if (fileInput) {
      fileInput.click();
    }
  };

  // Mock function for getDocumentsByType since it's not defined
  const getDocumentsByType = async (userId: string, type: string): Promise<UserDocument[]> => {
    // This would normally fetch documents from Firestore
    // For now, return the documents we already have in state
    return documents[type] || [];
  };

  // Mock CHECKLIST_ITEMS for updating completion status
  const CHECKLIST_ITEMS = [
    {
      title: 'Personal Information',
      completed: false,
      status: 'Incomplete',
    },
    // Other items would be here
  ];

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
                        onChange={(e) => setInfo(prev => ({ ...prev, firstName: e.target.value }))}
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
                      onChange={(e) => setInfo(prev => ({ ...prev, middleName: e.target.value }))}
                      placeholder="Middle name (optional)"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={info.lastName}
                      onChange={(e) => setInfo(prev => ({ ...prev, lastName: e.target.value }))}
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
                      onChange={(e) => setInfo(prev => ({ ...prev, address1: e.target.value }))}
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
                    onChange={(e) => setInfo(prev => ({ ...prev, address2: e.target.value }))}
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
                      onChange={(e) => setInfo(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="City"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={info.state}
                      onValueChange={(value) => setInfo(prev => ({ ...prev, state: value }))}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map(state => (
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
                      onChange={(e) => setInfo(prev => ({ ...prev, zipcode: e.target.value.replace(/\D/g, '') }))}
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
                        onChange={(e) => setInfo(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '') }))}
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
                        onChange={(e) => setInfo(prev => ({ ...prev, ssn: e.target.value.replace(/\D/g, '') }))}
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
                  <p className="font-medium text-gray-900">Your Information is Secure</p>
                  <p className="text-gray-600 mt-1">
                    Your personal information is encrypted and securely stored. We use this information to
                    auto-fill your dispute letters and verify your identity with credit bureaus.
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
                    'Save Information'
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="documents">
            <div className="py-4 space-y-6">
              {REQUIRED_DOCUMENTS.map((doc) => (
                <div key={doc.type} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{doc.label}</h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    {doc.required && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-600">
                        Required
                      </Badge>
                    )}
                  </div>

                  {documents[doc.type]?.length > 0 ? (
                    <div className="space-y-2">
                      {documents[doc.type].map((uploadedDoc) => (
                        <div
                          key={uploadedDoc.id}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-brand-yellow/10 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-brand-yellow" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{uploadedDoc.fileName}</div>
                              <div className="text-sm text-gray-600">
                                {new Date(uploadedDoc.uploadedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      onClick={() => handleUploadClick(doc.type)}
                      className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {doc.acceptedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to 10MB
                      </p>
                    </div>
                  )}

                  <input
                    ref={el => fileInputRefs.current[doc.type] = el as any}
                    type="file"
                    accept={doc.acceptedTypes.join(',')}
                    className="hidden"
                    onChange={e => handleFileChange(e, doc.type)}
                  />
                </div>
              ))}

              <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-brand-navy mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Document Requirements</p>
                  <p className="text-gray-600 mt-1">
                    All documents must be clear, legible, and current. Documents will be reviewed
                    within 24-48 hours. You will be notified if any documents need to be resubmitted.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Image Cropping Dialog */}
        {cropData && (
          <Dialog open={true} onOpenChange={() => setCropData(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Crop Document</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Cropper
                  ref={cropperRef}
                  src={cropData.preview}
                  style={{ height: 400, width: '100%' }}
                  aspectRatio={16 / 9}
                  guides={true}
                  preview=".preview"
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCropData(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCrop}
                    className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                  >
                    <Crop className="h-4 w-4 mr-2" />
                    Crop & Upload
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}