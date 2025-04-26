import { Button } from "@/components/ui/button";
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
                <div className="w-full flex items-end justify-end">
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>

                {children}

                <div className="flex justify-end space-x-2 mt-4">
                    <Button className="px-4 py-2rounded-md" variant={"destructive"} onClick={onClose}>
                        Close
                    </Button>
                    <Button className="px-4 py-2 text-white rounded-md" onClick={onSave}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};
