'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Building,
  Mail,
  Clock,
  AlertCircle,
  Upload,
  Download,
  Printer,
  Eye,
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { MailDetailsDialog } from '@/components/mail-details-dialog';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface MailItem {
  id: string;
  cost: number;
  dateCreated: string;
  fileName: string;
  recipient: string;
  mailType: string;
  envelopeSize: string;
  pages: number;
  recipientAddress: string;
  recipientCityState: string;
  senderName: string;
  senderAddress: string;
  senderCityState: string;
  letterName: string;
  color: string;
  status: string;
}

const SAMPLE_MAIL_DATA: MailItem[] = [
  {
    id: '1',
    cost: 2.80,
    dateCreated: 'Thu, Feb 20, 2025 2:09 AM',
    fileName: 'Inquiry Removal Letter #1',
    recipient: 'TransUnion',
    mailType: 'FIRSTCLASS',
    envelopeSize: 'Small',
    pages: 3,
    recipientAddress: 'P.O Box 2000',
    recipientCityState: 'Chester, PA 19016-2000',
    senderName: 'Amos Brazan',
    senderAddress: '1130 Victoria Cove',
    senderCityState: 'Collierville, TN 38017',
    letterName: 'Inquiry Removal Letter #1',
    color: 'Black and White',
    status: 'In Production'
  },
];

export default function MailCenterPage() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [mailItems, setMailItems] = useState<MailItem[]>(SAMPLE_MAIL_DATA);
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMailItems = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const mailRef = collection(db, 'users', user.uid, 'mail');
      const q = query(mailRef, orderBy('dateCreated', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MailItem[];

      setMailItems(items.length > 0 ? items : SAMPLE_MAIL_DATA);
    } catch (error) {
      console.error('Error fetching mail items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (mail: MailItem) => {
    setSelectedMail(mail);
    setDetailsOpen(true);
  };

  const filteredMail = mailItems.filter(mail => 
    mail.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Mail Center</h1>
          <p className="text-gray-600">Track and manage your dispute correspondence</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-brand-navy text-brand-navy hover:bg-brand-navy/10"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Mail
          </Button>
          <Button
            className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 shadow-lg hover:shadow-xl transition-all"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Labels
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-brand-navy/5 rounded-xl flex items-center justify-center">
              <Mail className="h-6 w-6 text-brand-navy" />
            </div>
            <Badge variant="outline" className="text-brand-navy">Active</Badge>
          </div>
          <div className="text-3xl font-bold text-brand-navy mb-2">{mailItems.length}</div>
          <div className="text-sm text-gray-600 flex items-center">
            <Clock className="h-4 w-4 mr-1.5" />
            Letters ready to send
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <Badge variant="outline" className="text-green-600">Pending</Badge>
          </div>
          <div className="text-3xl font-bold text-brand-navy mb-2">0</div>
          <div className="text-sm text-gray-600 flex items-center">
            <Clock className="h-4 w-4 mr-1.5" />
            Bureau responses received
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <Badge variant="outline" className="text-blue-600">In Transit</Badge>
          </div>
          <div className="text-3xl font-bold text-brand-navy mb-2">0</div>
          <div className="text-sm text-gray-600 flex items-center">
            <Clock className="h-4 w-4 mr-1.5" />
            Letters in transit
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <div className="p-4 flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by file name or recipient..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="text-brand-navy border-brand-navy hover:bg-brand-navy/10">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="text-brand-navy border-brand-navy hover:bg-brand-navy/10">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead>COST</TableHead>
                <TableHead>DATE CREATED</TableHead>
                <TableHead>FILE NAME</TableHead>
                <TableHead>RECIPIENT</TableHead>
                <TableHead>MAIL TYPE</TableHead>
                <TableHead>ENVELOPE SIZE</TableHead>
                <TableHead>PAGES</TableHead>
                <TableHead className="text-right">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin text-brand-yellow mx-auto" />
                  </TableCell>
                </TableRow>
              ) : filteredMail.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Mail Found</h3>
                      <p className="text-gray-600 mb-6">
                        {searchTerm ? 'Try adjusting your search terms' : 'Start sending dispute letters to track your correspondence'}
                      </p>
                      <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 shadow-lg">
                        Create New Letter
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredMail.map((mail) => (
                  <TableRow key={mail.id} className="hover:bg-gray-50/50">
                    <TableCell>${mail.cost.toFixed(2)}</TableCell>
                    <TableCell>{mail.dateCreated}</TableCell>
                    <TableCell className="font-medium">{mail.fileName}</TableCell>
                    <TableCell>{mail.recipient}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-brand-navy/5">
                        {mail.mailType}
                      </Badge>
                    </TableCell>
                    <TableCell>{mail.envelopeSize}</TableCell>
                    <TableCell>{mail.pages}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(mail)}
                        className="text-gray-500 hover:text-brand-navy hover:bg-brand-navy/5"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <MailDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        mailDetails={selectedMail}
      />
    </div>
  );
}