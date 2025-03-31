import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface PreviewLetterModalProps {
  open: boolean;
  onClose: (value: boolean) => void;
}

export function PreviewLetterModal({ open, onClose }: PreviewLetterModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-[#f5f8ff] text-white">
       <div className="flex items-end justify-end">
       <X className="text-gray-600 w-6 h-6 cursor-pointer" onClick={() => onClose(false)}/>
       </div>
        <DialogHeader className="text-left">
          <DialogTitle className="text-lg font-semibold text-green-400">Preview Letter</DialogTitle>
        </DialogHeader>

        <div className="text-sm leading-6 text-black space-y-4 p-4">
          <p><strong>Amos Brzan</strong><br/>1130 Victoria Cove<br/>Collierville, TN 38017<br/>425-53-8128</p>

          <p>SafeRent Solutions, LLC. Consumer Relations Department<br/>P.O. Box 3890<br/>Coppell, TX 75019</p>

          <p>Date: March 27, 2025</p>

          <p className="text-lg font-semibold text-yellow-400">
            PER THE FAIR CREDIT REPORTING ACT Section 605A-[15 U.S.C. 1681c-1]:
          </p>

          <p>
            I am sending you this letter to initiate my request for your company to place a security freeze and suppress from sharing <strong>ANY</strong> information about me: <strong>Amos Brzan</strong>.
          </p>

          <p>I do not consent nor authorize the sharing of my information to the public, specifically with data aggregators who are looking to collect information on my behalf.</p>

          <p>I would like to have my entire credit file <strong>REMOVED</strong> from your data institution. Please complete my following requests:</p>

          <ul className="list-decimal pl-6 space-y-2">
            <li><strong>Full Consumer File Disclosure</strong>: A complete overview of my credit profile.</li>
            <li><strong>Security Freeze</strong>: Suppress sharing my information with other parties.</li>
            <li>Provide written confirmation within 5 days.</li>
          </ul>

          <p className="text-lg font-semibold">My Personal Information:</p>
          <p><strong>FULL NAME:</strong> Amos Brzan</p>
          <p><strong>SOCIAL SECURITY NUMBER:</strong> 425-53-8128</p>
          <p><strong>FULL CURRENT ADDRESS:</strong> 1130 Victoria Cove, Collierville, TN 38017</p>

          <p className="text-black text-sm">
            Note: Attached you will find my driver’s license. Do not retain it. Purge after confirming my identity.
          </p>
          {/* <div className="border border-gray-600 p-2 rounded-lg">
            <img src="" alt="SSN Card" className="w-full h-auto rounded-lg" />
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
