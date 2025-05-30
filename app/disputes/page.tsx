'use client';

import { DeleteDialog } from '@/app/disputes/components/delete-dispute-dialog';
import DisputeMenus from '@/app/disputes/components/dispute-menus';
import { DownloadLetter } from '@/app/disputes/components/download-letter';
import { PreviewLetterModal } from '@/app/disputes/components/preview-letter-dialog';
import { PrintLetter } from '@/app/disputes/components/print-letter';
import { SendDisputesMail } from '@/app/disputes/components/send-disputes-mail';
import { UndoStatusDialog } from '@/app/disputes/components/undo-status-dialog';
import { ConfirmModal } from '@/components/common/confirm-modal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useDisputeLetters from '@/hooks/useDisputeLetters';
import { db } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  Circle,
  CircleDot,
  EyeIcon,
  MailIcon,
  Send,
  Trash2Icon,
  Undo2
} from 'lucide-react';
import { Suspense, useMemo, useState } from 'react';
import { toast } from 'sonner';

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

export default function DisputesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("Unsent");
  const [selected, setSelected] = useState<boolean[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showSendDisputesMail, setShowSendDisputesMail] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState(false);
  const [creditorName] = useState<string>('');

  const openModal = () => {
    setShowModal(true);
  };

  const filters = useMemo(() => {
    if (selectedStatus === "Unsent") return { letterSent: false };
    if (selectedStatus === "Sent") return { letterSent: true };
    if (selectedStatus === "Completed") return { letterCompleted: true };
    return {};
  }, [selectedStatus]);


  const { letters, stats } = useDisputeLetters(filters);

  const handleStatusUpdate = () => {
    // if(selectedDispute !== null){
    //       if (status === "unsent") {
    //         setFilteredDisputes((prevDisputes) => {
    //           const updatedDisputes = prevDisputes.map((dispute, i) =>
    //             i === selectedDispute ? { ...dispute, status: "Unsent" } : dispute
    //           );
    //           setShowModal(!showModal)
    //           return updatedDisputes.filter((d) => d.status !== "Unsent" && d.id === selectedDispute);
    //         });
    //       }
    //       if(status == 'sent'){
    //       setFilteredDisputes((prevDisputes) => {
    //         const updatedDisputes = prevDisputes.map((dispute, i) =>
    //           i === selectedDispute ? { ...dispute, status: "Sent" } : dispute
    //         );
    //         setShowSendDisputeModal(!showSendDisputeModal)
    //         return updatedDisputes.filter((d) => d.status !== "Sent" && d.id === selectedDispute);
    //       });
    //     }
    // }
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

  const updateSelectedStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const handleMarkAsSent = async (id: string) => {
    try {
      const letterRef = doc(db, 'letters', id);

      await updateDoc(letterRef, {
        letterSent: true,
      });

      toast("Success", {
        description: "Letter marked as sent successfully.",
        duration: 3000
      });
    } catch (error) {
      toast("Failed", {
        description: "An error occurred while marking the letter as sent.",
        duration: 3000
      });
    }
  };

  const handleDeleteLetter = async (id: string) => {
    try {
      const letterRef = doc(db, 'letters', id);

      await deleteDoc(letterRef);

      toast("Success", {
        description: "Letter deleted successfully.",
        duration: 3000
      });
    } catch (error) {
      toast("Failed", {
        description: "An error occurred while deleting the letter.",
        duration: 3000
      });
    }
  };

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
                  onClick={() => updateSelectedStatus(item.status)}
                  className={
                    cn(
                      `border p-4 rounded-lg flex flex-col cursor-pointer "`,
                      item.borderColor,
                      {
                        "bg-gray-100 dark:bg-gray-800": selectedStatus === item.status
                      }
                    )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span className="font-semibold">{item.title}</span>
                    </div>
                    <span className="text-xl font-bold">
                      {
                        item.status === "Unsent" ? stats.unsent :
                          item.status === "Sent" ? stats.sent :
                            item.status === "Completed" ? stats.completed : 0
                      }
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1 ml-7">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>

          <ScrollArea className='h-[600px]'>
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
                  <TableHead className="py-2 px-4">Date Created</TableHead>
                  <TableHead className="py-2 px-4">Dispute Round</TableHead>
                  <TableHead className="py-2 px-4">Disputed Items</TableHead>
                  <TableHead className="py-2 px-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {letters.map((letter, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="py-2 px-4">
                      <Checkbox
                        className="w-5 h-5 cursor-pointer"
                        checked={selected[index]}
                        onCheckedChange={() => handleSelectRow(index)}
                      />
                    </TableCell>
                    <TableCell className="py-2 px-4 text-gray-500 text-sm">{letter.letterName}</TableCell>
                    <TableCell className="py-2 px-4">
                      <span className="text-blue-400">{letter.creditBureauName}</span>
                      <br />
                      <span className="text-gray-400 text-sm">{letter.shortDescription}</span>
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <div className="flex flex-col items-start">
                        <span className="text-gray-500 font-semibold">
                          {format(new Date(letter.createdAt), 'MMM dd, yyyy')}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {format(new Date(letter.createdAt), 'hh:mm:ss aaa')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-4">
                      <span className="border border-green-500 text-green-500 px-2 py-1 rounded">
                        Dispute Round #{letter.letterRound}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 px-4 text-black">{letter.accounts?.length ?? 0}</TableCell>
                    <TableCell className="py-2 px-4 space-x-2">
                      {letter.letterSent ? (
                        <>
                          <button
                            className="text-green-400"
                            title="Mark Un sent"
                            onClick={() => openModal()}
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
                        </>
                      ) : (
                        <>
                          <ConfirmModal
                            title='Are you sure?'
                            description='Please ensure each letter is marked as sent only after it has been mailed.'
                            onConfirm={() => handleMarkAsSent(letter.id)}
                          >
                            <button className="text-green-400" title="Send">
                              <Send size={18} />
                            </button>
                          </ConfirmModal>
                          {
                            letter && (<>
                              <PreviewLetterModal letter={letter} >
                                <button className="text-green-400" title="View" >
                                  <EyeIcon size={18} />
                                </button>
                              </PreviewLetterModal>
                              <button className="text-green-400" title="Mail"
                              >
                                <MailIcon size={18}
                                  onClick={() => setShowSendDisputesMail(!showSendDisputesMail)} />
                              </button>
                              <Suspense fallback={<div>Loading...</div>}>
                                <DownloadLetter letter={letter} />
                              </Suspense>
                              <PrintLetter letter={letter} />
                            </>)
                          }
                        </>
                      )}
                      <ConfirmModal
                        title='Are you sure?'
                        description={`Do You want To Delete <b>${letter.creditBureauName}</b>`}
                        onConfirm={() => handleDeleteLetter(letter.id)}
                      >
                        <button className="text-red-400" title="Delete">
                          <Trash2Icon size={18} />
                        </button>
                      </ConfirmModal>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
        {
          showModal &&
          <UndoStatusDialog
            open={showModal}
            onOpenChange={setShowModal}
            onConfirm={() => handleStatusUpdate()}
          />
        }

      </div>

      {showSendDisputesMail && <SendDisputesMail
        isOpen={showSendDisputesMail}
        handleClose={() => setShowSendDisputesMail(!showSendDisputesMail)}
      />}
      {showDeleteDialog && <DeleteDialog
        isOpen={showDeleteDialog}
        creditorName={creditorName}
        handleClose={() => setShowDeleteDialog(!showDeleteDialog)}
      />}
    </div>
  );
}
