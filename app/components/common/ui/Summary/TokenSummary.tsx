import React from 'react';

interface TokenSummaryProps {
  tokenTotal: number;
}

export default function TokenSummary({ tokenTotal }: TokenSummaryProps) {
  return (
    <div className="text-gray-400 mt-4">
      <strong>Token Summary</strong>
      <p>Total: {tokenTotal} Tokens</p>
    </div>
  );
}
