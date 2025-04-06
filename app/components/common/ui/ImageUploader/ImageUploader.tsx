import React, { useState } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
}

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-white"
    style={{ width: '2rem', height: '2rem' }}
  >
    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
  </svg>
);

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);
  const [avatarImagePreview, setAvatarImagePreview] = useState<string | null>(null);

  const onBannerDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setBannerImagePreview(null);
    }
    onImageSelect(file);
  };

  const onAvatarDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarImagePreview(null);
    }
  };

  const { getRootProps: getBannerRootProps, getInputProps: getBannerInputProps, isDragActive: isBannerDragActive } = useDropzone({
    onDrop: onBannerDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'],
    } as Accept,
    multiple: false,
  });

  const { getRootProps: getAvatarRootProps, getInputProps: getAvatarInputProps, isDragActive: isAvatarDragActive } = useDropzone({
    onDrop: onAvatarDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'],
    } as Accept,
    multiple: false,
  });

  return (
    <div className="w-full mb-4">
      <div
        {...getBannerRootProps()}
        className={`relative p-6 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-colors ${
          isBannerDragActive ? 'bg-gray-700' : 'bg-gray-800'
        } ${bannerImagePreview ? 'border-none' : 'border-dashed border-2 border-gray-500'}`}
        style={{ height: '200px' }}
      >
        <input {...getBannerInputProps()} />
        {bannerImagePreview ? (
          <img
            src={bannerImagePreview}
            alt="Banner Preview"
            className="absolute inset-0 w-full h-full rounded-lg object-cover"
          />
        ) : (
          <>
            <UserIcon />
            <p className="text-white mt-2">Drop a banner image ;3</p>
          </>
        )}
        <div
          {...getAvatarRootProps()}
          className={`absolute left-0 top-[130px] w-20 h-20 flex items-center justify-center cursor-pointer rounded-full transition-colors ${
            isAvatarDragActive ? 'bg-gray-700' : 'bg-gray-800'
          } ${avatarImagePreview ? 'border-none' : 'border-dashed border-2 border-gray-500'}`}
        >
          <input {...getAvatarInputProps()} />
          {avatarImagePreview ? (
            <img
              src={avatarImagePreview}
              alt="Avatar Preview"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <UserIcon />
          )}
        </div>
      </div>
    </div>
  );
}
