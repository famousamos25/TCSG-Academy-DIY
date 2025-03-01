'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Search,
  Phone,
  Mail,
  MapPin,
  Globe,
  Plus,
  FileText,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface Creditor {
  id: string;
  name: string;
  address: string;
  address_line: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string | null;
  fax: string | null;
}

// Sample creditor data
const SAMPLE_CREDITORS = [
  {
    name: '1STPROGRESS/TSYS/VT',
    address: 'PO BOX 9053 JOHNSON CITY, TN 37615',
    address_line: 'PO BOX 9053',
    city: 'JOHNSON CITY',
    state: 'TN',
    zipcode: '37615',
    phone: null,
  },
  // ... add other creditors from the list
];

export default function CreditorInformationPage() {
  const [user] = useAuthState(auth);
  const [creditors, setCreditors] = useState<Creditor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchCreditors();
    }
  }, [user]);

  const fetchCreditors = async () => {
    try {
      const creditorsRef = collection(db, 'creditors');
      const q = query(creditorsRef, orderBy('name'));
      const querySnapshot = await getDocs(q);
      
      const creditorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Creditor[];

      setCreditors(creditorsData);

      // If no creditors exist, add sample data
      if (creditorsData.length === 0) {
        await addSampleData();
      }
    } catch (error) {
      console.error('Error fetching creditors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load creditor information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addSampleData = async () => {
    try {
      const creditorsRef = collection(db, 'creditors');
      
      for (const creditor of SAMPLE_CREDITORS) {
        await addDoc(creditorsRef, {
          ...creditor,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      toast({
        title: 'Sample Data Added',
        description: 'Sample creditor information has been loaded.',
      });

      // Refresh the list
      fetchCreditors();
    } catch (error) {
      console.error('Error adding sample data:', error);
      toast({
        title: 'Error',
        description: 'Failed to add sample creditor data',
        variant: 'destructive',
      });
    }
  };

  const filteredCreditors = creditors.filter(creditor => 
    creditor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creditor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creditor.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">Creditor Information</h1>
          <p className="text-gray-600">Access and manage creditor contact details</p>
        </div>
        <Button className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Creditor
        </Button>
      </div>

      <Card className="mb-8 p-4">
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search creditors by name, city, or state..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="border-brand-navy text-brand-navy hover:bg-brand-navy/10"
            onClick={fetchCreditors}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CREDITOR NAME</TableHead>
                <TableHead>ADDRESS</TableHead>
                <TableHead>ADDRESS LINE</TableHead>
                <TableHead>CITY</TableHead>
                <TableHead>STATE</TableHead>
                <TableHead>ZIPCODE</TableHead>
                <TableHead>PHONE</TableHead>
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
              ) : filteredCreditors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center">
                      <Building className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Creditors Found</h3>
                      <p className="text-gray-600">
                        {searchTerm ? 'Try adjusting your search terms' : 'Add your first creditor to get started'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCreditors.map((creditor) => (
                  <TableRow key={creditor.id}>
                    <TableCell className="font-medium">{creditor.name}</TableCell>
                    <TableCell>{creditor.address}</TableCell>
                    <TableCell>{creditor.address_line}</TableCell>
                    <TableCell>{creditor.city}</TableCell>
                    <TableCell>{creditor.state}</TableCell>
                    <TableCell>{creditor.zipcode}</TableCell>
                    <TableCell>{creditor.phone || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-brand-navy">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-brand-navy">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-600">
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