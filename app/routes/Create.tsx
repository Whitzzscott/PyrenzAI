import { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa'; // Import the user icon with a plus sign
import {ImageUploader} from '~/components';
import {CreateInputs} from '~/components';

const CreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [greeting, setGreeting] = useState('');
  const [privateVisibility, setPrivateVisibility] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  return (
    <div className='min-h-screen bg-black text-white font-baloo p-6 flex flex-col items-center'>
      <div className='w-full max-w-lg bg-gray-900 p-6 rounded-lg flex flex-col space-y-6'>
        {/* ImageUploader fills the entire top */}
        <div className='w-full mb-6'>
          <ImageUploader onUpload={(file) => setUploadedImage(file)} />
        </div>

        {/* CreateInputs Component */}
        <CreateInputs
          title={title}
          setTitle={setTitle}
          tagline={tagline}
          setTagline={setTagline}
          hashtags={hashtags}
          setHashtags={setHashtags}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          greeting={greeting}
          setGreeting={setGreeting}
        />

        {/* Checkmark-style buttons for Private and NSFW */}
        <div className='flex gap-6 mt-6'>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='private'
              checked={privateVisibility}
              onChange={() => setPrivateVisibility(!privateVisibility)}
              className='form-checkbox h-5 w-5 text-blue-600'
            />
            <label htmlFor='private' className='text-white'>
              Private
            </label>
          </div>

          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='nsfw'
              checked={nsfw}
              onChange={() => setNsfw(!nsfw)}
              className='form-checkbox h-5 w-5 text-red-600'
            />
            <label htmlFor='nsfw' className='text-white'>
              NSFW
            </label>
          </div>
        </div>

        {/* Create Button with margin-right of -25px */}
        <div className='mt-6 flex justify-end mr-[-25px]'>
          <button className='flex items-center px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700'>
            <FaUserPlus className='mr-2' /> {/* Person icon with plus sign */}
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
