'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import {
  Circle,
  CircleDot,
  EyeIcon,
  LucideDownload,
  MailIcon,
  PrinterIcon,
  Send,
  Trash2Icon
} from 'lucide-react';
import { useState } from 'react';
import DisputeMenus from './components/dispute-menus';

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

export default function DisputesPage() {
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


  return (
    <div className="container mx-auto p-6">

      {/* Letters List */}
      <DisputeMenus />
      

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
                      <span className="text-gray-500 font-semibold">{format(new Date(dispute.dateSent), 'MMM dd, yyyy')}</span>
                      <span className="text-gray-500 text-sm">{format(new Date(dispute.dateSent), 'hh:mm:ss aaa')}</span>
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