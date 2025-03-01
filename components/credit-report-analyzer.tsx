'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  BarChart,
  Target,
  Clock,
  Download,
  Lightbulb,
  Zap,
  Filter,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { 
  analyzeCreditReport, 
  extractCreditReportFromPDF,
  type CreditReportData,
  type AnalysisResult
} from '@/lib/credit-report-analysis';

interface CreditReportAnalyzerProps {
  onAnalysisComplete?: (analysis: AnalysisResult) => void;
}

export function CreditReportAnalyzer({ onAnalysisComplete }: CreditReportAnalyzerProps) {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upload');
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reportData, setReportData] = useState<CreditReportData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (file.type !== 'application/pdf') {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a PDF credit report',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Maximum file size is 10MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Read file as ArrayBuffer
      const fileBuffer = await readFileAsArrayBuffer(file);
      
      // Extract data from PDF
      const extractedData = await extractCreditReportFromPDF(user.uid, fileBuffer);
      setReportData(extractedData);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      toast({
        title: 'Upload Complete',
        description: 'Credit report uploaded successfully',
      });
      
      setActiveTab('analyze');
    } catch (error) {
      console.error('Error uploading credit report:', error);
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'Failed to upload credit report',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!user || !reportData) return;

    setAnalyzing(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90));
      }, 300);

      // Analyze credit report
      const analysisResult = await analyzeCreditReport(user.uid, reportData);
      setAnalysis(analysisResult);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      toast({
        title: 'Analysis Complete',
        description: 'Credit report analysis completed successfully',
      });
      
      setActiveTab('results');
      
      // Notify parent component
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult);
      }
    } catch (error) {
      console.error('Error analyzing credit report:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to analyze credit report',
        variant: 'destructive',
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-50 text-red-600">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-50 text-yellow-600">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-blue-50 text-blue-600">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const getSuccessProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-green-600';
    if (probability >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start gap-6 p-0 bg-transparent border-b rounded-none h-auto">
          <TabsTrigger
            value="upload"
            className="data-[state=active]:border-brand-navy border-b-2 border-transparent pb-4"
            disabled={uploading}
          >
            Upload Report
          </TabsTrigger>
          <TabsTrigger
            value="analyze"
            className="data-[state=active]:border-brand-navy border-b-2 border-transparent pb-4"
            disabled={!reportData || analyzing}
          >
            Analyze Report
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="data-[state=active]:border-brand-navy border-b-2 border-transparent pb-4"
            disabled={!analysis}
          >
            Results & Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="p-6">
          {uploading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-16 w-16 text-brand-yellow mx-auto mb-6 animate-spin" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Uploading Credit Report
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Please wait while we upload and process your credit report...
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(progress)}% Complete
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-brand-yellow transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Upload Credit Report
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Upload your credit report PDF to analyze and identify dispute opportunities
                </p>
                <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                  Select PDF File
                </Button>
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: PDF (Max 10MB)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="mt-8 max-w-2xl mx-auto">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 text-brand-yellow mr-2" />
                  Supported Credit Report Formats
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <img 
                      src="https://i.imgur.com/a48jzVj.png" 
                      alt="TransUnion" 
                      className="h-8 mx-auto mb-2 object-contain" 
                    />
                    <p className="text-sm text-gray-600">TransUnion Reports</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <img 
                      src="https://i.imgur.com/bCRS33i.png" 
                      alt="Experian" 
                      className="h-8 mx-auto mb-2 object-contain" 
                    />
                    <p className="text-sm text-gray-600">Experian Reports</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <img 
                      src="https://i.imgur.com/6lhqUyI.png" 
                      alt="Equifax" 
                      className="h-8 mx-auto mb-2 object-contain" 
                    />
                    <p className="text-sm text-gray-600">Equifax Reports</p>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analyze" className="p-6">
          {analyzing ? (
            <div className="text-center py-12">
              <Sparkles className="h-16 w-16 text-brand-yellow mx-auto mb-6 animate-pulse" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Analyzing Credit Report
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Our AI is analyzing your credit report to identify dispute opportunities...
              </p>
              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">
                  {Math.round(progress)}% Complete
                </p>
              </div>
            </div>
          ) : reportData ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Credit Report Uploaded Successfully</h4>
                  <p className="text-sm text-gray-600">
                    Your credit report has been uploaded and is ready for analysis. Click the button below to analyze your report and identify dispute opportunities.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Accounts</h4>
                    <Badge>{reportData.accounts.length}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Open Accounts:</span>
                      <span>{reportData.accounts.filter(a => a.paymentStatus !== 'Closed').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Negative Items:</span>
                      <span className="text-red-600 font-medium">
                        {reportData.accounts.filter(a => 
                          a.paymentStatus.includes('Late') || 
                          a.paymentStatus.includes('Collection') || 
                          a.paymentStatus.includes('Charge-off')
                        ).length}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Inquiries</h4>
                    <Badge>{reportData.inquiries.length}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Recent Inquiries:</span>
                      <span>
                        {reportData.inquiries.filter(i => {
                          const inquiryDate = new Date(i.inquiryDate);
                          const oneYearAgo = new Date();
                          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                          return inquiryDate > oneYearAgo;
                        }).length}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Public Records</h4>
                    <Badge>{reportData.publicRecords.length}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Active Records:</span>
                      <span>
                        {reportData.publicRecords.filter(r => r.status !== 'Satisfied').length}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleAnalyze}
                  className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Credit Report
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                No Credit Report Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Please upload a credit report first before proceeding to analysis.
              </p>
              <Button 
                onClick={() => setActiveTab('upload')}
                className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
              >
                Upload Credit Report
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="p-6">
          {analysis ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Analysis Complete</h4>
                  <p className="text-sm text-gray-600">
                    We've analyzed your credit report and identified {analysis.accounts.disputeRecommendations.length + analysis.inquiries.disputeRecommendations.length + analysis.publicRecords.disputeRecommendations.length} potential dispute opportunities.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <BarChart className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Account Summary</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Accounts:</span>
                      <span className="font-medium">{analysis.accounts.total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Negative Accounts:</span>
                      <span className="font-medium text-red-600">{analysis.accounts.negative}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dispute Opportunities:</span>
                      <span className="font-medium text-brand-navy">{analysis.accounts.disputeRecommendations.length}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-gray-900">Dispute Strategy</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">High Priority Items:</span>
                      <span className="font-medium">
                        {analysis.accounts.disputeRecommendations.filter(r => r.priority === 'high').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Expected Timeline:</span>
                      <span className="font-medium">{analysis.overallStrategy.timeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Potential Score Increase:</span>
                      <span className="font-medium text-green-600">30-70 points</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Next Steps</h4>
                  </div>
                  <div className="space-y-2">
                    {analysis.overallStrategy.steps.slice(0, 3).map((step, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-brand-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-brand-navy">{index + 1}</span>
                        </div>
                        <span className="text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Dispute Recommendations</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-brand-navy border-brand-navy hover:bg-brand-navy/10">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm" className="text-brand-navy border-brand-navy hover:bg-brand-navy/10">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="accounts">
                  <TabsList>
                    <TabsTrigger value="accounts">
                      Accounts ({analysis.accounts.disputeRecommendations.length})
                    </TabsTrigger>
                    <TabsTrigger value="inquiries">
                      Inquiries ({analysis.inquiries.disputeRecommendations.length})
                    </TabsTrigger>
                    <TabsTrigger value="personal">
                      Personal Info ({analysis.personalInfo.discrepancies.length})
                    </TabsTrigger>
                    <TabsTrigger value="public">
                      Public Records ({analysis.publicRecords.disputeRecommendations.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="accounts" className="mt-4">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {analysis.accounts.disputeRecommendations.map((recommendation, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900">{recommendation.creditorName}</h4>
                                  {getPriorityBadge(recommendation.priority)}
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{recommendation.reason}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">Success Rate:</span>
                                    <span className={`font-medium ${getSuccessProbabilityColor(recommendation.successProbability)}`}>
                                      {recommendation.successProbability}%
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">Bureaus:</span>
                                    <span className="font-medium">{recommendation.bureaus.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                                <Zap className="h-4 w-4 mr-2" />
                                Create Dispute
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="inquiries" className="mt-4">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {analysis.inquiries.disputeRecommendations.map((recommendation, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900">{recommendation.creditorName}</h4>
                                  {getPriorityBadge(recommendation.priority)}
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{recommendation.reason}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">Success Rate:</span>
                                    <span className={`font-medium ${getSuccessProbabilityColor(recommendation.successProbability)}`}>
                                      {recommendation.successProbability}%
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">Bureaus:</span>
                                    <span className="font-medium">{recommendation.bureaus.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                                <Zap className="h-4 w-4 mr-2" />
                                Create Dispute
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="personal" className="mt-4">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {analysis.personalInfo.discrepancies.map((discrepancy, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900">{discrepancy.field}</h4>
                                  <Badge className="bg-blue-50 text-blue-600">Information</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{discrepancy.description}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">Bureaus:</span>
                                    <span className="font-medium">{discrepancy.bureaus.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                                <Zap className="h-4 w-4 mr-2" />
                                Create Dispute
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="public" className="mt-4">
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {analysis.publicRecords.disputeRecommendations.map((recommendation, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900">{recommendation.type}</h4>
                                  {getPriorityBadge(recommendation.priority)}
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{recommendation.reason}</p>
                                <div className="flex items-center space-x-4 text-sm">
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">Success Rate:</span>
                                    <span className={`font-medium ${getSuccessProbabilityColor(recommendation.successProbability)}`}>
                                      {recommendation.successProbability}%
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">Bureaus:</span>
                                    <span className="font-medium">{recommendation.bureaus.join(', ')}</span>
                                  </div>
                                </div>
                              </div>
                              <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
                                <Zap className="h-4 w-4 mr-2" />
                                Create Dispute
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                No Analysis Results
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Please complete the credit report analysis first to view recommendations.
              </p>
              <Button 
                onClick={() => setActiveTab('analyze')}
                className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
              >
                Start Analysis
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}