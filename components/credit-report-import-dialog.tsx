"use client";

import { importMyFreeScoreNow } from '@/app/creditreport/api/myfreescorenow-import';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { encrypt } from "@/lib/encryption";
import { auth, db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Lock,
  RefreshCw,
  User,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreditReportImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CREDIT_SERVICES = [
  {
    name: "SmartCredit",
    logo: "https://i.imgur.com/RKqeWHe.png",
    description: "Comprehensive credit monitoring with real-time alerts",
    signupUrl: "https://smartcredit.com",
  },
  {
    name: "MyFreeScoreNow",
    logo: "https://i.imgur.com/vhCZose.png",
    description: "Free credit scores and monitoring services",
    signupUrl: "https://myfreescorenow.com",
  },
  {
    name: "IdentityIQ",
    logo: "https://i.imgur.com/c2VWHFM.png",
    description: "Identity theft protection and credit monitoring",
    signupUrl: "https://identityiq.com",
  },
  {
    name: "MyScoreIQ",
    logo: "https://i.imgur.com/RecPXag.png",
    description: "Advanced credit monitoring and identity protection",
    signupUrl: "https://myscoreiq.com",
  },
];

const CreditReportImportDialog = ({
  open,
  onOpenChange,
}: CreditReportImportDialogProps) => {
  // Keep all existing component implementation...
  const { toast } = useToast();
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [user] = useAuthState(auth);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setCredentials({ username: "", password: "" });
  };

  const handleBackToServices = () => {
    setSelectedService(null);
    setCredentials({ username: "", password: "" });
  };

  const handleImportWithCredentials = async () => {
    if (!user || !selectedService) return;
    if (!credentials.username || !credentials.password) {
      toast({
        title: "Invalid Credentials",
        description: "Please enter your username and password to import your credit report.",
        variant: "destructive",
      });
      return;
    }

    if (selectedService !== "MyFreeScoreNow") return; // Only MyFreeScoreNow is supported for now

    let interval: NodeJS.Timeout | null = null;
    try {
      setImporting(true);
      setProgress(0);

      // Encrypt and store credentials
      const encryptedCredentials = {
        username: encrypt(credentials.username),
        password: encrypt(credentials.password),
      };

      // Save credentials to Firestore
      await setDoc(
        doc(db, "users", user.uid, "credit_monitoring", selectedService),
        {
          service: selectedService,
          credentials: encryptedCredentials,
          updatedAt: serverTimestamp(),
        }
      );

      // Simulate import process
      if (selectedService === "MyFreeScoreNow") {
        interval = setInterval(() => {
          setProgress((prev) => (prev >= 90 ? prev : prev + 10));
        }, 500);

        
        const result = await importMyFreeScoreNow(user.uid, credentials);
        clearInterval(interval);

        if (result.success) {
          toast({
            title: "Import Successful",
            description: "Your credit report has been successfully imported.",
          });

          setTimeout(() => {
            onOpenChange(false);
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Import failed:", error);
      toast({
        title: "Import Failed",
        description:
          "Failed to import credit report. Please check your credentials and try again.",
        variant: "destructive",
      });
      setImporting(false);
      setProgress(0);
      if(!!interval) clearInterval(interval);
    }
  };

  // const handleTestImport = async () => {
  //   if (!user) {
  //     toast({
  //       title: "Authentication Required",
  //       description: "Please sign in to import your credit report.",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setImporting(true);
  //   setProgress(0);

  //   try {
  //     const interval = setInterval(() => {
  //       setProgress((prev) => (prev >= 90 ? prev : prev + 10));
  //     }, 500);

  //     const result = await importTestReport(user.uid);
  //     clearInterval(interval);
  //     setProgress(100);

  //     if (result.success) {
  //       toast({
  //         title: "Import Successful",
  //         description: "Test credit report has been imported successfully.",
  //       });

  //       setTimeout(() => {
  //         onOpenChange(false);
  //         window.location.reload();
  //       }, 1000);
  //     }
  //   } catch (error) {
  //     console.error("Import failed:", error);
  //     toast({
  //       title: "Import Failed",
  //       description: "Failed to import test data. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setImporting(false);
  //     setProgress(0);
  //   }
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-brand-navy">
            Import Credit Report
          </DialogTitle>
        </DialogHeader>

        {importing ? (
          <div className="py-12">
            <div className="text-center">
              <RefreshCw className="w-16 h-16 mx-auto mb-6 text-brand-yellow animate-spin" />
              <h3 className="mb-3 text-xl font-medium text-gray-900">
                Importing Your Credit Report
              </h3>
              <p className="max-w-md mx-auto mb-8 text-gray-600">
                Please wait while we securely process and analyze your credit
                report data...
              </p>
              <div className="max-w-md mx-auto space-y-4">
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-4 gap-4">
                  {["Connecting", "Importing", "Processing", "Analyzing"].map(
                    (step, index) => {
                      const isComplete = progress >= (index + 1) * 25;
                      return (
                        <div key={step} className="text-center">
                          <div className="flex justify-center mb-2">
                            {isComplete ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500" />
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-200 rounded-full" />
                            )}
                          </div>
                          <span
                            className={`text-sm ${
                              isComplete ? "text-gray-900" : "text-gray-500"
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : selectedService ? (
          <div className="py-6">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={handleBackToServices}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>

            <div className="grid grid-cols-1 gap-8">
              <div>
                <Card className="p-6">
                  <div className="relative w-32 h-8 mb-4">
                    <Image
                      src={
                        CREDIT_SERVICES.find((s) => s.name === selectedService)
                          ?.logo || ""
                      }
                      alt={selectedService}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-gray-900">
                    Login to {selectedService}
                  </h3>
                  <p className="mb-6 text-sm text-gray-600">
                    Enter your credentials to import your credit report
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <div className="relative">
                        <User className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                          id="username"
                          value={credentials.username}
                          onChange={(e) =>
                            setCredentials((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          className="pl-10"
                          placeholder="Enter your username"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                        <Input
                          id="password"
                          type="password"
                          value={credentials.password}
                          onChange={(e) =>
                            setCredentials((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          className="pl-10"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    onClick={handleImportWithCredentials}
                    disabled={!credentials.username || !credentials.password}
                  >
                    Import Report
                  </Button>

                  <div className="mt-4 text-center">
                    <Button
                      variant="link"
                      size="sm"
                      className="text-brand-navy"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(
                          CREDIT_SERVICES.find(
                            (s) => s.name === selectedService
                          )?.signupUrl,
                          "_blank"
                        );
                      }}
                    >
                      Don&apos;t have an account? Sign up{" "}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Test Import
                </h3>
                <Card className="p-6 border-dashed bg-gray-50">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-brand-yellow" />
                    <h4 className="mb-2 text-lg font-medium text-gray-900">
                      Import Test Data
                    </h4>
                    <p className="mb-6 text-sm text-gray-600">
                      Try out the features with simulated credit report data
                    </p>
                    <Button
                      onClick={handleTestImport}
                      className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    >
                      Import Test Report
                    </Button>
                  </div>
                </Card>

                <div className="mt-6">
                  <div className="flex items-start space-x-3 text-sm text-gray-500">
                    <AlertCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="mb-1 font-medium text-gray-900">
                        Important Note
                      </p>
                      <p>
                        Your credentials are securely encrypted and only used to
                        import your credit report. We use industry-standard
                        encryption to protect your sensitive information.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Select Credit Monitoring Service
                </h3>
                <div className="space-y-4">
                  {CREDIT_SERVICES.map((service) => (
                    <Card
                      key={service.name}
                      className={`p-4 cursor-pointer transition-all ${
                        selectedService === service.name
                          ? "border-brand-yellow bg-brand-yellow/5"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => handleServiceSelect(service.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="relative w-32 h-8">
                          <Image
                            src={service.logo}
                            alt={service.name}
                            fill
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-brand-navy"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(service.signupUrl, "_blank");
                          }}
                        >
                          Sign Up <ExternalLink className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {service.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* <div className='hidden'>
                <h3 className="mb-4 text-lg font-medium text-gray-900">
                  Test Import
                </h3>
                <Card className="p-6 border-dashed bg-gray-50">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-brand-yellow" />
                    <h4 className="mb-2 text-lg font-medium text-gray-900">
                      Import Test Data
                    </h4>
                    <p className="mb-6 text-sm text-gray-600">
                      Try out the features with simulated credit report data
                    </p>
                    <Button
                      onClick={handleTestImport}
                      className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                    >
                      Import Test Report
                    </Button>
                  </div>
                </Card>

                <div className="mt-6">
                  <div className="flex items-start space-x-3 text-sm text-gray-500">
                    <AlertCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="mb-1 font-medium text-gray-900">
                        Important Note
                      </p>
                      <p>
                        The test import uses simulated data for demonstration
                        purposes. For real credit monitoring, please sign up
                        with one of our partner services.
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="pt-6 mt-8 border-t">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Don&apos;t have an account? Sign up with any of our partner
                  services.
                </div>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreditReportImportDialog;

export { CreditReportImportDialog };
