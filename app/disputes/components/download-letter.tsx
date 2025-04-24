import { useLetterInfo } from '@/hooks/user-letter-info';
import { DisputeLetter } from '@/types/dispute-center';
import html2pdf from 'html2pdf.js';
import { LucideDownload } from "lucide-react";
import { useRef } from 'react';
import { DisputeLetterView } from './dispute-letter-view';


interface PrintLetterProps {
  letter: DisputeLetter;
}

export function DownloadLetter({ letter }: PrintLetterProps) {
  const { letterData } = useLetterInfo({ letter });

  const contentRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadPdf = () => {
    if (!contentRef.current) return;

    html2pdf()
      .set({
        margin: [1.5, 1.5], // top/bottom and left/right cm
        filename: `${letter.letterType}-letter.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
      })
      .from(contentRef.current)
      .save();
  };

  if (!letterData) return null;

  return (
    <>
      <button onClick={handleDownloadPdf} disabled={!letterData} className="text-green-400" title="Download PDF">
        <LucideDownload size={18} />
      </button>
      <div className="absolute opacity-0 -z-50 pointer-events-none">
        <div className="w-full p-5" ref={contentRef}>
          <DisputeLetterView letterType={letter?.letterType} data={letterData} />
        </div>
      </div>
    </>
  );
}
