import React from 'react';
import { CreateButton } from '~/components';

interface FormActionsProps {
  onClear: () => void;
  loading: boolean;
}

export default function FormActions({ onClear, loading }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-2 mt-4">
      <button
        type="button"
        onClick={onClear}
        className="text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Clear
      </button>
      <CreateButton loading={loading} />
    </div>
  );
}
