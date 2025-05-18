'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import PersonalInformationDisputeDialog from '../personal-information-dispute';
import PublicRecordsNotice from '../public-response-notice';
import ConsumerLawDerogatories from './consumer-law-derogatories';
import ConsumerLawOptions from './consumer-law-options';
import ConsumerLawStats from './consumer-law-stats';

interface ConsumerLawDisputesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsumerLawDisputesDialog({ open, onOpenChange }: ConsumerLawDisputesDialogProps) {
  const [activeOption, setActiveOption] = useState<string>("Derogatory");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-full max-w-[95vw] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Create New Dispute(s)</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          <h2 className="text-lg font-medium text-center mb-6">What do you want to dispute?</h2>

          <div className="space-y-6">
            <ConsumerLawOptions selectedOption={activeOption} selectOption={(option) => setActiveOption(option)} />

            <ConsumerLawStats />

            {activeOption === "Personal Information" && (
              <PersonalInformationDisputeDialog open={activeOption === "Personal Information"}
                onOpenChange={(open) => {
                  if (!open) setActiveOption("Derogatory");
                }}
              />
            )}

            {activeOption === "Derogatory" && <ConsumerLawDerogatories onCloseDialog={() => onOpenChange(false)} />}
            
            {/* {
                activeOption === "Inquiries" && (
                    <InquirySection
                        selectedFilter={selectedFilter}
                        setSelectedFilter={setSelectedFilter}
                        inquiriesData={inquiriesData}
                        selectedInquiries={selectedInquiries}
                        setSelectedInquiries={setSelectedInquiries}
                        filteredInquiries={filteredInquiries}
                        toggleInquirySelection={toggleInquirySelection}
                        setSelectedDisputeType={setSelectedDisputeType}
                    />
                )
            }

            {(selectedDisputeType && ["Late Payments"].includes(selectedDisputeType) && !hideDisputeActions) && (
                <>
                    <DisputeActions
                        disputeRound={disputeRound}
                        setDisputeRound={setDisputeRound}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        reasons={AVAILABLE_REASONS}
                        instructions={AVAILABLE_INSTRUCTIONS}
                        bureauSelections={bureauSelections}
                        allSelected={allSelected}
                        toggleSelectAll={toggleSelectAll}
                        selectedAccounts={selectedAccounts}
                        selectedReason={selectedReason}
                        setSelectedReason={setSelectedReason}
                        selectedInstruction={selectedInstruction}
                        setSelectedInstruction={setSelectedInstruction}
                    />
                    <DisputeTable
                        filteredAccounts={filteredAccounts(LATE_PAYMENTS)}
                        selectedAccounts={selectedAccounts}
                        handleSelectAll={handleSelectAll}
                        handleSelectAccount={handleSelectAccount}
                        renderBureauCheckboxes={renderBureauCheckboxes as any}
                        customSelections={customSelections}
                    />
                </>
            )} */}

            {activeOption === "Public Records" && <PublicRecordsNotice />}

            {/* {selectedDisputeType === "All Accounts" && (
                <>
                    <div className="flex justify-between items-center mt-8 space-x-4">
                        <Button
                            variant="outline"
                            className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
                        >
                            Dispute All
                        </Button>

                        {selectedAccounts.length > 0 && (
                            <div className="flex space-x-4">
                                <SelectDisputeReason selectedReason={selectedReason} setSelectedReason={setSelectedReason} />
                                <SelectDisputeInstruction selectedInstruction={selectedInstruction} setSelectedInstruction={setSelectedInstruction} />
                            </div>
                        )}

                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </div>

                    <div className="border rounded-md overflow-hidden shadow-sm mt-4">
                        <DisputeTable
                            filteredAccounts={filteredAccounts([...ACCOUNTS, ...LATE_PAYMENTS])}
                            selectedAccounts={selectedAccounts}
                            handleSelectAll={handleSelectAll}
                            handleSelectAccount={handleSelectAccount}
                            renderBureauCheckboxes={renderBureauCheckboxes as any}
                            customSelections={customSelections}
                        />
                    </div>
                </>
            )} */}
            
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}