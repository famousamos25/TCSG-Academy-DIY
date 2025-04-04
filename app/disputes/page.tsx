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
  Trash2Icon,
  Undo2
} from 'lucide-react';
import { useState } from 'react';
import DisputeMenus from './components/dispute-menus';
import { PreviewLetterModal } from './components/preview-letter-dialog';
import { UndoStatusDialog } from './components/undo-status-dialog';

const disputesTracker = [
  {
    title: "Unsent Disputes",
    description: "Letters drafted/prepared but not yet sent.",
    status: "Unsent",
    color: "text-orange-500",
    icon: <CircleDot className="text-orange-500" size={20} />,
    borderColor: "border-orange-500",
  },
  {
    title: "Sent Disputes",
    description: "Letters Successfully mailed out.",
    status: "Sent",
    color: "text-blue-500",
    icon: <Circle className="text-blue-500" size={20} />,
    borderColor: "border-blue-500",
  },
  {
    title: "Completed Disputes",
    description: "Letters that received a reply or marked as completed.",
    status: "Completed",
    color: "text-green-500",
    icon: <Circle className="text-green-500" size={20} />,
    borderColor: "border-green-500",
  },
];

const tableDisputes = [
  {
    letter: "Security Freeze Attack",
    creditor: { name: "SAFERENT SOLUTIONS, LLC", role: "Data Furnisher" },
    dateSent: "2024-02-20 10:00:00",
    disputeRound: "Dispute Round #1",
    disputedItems: 1,
    status: "Sent",
  },
  {
    letter: "Security Freeze Attack",
    creditor: { name: "CHEX SYSTEMS, INC.", role: "Data Furnisher" },
    dateSent: "2024-03-15 14:30:00",
    disputeRound: "Dispute Round #1",
    disputedItems: 2,
    status: "Unsent",
  },
  {
    letter: "Credit Report Dispute",
    creditor: { name: "EQUIFAX INFORMATION SERVICES", role: "Data Furnisher" },
    dateSent: "2024-04-10 08:45:00",
    disputeRound: "Dispute Round #2",
    disputedItems: 3,
    status: "Unsent",
  },
  {
    letter: "Fraud Alert Request",
    creditor: { name: "EXPERIAN", role: "Data Furnisher" },
    dateSent: "2024-05-05 16:20:00",
    disputeRound: "Dispute Round #3",
    disputedItems: 1,
    status: "Sent",
  },
  {
    letter: "Identity Theft Dispute",
    creditor: { name: "TRANSUNION", role: "Data Furnisher" },
    dateSent: "2024-06-12 11:10:00",
    disputeRound: "Dispute Round #1",
    disputedItems: 2,
    status: "Completed",
  },
];

export default function DisputesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("Unsent");
  const [selected, setSelected] = useState<boolean[]>(new Array(tableDisputes.length).fill(false));
  const [allSelected, setAllSelected] = useState(false);
  const [disputes, setDisputes] = useState(tableDisputes);
  const [showModal, setShowModal] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false)

  const openModal = (index: number) => {
    setSelectedDispute(index);
    setShowModal(true);
  };

  const confirmUnsend = () => {
    if (selectedDispute !== null) {
      setDisputes((prevDisputes) =>
        prevDisputes.map((dispute, i) =>
          i === selectedDispute ? { ...dispute, status: "Unsent" } : dispute
        )
      );
    }
    setShowModal(false);
    setSelectedDispute(null);
  };

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

  const filteredDisputes = selectedStatus
  ? disputes.filter(dispute => dispute.status === selectedStatus)
  : disputes;


  return (
    <div className="container mx-auto p-6">
      {/* Letters List */}
      <DisputeMenus />

      <div className="w-full mt-6 mx-auto">
        <Card className="bg-card text-card-foreground shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-green-600 text-center">Dispute Tracker</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {disputesTracker.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedStatus(item.status)}
                  className={`border ${item.borderColor} p-4 rounded-lg flex flex-col cursor-pointer ${
                    selectedStatus === item.status ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <span className="text-xl font-bold">
                      {tableDisputes.filter(d => d.status === item.status).length}
                    </span>
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
                    className="w-5 h-5 cursor-pointer"
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
              {filteredDisputes.map((dispute, index) => (
                <TableRow key={index} className="border-b">
                  <TableCell className="py-2 px-4">
                    <Checkbox
                      className="w-5 h-5 cursor-pointer"
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
                      <span className="text-gray-500 font-semibold">
                        {format(new Date(dispute.dateSent), 'MMM dd, yyyy')}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {format(new Date(dispute.dateSent), 'hh:mm:ss aaa')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 px-4">
                    <span className="border border-green-500 text-green-500 px-2 py-1 rounded">
                      {dispute.disputeRound}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 px-4">{dispute.disputedItems}</TableCell>
                  <TableCell className="py-2 px-4 flex space-x-2">
                    {dispute.status === "Sent" ? (
                      <>
                        <button
                          className="text-green-400"
                          title="Mark Un sent"
                          onClick={() => openModal(index)}
                        >
                          <Undo2 size={18} />
                        </button>
                        <button 
                          className="text-green-400" 
                          title="Preview Letter"
                          onClick={() => setShowPreview(true)}
                          >
                          <EyeIcon size={18} />
                        </button>
                        <button className="text-red-400" title="Delete Dispute">
                          <Trash2Icon size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="text-green-400" title="Send">
                          <Send size={18} />
                        </button>
                        <button className="text-green-400" title="View">
                          <EyeIcon size={18} />
                        </button>
                        <button className="text-green-400" title="Mail">
                          <MailIcon size={18} />
                        </button>
                        <button className="text-green-400" title="Download">
                          <LucideDownload size={18} />
                        </button>
                        <button className="text-green-400" title="Print">
                          <PrinterIcon size={18} />
                        </button>
                        <button className="text-red-400" title="Delete">
                          <Trash2Icon size={18} />
                        </button>
                      </>
                    )}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <UndoStatusDialog 
          open={showModal} 
          onOpenChange={setShowModal} 
          onConfirm={confirmUnsend} 
      />
            <PreviewLetterModal open={showPreview} onClose={setShowPreview} />
      </div>
    </div>
  );
}
