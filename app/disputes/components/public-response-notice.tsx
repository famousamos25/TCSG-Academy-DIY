import { Info } from "lucide-react";

const PublicRecordsNotice = () => (
    <div className="border border-cyan-300 rounded-md overflow-hidden shadow-sm p-3 flex items-center">
        <Info className="text-cyan-500 font-semibold" />
        <p className="ml-2 text-cyan-500">No Bankruptcies are present in your report.</p>
    </div>
);

export default PublicRecordsNotice;