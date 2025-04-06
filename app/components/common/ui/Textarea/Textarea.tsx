import React, { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import llamaTokenizer from 'llama-tokenizer-js';

interface TextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder?: string;
  showTokenizer?: boolean;
}

export default function Textarea({
  name,
  value,
  onChange,
  label,
  placeholder = '',
  showTokenizer = false
}: TextareaProps) {
  const [tokenCount, setTokenCount] = useState(0);
  const maxLength = 15000;
  const characterCount = value.length;
  const isMaxLengthExceeded = characterCount > maxLength;

  useEffect(() => {
    if (showTokenizer) {
      const tokens = llamaTokenizer.encode(value);
      setTokenCount(tokens.length);
    }
  }, [value, showTokenizer]);

  return (
    <div className="w-full mb-4 relative">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="text-white">
          {label}
        </label>
        {showTokenizer && (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="text-gray-500 cursor-pointer">Tokens: {tokenCount}</span>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-gray-800 text-white p-2 rounded shadow-md">
                <Tooltip.Arrow className="fill-gray-800" />
                Token Count: {tokenCount}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        )}
      </div>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-32 p-4 rounded-xl text-white bg-gray-800 border-none focus:outline-none focus:ring-2 shadow-md transition-all duration-300 ease-in-out ${
          isMaxLengthExceeded ? 'ring-red-500' : 'focus:ring-gray-600 hover:ring-gray-700'
        }`}
        style={{ resize: 'none' }}
        maxLength={maxLength}
      />
      <span className={`absolute right-2 bottom-2 text-sm ${isMaxLengthExceeded ? 'text-red-500' : 'text-gray-500'}`}>
        {characterCount}/{maxLength}
      </span>
    </div>
  );
}
