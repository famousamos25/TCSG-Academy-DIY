import { AlertCircle, CheckCircle2, Crop, Loader, Trash2, Upload } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { TabsContent } from '../ui/tabs';
import { REQUIRED_DOCUMENTS, uploadDocument, UserDocument } from '@/services/document.service';
import { Badge } from '../ui/badge';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { deleteUserDocument, getUserDocuments } from '@/services/document.service';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ConfirmModal } from '../common/confirm-modal';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

const UploadedUserDocuments = () => {
	const [documents, setDocuments] = useState<Record<string, UserDocument[]>>(
		{}
	);
	const [uploadingDocuments, setUploadingDocuments] = useState(false);
	const [cropData, setCropData] = useState<{
		file: File | null;
		type: string;
		preview: string;
	} | null>(null);

	const [user] = useAuthState(auth);
	const cropperRef = useRef<any>(null);
	const { toast } = useToast();
	const router = useRouter();
	const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null; }>({});

	const uploadFile = async (file: File, documentType: string) => {
		if (!user) return;

		try {
			setUploadingDocuments(true);
			const uploadedDoc = await uploadDocument(user.uid, file, documentType);

			setDocuments((prev) => ({
				...prev,
				[documentType]: [...(prev[documentType] || []), uploadedDoc],
			}));

			toast({
				title: "Document Uploaded",
				description: "Your document has been uploaded successfully.",
			});

		} catch (error) {
			console.error("Error uploading document:", error);
			toast({
				title: "Upload Failed",
				description: "Failed to upload document. Please try again.",
				variant: "destructive",
			});
		} finally {
			setUploadingDocuments(false);
			router.refresh();
		}
	};

	const handleUploadClick = (documentType: string) => {
		const fileInput = fileInputRefs.current[documentType];
		if (fileInput) {
			fileInput.click();
		}
	};

	const handleCrop = async () => {
		if (!cropData || !cropperRef.current || !user) return;

		try {
			const canvas = cropperRef.current.cropper.getCroppedCanvas();
			canvas.toBlob(async (blob: Blob) => {
				const croppedFile = new File(
					[blob],
					cropData.file?.name || "cropped-image.jpg",
					{
						type: "image/jpeg",
					}
				);
				await uploadFile(croppedFile, cropData.type);
				setCropData(null);
			}, "image/jpeg");
		} catch (error) {
			console.error("Error cropping image:", error);
			toast({
				title: "Error",
				description: "Failed to crop image. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		documentType: string
	) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file size (10MB limit)
		if (file.size > 10 * 1024 * 1024) {
			toast({
				title: "File Too Large",
				description: "File size must be less than 10MB",
				variant: "destructive",
			});
			return;
		}

		// Validate file type
		const docConfig = REQUIRED_DOCUMENTS.find((doc) => doc.type === documentType);

		if (!docConfig?.acceptedTypes.includes(file.type)) {
			toast({
				title: "Invalid File Type",
				description: `Please upload a ${docConfig?.acceptedTypes.join(
					" or "
				)} file`,
				variant: "destructive",
			});
			return;
		}

		// For image files that need cropping
		if (documentType === "drivers_license" || documentType === "social_security" || documentType === "utility_bill") {
			const reader = new FileReader();
			reader.onload = () => {
				setCropData({ file, type: documentType, preview: reader.result as string });
			};
			reader.readAsDataURL(file);
		} else {
			await uploadFile(file, documentType);
		}
	};

	const handleDeleteDocument = async (documentId: string, type: string) => {
		if (!user) return;
		const res = await deleteUserDocument(user.uid, documentId);

		if (!res.success) {
			toast({
				title: "Error",
				description: res.error,
				variant: "destructive",
			});
			return;
		}

		setDocuments((prev) => ({
			...prev,
			[type]: prev[type]?.filter((doc) => doc.id !== documentId),
		}));
		toast({
			title: "Document Deleted",
			description: "The document has been deleted successfully.",
		});
		router.refresh();
	};

	useEffect(() => {

		const fetchDocuments = async () => {
			if (!user) return;

			try {

				const dbDocs = await getUserDocuments(user.uid);
				const docs: Record<string, UserDocument[]> = {};

				for (const docType of REQUIRED_DOCUMENTS) {
					const userDocs = dbDocs.filter((doc) => doc.type === docType.type);
					if (userDocs.length > 0) {
						docs[docType.type] = userDocs;
					}
				}

				setDocuments(docs);
			} catch (error) {
				console.error("Error fetching documents:", error);
			}
		};

		if (user?.uid) {
			fetchDocuments();
		}
	}, [user]);	

	return (
		<TabsContent value="documents">
			<div className="py-4 space-y-6">
				{REQUIRED_DOCUMENTS.map((doc) => (
					<div key={doc.type} className="p-4 border rounded-lg">
						<div className="flex items-center justify-between mb-4">
							<div>
								<h3 className="font-medium text-gray-900">{doc.label}</h3>
								<p className="text-sm text-gray-600">{doc.description}</p>
							</div>
							{doc.required && (
								<Badge
									variant="outline"
									className="text-yellow-600 bg-yellow-50"
								>
									Required
								</Badge>
							)}
						</div>

						{documents[doc.type]?.length > 0 ? (
							<div className="space-y-2">
								{documents[doc.type].map((uploadedDoc) => (
									<div
										key={uploadedDoc.id}
										className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
									>
										<div className="flex items-center space-x-3">
											<div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-yellow/10">
												<CheckCircle2 className="w-4 h-4 text-brand-yellow" />
											</div>
											<div onClick={() => {
												if (uploadedDoc.fileUrl) {
													window.open(uploadedDoc.fileUrl, '_blank');
												}
											}}
											className='cursor-pointer group'
											>
												<div className="font-medium text-gray-900 group-hover:underline">
													{uploadedDoc.fileName}
												</div>
												<div className="text-sm text-gray-600">
													{(
														uploadedDoc.uploadedAt instanceof Timestamp ? uploadedDoc.uploadedAt.toDate() : new Date()
													).toLocaleDateString()}
												</div>
											</div>
										</div>
										<ConfirmModal
											onConfirm={() => handleDeleteDocument(uploadedDoc.id, uploadedDoc.type)}
										>
											<Button
												variant="ghost"
												size="icon"
												type="button"

												className="text-gray-400 hover:text-red-600"
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										</ConfirmModal>
									</div>
								))}
							</div>
						) : (
							<div
								onClick={() => handleUploadClick(doc.type)}
								className="p-8 text-center transition-colors border-2 border-gray-200 border-dashed rounded-lg cursor-pointer hover:border-gray-300"
							>
								<Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
								<p className="text-sm text-gray-600">
									Click to upload or drag and drop
								</p>
								<p className="mt-1 text-xs text-gray-500">
									{doc.acceptedTypes
										.map((type) => type.split("/")[1].toUpperCase())
										.join(", ")}{" "}
									up to 10MB
								</p>
							</div>
						)}

						<input
							ref={(el) => (fileInputRefs.current[doc.type] = el as any)}
							type="file"
							accept={doc.acceptedTypes.join(",")}
							className="hidden"
							onChange={(e) => handleFileChange(e, doc.type)}
						/>
					</div>
				))}

				<div className="flex items-start p-4 space-x-3 rounded-lg bg-gray-50">
					<AlertCircle className="h-5 w-5 text-brand-navy mt-0.5" />
					<div className="text-sm">
						<p className="font-medium text-gray-900">
							Document Requirements
						</p>
						<p className="mt-1 text-gray-600">
							All documents must be clear, legible, and current. Documents
							will be reviewed within 24-48 hours. You will be notified if
							any documents need to be resubmitted.
						</p>
					</div>
				</div>
			</div>

			{/* Image Cropping Dialog */}
			{cropData && (
				<Dialog open={true} onOpenChange={() => setCropData(null)}>
					<DialogContent className="sm:max-w-[600px]">
						<DialogHeader>
							<DialogTitle>Crop Document</DialogTitle>
						</DialogHeader>
						<div className="py-4">
							<Cropper
								ref={cropperRef}
								src={cropData.preview}
								style={{ height: 400, width: "100%" }}
								aspectRatio={16 / 9}
								guides={true}
								preview=".preview"
							/>
							<div className="flex justify-end mt-4 space-x-3">
								<Button variant="outline" onClick={() => setCropData(null)}>
									Cancel
								</Button>
								<Button
									onClick={handleCrop}
									disabled={uploadingDocuments}
									className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
								>
									{
										uploadingDocuments ? (
											<Loader className="w-4 h-4 mr-2 animate-spin" />
										) : (
											<Crop className="w-4 h-4 mr-2" />
										)
									}

									Crop & Upload
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</TabsContent>
	);
};

export default UploadedUserDocuments;