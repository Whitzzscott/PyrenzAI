import React, { useEffect, useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import llamaTokenizer from 'llama-tokenizer-js';
import { useCharacterStore } from '~/store/CreateStore';

interface TextareaProps {
  name?: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder?: string;
  showTokenizer?: boolean;
  className?: string;
}

export default function Textarea({
  name,
  value,
  onChange,
  label,
  placeholder = '',
  showTokenizer = false,
  className = ''
}: TextareaProps) {
  const [tokenCount, setTokenCount] = useState(0);
  const maxLength = 15000;
  const characterCount = value.length;
  const isMaxLengthExceeded = characterCount > maxLength;
  const setCharacterData = useCharacterStore((state) => state.setCharacterData);
  const textareaTokens = useCharacterStore((state) => state.textareaTokens[name || 'default'] || 0);

  useEffect(() => {
    if (showTokenizer) {
      const tokens = llamaTokenizer.encode(value);
      const tokenLength = tokens.length;
      setTokenCount(tokenLength);
      setCharacterData({
        textareaTokens: {
          ...useCharacterStore.getState().textareaTokens,
          [name || 'default']: tokenLength,
        },
      });
    } else {
      setTokenCount(0);
      setCharacterData({
        textareaTokens: {
          ...useCharacterStore.getState().textareaTokens,
          [name || 'default']: 0,
        },
      });
    }
  }, [value, showTokenizer, setCharacterData, name]);

  const textareaId = name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full mb-4 relative ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={textareaId} className="text-white">
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
        id={textareaId}
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
