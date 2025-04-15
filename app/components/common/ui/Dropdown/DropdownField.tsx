import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

interface DropdownFieldProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: { value: string; label: string }[];
  ariaLabel: string;
}

export default function DropdownField({
  name,
  value,
  onChange,
  label,
  options,
  ariaLabel,
}: DropdownFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <label className="block text-white mb-2 animate-fade-in">{label}</label>
      <Select.Root
        name={name}
        value={value}
        onValueChange={onChange}
        onOpenChange={setIsOpen}
        aria-label={ariaLabel}
      >
        <Select.Trigger
          className="w-full p-3 rounded text-white bg-gray-800 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 ease-in-out"
          aria-label={ariaLabel}
        >
          <Select.Value placeholder="Select an option" />
          <Select.Icon className="text-gray-700 animate-pulse">
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={`bg-gray-800 text-white rounded shadow-lg z-50 transform origin-top ${
              isOpen ? "animate-open" : "animate-close"
            }`}
            side="bottom"
            align="start"
          >
            <Select.Viewport>
              {options
                .filter((option) => option.value !== "")
                .map((option) => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
