import { useLetterInfo } from '@/hooks/user-letter-info';
import { DisputeLetter } from '@/types/dispute-center';
import { PrinterIcon } from "lucide-react";
import { useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { DisputeLetterView } from './dispute-letter-view';

interface PrintLetterProps {
  letter: DisputeLetter;
}

export function PrintLetter({ letter }: PrintLetterProps) {
  const { letterData } = useLetterInfo({ letter });

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    content: () =>contentRef.current,
    pageStyle: '@media print { @page { margin: 0; } body { margin: 1.5cm; } }'
  });

  if (!letterData) return null;

  return (
    <>
      <button onClick={() => reactToPrintFn()} disabled={!letterData} className="text-green-400" title="Print">
        <PrinterIcon size={18} />
      </button>
      <div className="absolute opacity-0 -z-50 pointer-events-none">
        <div className="w-full p-5" ref={contentRef}>
          <DisputeLetterView letterType={letter?.letterType} data={letterData} />
        </div>
      </div>
    </>
  );
}
