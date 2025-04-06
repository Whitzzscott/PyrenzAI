// InputFieldsForm.tsx
import React from 'react';
import { InputField } from '~/components';

interface InputFieldsFormProps {
  formState: {
    name: string;
    tags: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputFieldsForm({ formState, handleChange }: InputFieldsFormProps) {
  return (
    <>
      <InputField
        name="name"
        value={formState.name}
        onChange={handleChange}
        label="Name"
        aria-label="Name"
        showTokenizer={true}
        textLimit={30}
        heightLimit="h-16"
      />
      <InputField
        name="tags"
        value={formState.tags}
        onChange={handleChange}
        label="Tags"
        aria-label="Tags"
      />
    </>
  );
}
