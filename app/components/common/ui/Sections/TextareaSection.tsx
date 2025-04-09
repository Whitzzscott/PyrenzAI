import React from 'react';
import TextareaForm from '../Form/Childrens/TextareaForm';

interface TextareaSectionProps {
  formState: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function TextareaSection({ formState, handleChange }: TextareaSectionProps) {
  return <TextareaForm formState={formState} handleChange={handleChange} />;
}
