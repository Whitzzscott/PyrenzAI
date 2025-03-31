import React from 'react';

interface CreateInputsProps {
  title: string;
  setTitle: (value: string) => void;
  tagline: string;
  setTagline: (value: string) => void;
  hashtags: string;
  setHashtags: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  greeting: string;
  setGreeting: (value: string) => void;
}

const CreateInputs: React.FC<CreateInputsProps> = ({
  title,
  setTitle,
  tagline,
  setTagline,
  hashtags,
  setHashtags,
  name,
  setName,
  description,
  setDescription,
  greeting,
  setGreeting,
}) => {
  return (
    <div className='flex flex-col space-y-4'>
      <input
        type='text'
        placeholder='Title (Min 1 character)'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='w-full p-3 bg-gray-800 border border-gray-700 rounded text-white'
        required
      />

      <input
        type='text'
        placeholder='Tagline'
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
        className='w-full p-3 bg-gray-800 border border-gray-700 rounded text-white'
      />

      <input
        type='text'
        placeholder='#Hashtags'
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        className='w-full p-3 bg-gray-800 border border-gray-700 rounded text-white'
      />

      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full p-3 bg-gray-800 border border-gray-700 rounded text-white'
      />

      <textarea
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-24 resize-none'
      />

      <textarea
        placeholder='Greeting'
        value={greeting}
        onChange={(e) => setGreeting(e.target.value)}
        className='w-full p-3 bg-gray-800 border border-gray-700 rounded text-white h-24 resize-none'
      />
    </div>
  );
};

export default CreateInputs;
