'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Paperclip,
  Upload,
  FileText,
  Image as ImageIcon,
  File,
  X,
  Eye,
  Download,
  RefreshCw,
} from 'lucide-react';

interface DisputeLetterAttachmentProps {
  letterId: string;
  onAttachmentAdded: (attachment: {
    id: string;
    name: string;
    type: string;
    url: string;
  }) => void;
}

export function DisputeLetterAttachment({
  letterId,
  onAttachmentAdded,
}: DisputeLetterAttachmentProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 10MB',
        variant: 'destructive',
      });
      return;
    }
    
    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image, PDF, or Word document',
        variant: 'destructive',
      });
      return;
    }
    
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);
    
    try {
      // Simulate file upload with progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          return prev + 5;
        });
      }, 100);
      
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setProgress(100);
      
      // Generate a file URL (in a real app, this would be a server URL)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const fileUrl = reader.result as string;
        
        // Create a new attachment object
        const newAttachment = {
          id: `attachment_${Date.now()}`,
          name: file.name,
          type: file.type,
          url: fileUrl,
        };
        
        // Call the callback to add the attachment
        onAttachmentAdded(newAttachment);
        
        toast({
          title: 'File uploaded',
          description: `${file.name} has been attached to your dispute letter`,
        });
        
        // Reset the form
        setUploading(false);
        setProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your file. Please try again.',
        variant: 'destructive',
      });
      setUploading(false);
      setProgress(0);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />;
    } else if (fileType === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else if (fileType.includes('word')) {
      return <FileText className="h-5 w-5 text-blue-700" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-brand-yellow bg-brand-yellow/5' : 'border-gray-200 hover:border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
        
        <Paperclip className="h-10 w-10 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {dragActive ? 'Drop your file here' : 'Attach supporting documents'}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop your files here or click to browse
        </p>
        <Button
          variant="outline"
          className="text-brand-navy border-brand-navy hover:bg-brand-navy/10"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
        >
          <Upload className="h-4 w-4 mr-2" />
          Browse Files
        </Button>
        <p className="text-xs text-gray-500 mt-4">
          Supported formats: JPG, PNG, PDF, DOC, DOCX (Max 10MB)
        </p>
      </div>

      {uploading && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 text-brand-yellow animate-spin" />
              <div>
                <p className="text-sm font-medium text-gray-900">Uploading file...</p>
                <p className="text-xs text-gray-500">Please wait while your file is being uploaded</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => setUploading(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right text-gray-500 mt-1">{progress}%</p>
        </Card>
      )}
    </div>
  );
}