import React from 'react';

interface CheckboxFieldProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  ariaLabel: string;
}

export default function CheckboxField({ name, checked, onChange, label, ariaLabel }: CheckboxFieldProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-4 h-4">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-full h-full cursor-pointer"
          aria-label={ariaLabel}
        />
        <div className={`w-full h-full border rounded-md ${checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
          {checked && (
            <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <label className="text-white">{label}</label>
    </div>
  );
}
