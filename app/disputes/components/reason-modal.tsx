import { X } from "lucide-react";

interface ModalProps { 
    children: React.ReactNode;
    onClose: () => void;
    onSave: () => void;
}

export const Modal = ({ children, onClose, onSave }: ModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    <X className="w-5 h-5" />
                </button>

                {children}

                <div className="flex justify-end space-x-2 mt-4">
                    <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>
                        Close
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={onSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
