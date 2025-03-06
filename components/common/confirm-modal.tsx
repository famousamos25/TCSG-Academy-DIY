"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Loader } from "lucide-react";

type ConfirmDeleteModalProps = {
    children: React.ReactNode;
    onConfirm: () => Promise<void>;
    title?: string;
    description?: string;
};

export function ConfirmModal({
    children,
    onConfirm,
    title = "Confirm Action",
    description = "Are you sure you want to continue? This action cannot be undone."
}: ConfirmDeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = async () => {
        setIsDeleting(true);
        await onConfirm();
        setIsDeleting(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                </DialogHeader>
                <p className="text-sm text-gray-600">{description}</p>
                <DialogFooter className="flex justify-between mt-4">
                    <Button variant="secondary" onClick={() => setIsOpen(false)} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={isDeleting}>
                        {isDeleting ? <Loader className="h-4 w-4 animate-spin" /> : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
