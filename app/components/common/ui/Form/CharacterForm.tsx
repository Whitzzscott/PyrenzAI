import React, { useState } from 'react';
import {
  ImageUploader,
  DropdownField,
  CheckboxField,
  CreateButton
} from '~/components';
import TextareaForm from './Childrens/TextareaForm';
import { useCharacterStore } from '~/store/CreateStore';
import { supabase } from '~/Utility/supabaseClient';

interface CharacterData {
  persona: string;
  name: string;
  model_instructions: string;
  scenario: string;
  description: string;
  first_message: string;
  tags: string;
  gender: string;
  is_public: boolean;
  is_nsfw: boolean;
  textareaTokens: { [key: string]: number }; 
  TokenTotal: number;
}

export default function CharacterForm() {
  const [loading, setLoading] = useState(false);

  const characterData = useCharacterStore((state) => state);
  const setCharacterData = useCharacterStore((state) => state.setCharacterData);

  const handleImageSelect = (file: File | null) => {};

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const handleDropdownChange = (value: string) => {
    setCharacterData({ gender: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setCharacterData({ [name]: e.target.checked });
    } else {
      setCharacterData({ [name]: value });
    }
  };

  const handleClear = () => {
    const emptyData: Omit<CharacterData, 'textareaTokens' | 'TokenTotal'> = {
      persona: '',
      name: '',
      model_instructions: '',
      scenario: '',
      description: '',
      first_message: '',
      tags: '',
      gender: '',
      is_public: false,
      is_nsfw: false,
    };
    setCharacterData({ ...emptyData, textareaTokens: {} });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [
      'persona',
      'name',
      'model_instructions',
      'scenario',
      'description',
      'first_message',
      'tags',
      'gender',
    ];

    for (const field of requiredFields) {
      if (!characterData[field as keyof CharacterData]) {
        alert(`Missing required item: ${field}`);
        setLoading(false);
        return;
      }
    }

    try {
      const { data, error } = await supabase.rpc('createcharacter', characterData);
      if (error) {
        console.error('Error creating character:', error);
      } else {
        console.log('Character created:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-lg shadow-lg w-full max-w-2xl space-y-6"
      >
        <ImageUploader onImageSelect={handleImageSelect} />
        <TextareaForm formState={characterData} handleChange={handleChange} />
        <DropdownField
          name="gender"
          value={characterData.gender}
          onChange={handleDropdownChange}
          label="Gender"
          options={genderOptions}
          ariaLabel="Gender"
        />
        <div className="flex flex-col space-y-2">
          <span className="text-gray-400">Visibility</span>
          <div className="flex space-x-4">
            <CheckboxField
              name="is_public"
              checked={characterData.is_public}
              onChange={(e) => handleChange({ target: { name: 'is_public', value: e.target.checked } } as any)}
              label="Public"
              ariaLabel="Public"
            />
            <CheckboxField
              name="is_nsfw"
              checked={characterData.is_nsfw}
              onChange={(e) => handleChange({ target: { name: 'is_nsfw', value: e.target.checked } } as any)}
              label="NSFW"
              ariaLabel="NSFW"
            />
          </div>
        </div>
        <div className="text-gray-400 mt-4">
          <strong>Token Summary</strong>
          <p>Total: {characterData.TokenTotal} Tokens</p>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={handleClear}
            className="text-white p-3 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </button>
          <CreateButton loading={loading} />
        </div>
      </form>
    </div>
  );
}
