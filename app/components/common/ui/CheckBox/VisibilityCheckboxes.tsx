import React from 'react';
import { CheckboxField } from '~/components';

interface VisibilityCheckboxesProps {
  isPublic: boolean;
  isNSFW: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function VisibilityCheckboxes({ isPublic, isNSFW, handleChange }: VisibilityCheckboxesProps) {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-gray-400">Visibility</span>
      <div className="flex space-x-4">
        <CheckboxField
          name="is_public"
          checked={isPublic}
          onChange={(e) => handleChange({ target: { name: 'is_public', value: e.target.checked } } as any)}
          label="Public"
          ariaLabel="Public"
        />
        <CheckboxField
          name="is_nsfw"
          checked={isNSFW}
          onChange={(e) => handleChange({ target: { name: 'is_nsfw', value: e.target.checked } } as any)}
          label="NSFW"
          ariaLabel="NSFW"
        />
      </div>
    </div>
  );
}
