import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [image, setImage] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
        onUpload(file);
      }
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full h-32 bg-black flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer
        ${isDragActive ? 'border-blue-500 animate-pulse' : ''}`}
    >
      <input {...getInputProps()} />
      {image ? (
        <img
          src={image}
          alt='Uploaded'
          className='w-full h-full object-cover rounded-lg transition-opacity duration-300'
        />
      ) : (
        <div className='flex flex-col items-center text-gray-400 transition-opacity duration-300'>
          <span className='text-2xl'>📂</span>
          <p className='text-sm'>
            {isDragActive
              ? 'Drop the image...'
              : 'Drag & drop or click to upload'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
