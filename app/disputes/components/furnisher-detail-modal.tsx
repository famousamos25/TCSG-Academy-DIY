import { Account } from "./DisputeTable";

interface FurnisherDetailsModalProps {
  account: Account;
  onClose: () => void;
}

const FurnisherDetailsModal: React.FC<FurnisherDetailsModalProps> = ({
  account,
  onClose,
}) => {

  const renderCell = (
    label: string,
    tu?: string,
    exp?: string,
    eqfx?: string
  ) => (
    <div className="grid grid-cols-4 gap-4 py-2 border-b border-gray-300 text-sm">
      <div className="text-gray-600 font-medium">{label}</div>
      <div>{tu || "--"}</div>
      <div>{exp || "--"}</div>
      <div>{eqfx || "--"}</div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[80vh]"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">{account.furnisher}</h2>

        <div className="grid grid-cols-4 gap-4 font-bold text-sm text-gray-700 mb-2">
          <div></div>
          <div className="text-cyan-500">TransUnion</div>
          <div className="text-pink-500">Experian</div>
          <div className="text-red-500">Equifax</div>
        </div>

        {renderCell("Account Number", account.bureaus.tu, account.bureaus.exp, account.bureaus.eqfx)}
        {renderCell("Account Status", account.status, account.status, account.status)}
        {renderCell("Account Type", account.accountType, account.accountType, account.accountType)}
        {renderCell("Account Detail", "Revolving Account", "Revolving Account", "Revolving Account")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Bureau Code", "Individual", "Individual", "Individual")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Monthly Payment", "--", "--", "--")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Payment Status", "Collection/Chargeoff", "Collection/Chargeoff", "Collection/Chargeoff")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Past Due", "--", "--", "--")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Date Opened", "12/01/2021", "11/30/2021", "11/30/2021")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Date Last Active", "09/20/2023", "12/31/2023", "05/31/2023")} {/* This is a placeholder, replace with actual data */}
        {renderCell("High Credit", "--", "1,000", "1,000")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Credit Limit", "--", "1,000", "1,000")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Balance Owed", "--", "1,000", "1,000")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Last Reported", "09/20/2023", "12/31/2023", "05/31/2023")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Month Term", "--", "--", "--")} {/* This is a placeholder, replace with actual data */}
        {renderCell("Comments", "--", "--", "--")} {/* This is a placeholder, replace with actual data */}
      </div>
    </div>
  );
};

export default FurnisherDetailsModal;
