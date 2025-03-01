'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Eye,
  Download,
  Trash2,
  Mail,
  Printer,
  RefreshCw,
  Edit,
  Truck,
  Bell,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface DisputeLetter {
  id: string;
  creditor: string;
  accountNumber: string;
  type: string;
  bureau: string;
  status: 'draft' | 'ready' | 'in-review' | 'sent' | 'completed';
  outcome?: 'success' | 'partial' | 'failure';
  mailingOptions: {
    method: 'first-class' | 'certified';
    color: 'bw' | 'color';
    tracking?: string;
  };
  createdAt: string;
  updatedAt: string;
  content: string;
  aiRecommendations?: {
    strength: 'strong' | 'medium' | 'weak';
    suggestions: string[];
  };
}

export default function DisputesPage() {
  const [user] = useAuthState(auth);
  const { toast } = useToast();
  const [selectedLetter, setSelectedLetter] = useState<DisputeLetter | null>(null);
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // Sample data
  const letters: DisputeLetter[] = [
    {
      id: '1',
      creditor: 'Capital One',
      accountNumber: 'XXXX-1234',
      type: 'Late Payment',
      bureau: 'Experian',
      status: 'draft',
      mailingOptions: {
        method: 'first-class',
        color: 'bw'
      },
      createdAt: '2024-02-20T10:00:00Z',
      updatedAt: '2024-02-20T10:00:00Z',
      content: 'Sample dispute letter content...',
      aiRecommendations: {
        strength: 'strong',
        suggestions: [
          'Include payment history documentation',
          'Reference FCRA section 611',
          'Request method of verification'
        ]
      }
    },
    {
      id: '2',
      creditor: 'Chase',
      accountNumber: 'XXXX-5678',
      type: 'Account Not Mine',
      bureau: 'TransUnion',
      status: 'sent',
      mailingOptions: {
        method: 'certified',
        color: 'bw',
        tracking: '9400123456789'
      },
      createdAt: '2024-02-18T15:30:00Z',
      updatedAt: '2024-02-19T09:00:00Z',
      content: 'Sample dispute letter content...'
    }
  ];

  const getStatusBadge = (status: DisputeLetter['status'], outcome?: DisputeLetter['outcome']) => {
    switch (status) {
      case 'draft':
        return (
          <Badge variant="outline">
            <FileText className="h-4 w-4 mr-1" />
            Draft
          </Badge>
        );
      case 'ready':
        return (
          <Badge className="bg-blue-50 text-blue-600">
            <Mail className="h-4 w-4 mr-1" />
            Ready to Send
          </Badge>
        );
      case 'sent':
        return (
          <Badge className="bg-yellow-50 text-yellow-600">
            <Truck className="h-4 w-4 mr-1" />
            In Transit
          </Badge>
        );
      case 'in-review':
        return (
          <Badge className="bg-purple-50 text-purple-600">
            <Clock className="h-4 w-4 mr-1" />
            In Review
          </Badge>
        );
      case 'completed':
        if (outcome === 'success') {
          return (
            <Badge className="bg-green-50 text-green-600">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Success
            </Badge>
          );
        } else if (outcome === 'partial') {
          return (
            <Badge className="bg-yellow-50 text-yellow-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Partial Success
            </Badge>
          );
        } else {
          return (
            <Badge className="bg-red-50 text-red-600">
              <XCircle className="h-4 w-4 mr-1" />
              Failed
            </Badge>
          );
        }
      default:
        return null;
    }
  };

  const handleCreateDispute = () => {
    // To be implemented in next step
    toast({
      title: 'Coming Soon',
      description: 'This feature will be implemented in the next step.',
    });
  };

  const handlePreviewLetter = (letter: DisputeLetter) => {
    setSelectedLetter(letter);
    setPreviewMode('preview');
  };

  const handleEditLetter = (letter: DisputeLetter) => {
    setSelectedLetter(letter);
    setPreviewMode('edit');
  };

  const filteredLetters = letters.filter(letter => {
    const matchesSearch = 
      letter.creditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || letter.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Dispute Center</h1>
          <p className="text-gray-600">Create and manage your credit dispute letters</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-brand-navy text-brand-navy hover:bg-brand-navy/10"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                toast({
                  title: 'Refreshed',
                  description: 'Dispute list has been updated.',
                });
              }, 1000);
            }}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
            onClick={handleCreateDispute}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            New AI Dispute
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by creditor or account number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="ready">Ready to Send</SelectItem>
              <SelectItem value="sent">In Transit</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="text-brand-navy border-brand-navy hover:bg-brand-navy/10">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Letters List */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CREDITOR</TableHead>
                <TableHead>ACCOUNT</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>BUREAU</TableHead>
                <TableHead>MAILING OPTIONS</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>CREATED</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLetters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center">
                      <FileText className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No dispute letters found</h3>
                      <p className="text-gray-600 mb-4">
                        {searchTerm || filterStatus !== 'all'
                          ? 'Try adjusting your search filters'
                          : 'Create your first dispute letter to get started'}
                      </p>
                      <Button
                        className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
                        onClick={handleCreateDispute}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Dispute
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredLetters.map((letter) => (
                  <TableRow key={letter.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{letter.creditor}</TableCell>
                    <TableCell>{letter.accountNumber}</TableCell>
                    <TableCell>{letter.type}</TableCell>
                    <TableCell>{letter.bureau}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {letter.mailingOptions.method === 'certified' ? 'Certified' : 'First Class'}
                        </Badge>
                        <Badge variant="outline">
                          {letter.mailingOptions.color === 'color' ? 'Color' : 'B&W'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(letter.status, letter.outcome)}</TableCell>
                    <TableCell>{new Date(letter.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handlePreviewLetter(letter)}
                          className="text-gray-500 hover:text-brand-navy"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {letter.status === 'draft' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditLetter(letter)}
                            className="text-gray-500 hover:text-brand-navy"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                        {letter.mailingOptions.tracking && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              toast({
                                title: 'Tracking Info',
                                description: `Tracking number: ${letter.mailingOptions.tracking}`,
                              });
                            }}
                            className="text-gray-500 hover:text-brand-navy"
                          >
                            <Truck className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}