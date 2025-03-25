import { FileEdit, Files, MailOpen } from 'lucide-react';

export const disputeMenus = [
    { icon: <FileEdit size={24} />, title: 'Security Freeze Dispute', type: 'security-freeze' },
    { icon: <Files size={24} />, title: 'Consumer Law Disputes', type: 'consumer-law' },
    { icon: <Files size={24} />, title: 'Metro-2 Disputes', type: 'metro-2' },
    { icon: <Files size={24} />, title: 'Other Disputes', type: 'other' },
    { icon: <MailOpen size={24} />, title: 'Disputed Letters', type: 'disputed-letters' },
  ];