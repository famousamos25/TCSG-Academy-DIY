"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { wait } from '@/lib/utils';
import { Loader } from "lucide-react";
import { ReactNode, useState } from "react";

type ConfirmDeleteModalProps = {
    children: React.ReactNode;
    onConfirm: () => Promise<void>;
    title?: string;
    description?: ReactNode;
};

export function ConfirmModal({
    children,
    onConfirm,
    title = "Confirm Action",
    description = "Are you sure you want to continue? This action cannot be undone."
}: ConfirmDeleteModalProps) {
    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirm = async () => {
        setIsPending(true);
        await onConfirm();
        await wait(2000)
        setIsPending(false);
        setIsOpen(false);
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
                <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: description ?? "" }}
                />
                <DialogFooter className="flex justify-between mt-4">
                    <Button variant="secondary" onClick={() => setIsOpen(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={isPending}>
                        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : "Confirm"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
