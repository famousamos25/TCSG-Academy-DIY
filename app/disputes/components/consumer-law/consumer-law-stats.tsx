"use client";

import { useCreditReport } from '@/hooks/use-credit-report';


export default function ConsumerLawStats() {
    const { creditReport,  derogatoryAccs, latePaymentAccounts } = useCreditReport();

    return (
        <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                <div className="text-xl font-bold">
                    {creditReport?.inquiries?.length}
                </div>
                <div className="text-sm text-gray-600">Inquiries</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                <div className="text-xl font-bold">
                    {derogatoryAccs?.length}
                </div>
                <div className="text-sm text-gray-600">Derogatory Accounts</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                <div className="text-xl font-bold">
                    {latePaymentAccounts?.length}
                </div>
                <div className="text-sm text-gray-600">Late Payment Accounts</div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4 text-center shadow-sm">
                <div className="text-xl font-bold">
                    {creditReport?.publicRecords?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Public Records</div>
            </div>
        </div>
    );
}
