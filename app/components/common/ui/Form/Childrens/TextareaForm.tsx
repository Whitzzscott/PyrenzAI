import React from "react";
import { Textarea } from "~/components";

interface TextareaFormProps {
  formState: {
    persona: string;
    name: string;
    model_instructions: string;
    scenario: string;
    description: string;
    first_message: string;
    tags: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextareaForm({
  formState,
  handleChange,
}: TextareaFormProps) {
  return (
    <>
      <Textarea
        name="persona"
        value={formState.persona}
        onChange={handleChange}
        label="Persona"
        aria-label="Persona"
        showTokenizer={true}
      />
      <Textarea
        name="name"
        value={formState.name}
        onChange={handleChange}
        label="Name"
        aria-label="Name"
        showTokenizer={true}
      />
      <Textarea
        name="model_instructions"
        value={formState.model_instructions}
        onChange={handleChange}
        label="Model Instructions"
        aria-label="Model Instructions"
        showTokenizer={true}
      />
      <Textarea
        name="scenario"
        value={formState.scenario}
        onChange={handleChange}
        label="Scenario"
        aria-label="Scenario"
        showTokenizer={true}
      />
      <Textarea
        name="description"
        value={formState.description}
        onChange={handleChange}
        label="Description"
        aria-label="Description"
        showTokenizer={true}
      />
      <Textarea
        name="first_message"
        value={formState.first_message}
        onChange={handleChange}
        label="First Message"
        aria-label="First Message"
        showTokenizer={true}
      />
      <Textarea
        name="tags"
        value={formState.tags}
        onChange={handleChange}
        label="Tags"
        aria-label="Tags"
        showTokenizer={false}
      />
    </>
  );
}
