'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  FileEdit,
  icons,
  MailOpen,
  Files,
  Film,
  FilmIcon,
  CircleDot,
  Circle,
  Send,
  EyeIcon,
  MailIcon,
  PrinterIcon,
  Trash2Icon,
  DownloadCloud,
  LucideDownload,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Checkbox } from '@/components/ui/checkbox';

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

  // sample disputes
  const disputes = [
    { icon: <FileEdit size={24} />, title: 'Security Freeze Dispute' },
    { icon: <Files size={24} />, title: 'Consumer Law Disputes' },
    { icon: <Files size={24} />, title: 'Metro-2 Disputes' },
    { icon: <Files size={24} />, title: 'Other Disputes' },
    { icon: <MailOpen size={24} />, title: 'Disputed Letters' },
  ];

  const disputesTracker = [
    {
      title: "Unsent Disputes",
      description: "Letters drafted/prepared but not yet sent.",
      count: 0,
      color: "text-orange-500",
      icon: <CircleDot className="text-orange-500" size={20} />,
      borderColor: "border-orange-500",
    },
    {
      title: "Sent Disputes",
      description: "Letters Successfully mailed out.",
      count: 2,
      color: "text-blue-500",
      icon: <Circle className="text-blue-500" size={20} />,
      borderColor: "border-blue-500",
    },
    {
      title: "Completed Disputes",
      description: "Letter that received a reply or marked as completed.",
      count: 0,
      color: "text-green-500",
      icon: <Circle className="text-green-500" size={20} />,
      borderColor: "border-green-500",
    },
  ];

  const tableDisputes = [
    {
      letter: 'Security Freeze Attack',
      creditor: { name: 'SAFERENT SOLUTIONS, LLC', role: 'Data Furnisher' },
      dateSent: '2024-02-20 10:00:00',
      disputeRound: 'Dispute Round #1',
      disputedItems: 1,
    },
    {
      letter: 'Security Freeze Attack',
      creditor: { name: 'CHEX SYSTEMS, INC.', role: 'Data Furnisher' },
      dateSent: '2024-03-15 14:30:00',
      disputeRound: 'Dispute Round #1',
      disputedItems: 2,
    },
    {
      letter: 'Credit Report Dispute',
      creditor: { name: 'EQUIFAX INFORMATION SERVICES', role: 'Data Furnisher' },
      dateSent: '2024-04-10 08:45:00',
      disputeRound: 'Dispute Round #2',
      disputedItems: 3,
    },
    {
      letter: 'Fraud Alert Request',
      creditor: { name: 'EXPERIAN', role: 'Data Furnisher' },
      dateSent: '2024-05-05 16:20:00',
      disputeRound: 'Dispute Round #3',
      disputedItems: 1,
    },
    {
      letter: 'Identity Theft Dispute',
      creditor: { name: 'TRANSUNION', role: 'Data Furnisher' },
      dateSent: '2024-06-12 11:10:00',
      disputeRound: 'Dispute Round #1',
      disputedItems: 2,
    },
  ];

  const formatDate = (dateString: string, type: string) => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    if (type === 'date') {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date);
    }

    if (type === 'time') {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'UTC',
      }).format(date).toLowerCase() + ' utc';
    }

    return dateString;
  };


  const [selected, setSelected] = useState<boolean[]>(new Array(tableDisputes.length).fill(false));
  const [allSelected, setAllSelected] = useState(false);

  const handleSelectAll = () => {
    const newState = !allSelected;
    setAllSelected(newState);
    setSelected(selected.map(() => newState));
  };

  const handleSelectRow = (index: number) => {
    const updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);

    if (!updatedSelected.every(Boolean)) {
      setAllSelected(false);
    } else {
      setAllSelected(true);
    }
  };



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
      <Card className="bg-white p-6 text-center">
        <h2 className="text-green-600 text-xl font-semibold mb-4">Create a Dispute</h2>
        <div className="flex justify-center space-x-3">
          <button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Start Tour</button>
          <button className="border border-green-500 text-green-600 px-3 py-1 rounded-md text-sm flex items-center gap-1">
            <FilmIcon size={16} />
            Tutorial
          </button>        </div>
        <div className="grid grid-cols-5 gap-4 mt-6">
          {disputes.map((item, index) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-300 p-5 rounded-lg text-center flex flex-col items-center space-y-2
              hover:border-green-400 hover:border-solid hover:bg-opacity-10 cursor-pointer transition-all group"
            >
              <div className="bg-gray-100 p-1 rounded-lg flex items-center justify-center
              group-hover:bg-green-100 group-hover:text-green-500 transition-all">
                {item.icon}
              </div>
              <span className="text-gray-600 text-sm">{item.title}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="w-full mt-6 mx-auto">
        <Card className="bg-card text-card-foreground shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-green-600 text-center">
              Dispute Tracker
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {disputesTracker.map((item, index) => (
                <div
                  key={index}
                  className={`border ${item.borderColor} p-4 rounded-lg flex flex-col`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <span className="text-xl font-bold">{item.count}</span>
                  </div>

                  <p className="text-sm text-gray-400 mt-1 ml-7">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <Table className="w-full border-t text-white">
            <TableHeader>
              <TableRow className="text-gray-400">
                <TableHead className="py-2 px-4">
                  <Checkbox
                    className='w-5 h-5 cursor-pointer'
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="py-2 px-4">Dispute Letter</TableHead>
                <TableHead className="py-2 px-4">Creditor Name</TableHead>
                <TableHead className="py-2 px-4">Date Sent</TableHead>
                <TableHead className="py-2 px-4">Dispute Round</TableHead>
                <TableHead className="py-2 px-4">Disputed Items</TableHead>
                <TableHead className="py-2 px-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableDisputes.map((dispute, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="py-2 px-4">
                    <Checkbox
                      className='w-5 h-5 cursor-pointer'
                      checked={selected[index]}
                      onCheckedChange={() => handleSelectRow(index)}
                    />
                  </TableCell>
                  <TableCell className="py-2 px-4 text-gray-500 text-sm">{dispute.letter}</TableCell>
                  <TableCell className="py-2 px-4">
                    <span className="text-blue-400">{dispute.creditor.name}</span>
                    <br />
                    <span className="text-gray-400 text-sm">{dispute.creditor.role}</span>
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    <div className="flex flex-col items-start">
                      <span className="text-gray-500 font-semibold">{formatDate(dispute.dateSent, 'date')}</span>
                      <span className="text-gray-500 text-sm">{formatDate(dispute.dateSent, 'time')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    <span className="border border-green-500 text-green-500 px-2 py-1 rounded">
                      {dispute.disputeRound}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 px-4">{dispute.disputedItems}</TableCell>
                  <TableCell className="py-2 px-4 flex space-x-2">
                    <button className="text-green-400" title="Send">
                      <Send size={18} />
                    </button>
                    <button className="text-green-400" title="View">
                      <EyeIcon size={18} />
                    </button>
                    <button className="text-green-400" title="Mail">
                      <MailIcon size={18} />
                    </button>
                    <button className="text-green-400" title="Delete">
                      <LucideDownload size={18} />
                    </button>
                    <button className="text-green-400" title="Print">
                      <PrinterIcon size={18} />
                    </button>
                    <button className="text-red-400" title="Delete">
                      <Trash2Icon size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

    </div>
  );
}