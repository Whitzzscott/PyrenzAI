import React from 'react';
import { FaMagic } from 'react-icons/fa';

interface GenerateButtonProps {
  isGenerating: boolean;
  loadingDots: string;
  onClick: () => void;
}

export default function GenerateButton({ isGenerating, loadingDots, onClick }: GenerateButtonProps) {
  return (
    <button
      className="mt-2 w-full bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center"
      onClick={onClick}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <span className="mr-2">Generating{loadingDots}</span>
      ) : (
        <>
          <FaMagic className="mr-2" />
          Generate
        </>
      )}
    </button>
  );
}
