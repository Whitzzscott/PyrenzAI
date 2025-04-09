import React, { useState, useEffect } from 'react';
import { 
  Dropzone,
  GenerateButton, 
  Textarea 
} from "~/components";
import { FaMagic } from 'react-icons/fa';
import { Utils } from '~/Utility/Utility';

interface ImageUploaderProps {
  onImageSelect: (file: File | null, isAvatar: boolean) => void;
}

interface GenerateImageResponse {
  ok: boolean;
  image?: string;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [bannerImagePreview, setBannerImagePreview] = useState<string | null>(null);
  const [avatarImagePreview, setAvatarImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [negativePrompt, setNegativePrompt] = useState<string>(
    'blurry, low quality, low resolution, bad anatomy, extra fingers, mutated hands, deformed face, ugly, out of frame, poorly drawn'
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [loadingDots, setLoadingDots] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const onDrop = (acceptedFiles: File[], isAvatar: boolean) => {
    const file = acceptedFiles[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isAvatar) {
          setAvatarImagePreview(reader.result as string);
          onImageSelect(file, true);
        } else {
          setBannerImagePreview(reader.result as string);
          onImageSelect(file, false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImageUrl(null);

    const pollInterval = 1000;
    const maxAttempts = 10;

    const pollGenerateImage = async (attempts: number): Promise<void> => {
      if (attempts <= 0) throw new Error('Maximum polling attempts reached');

      try {
        const response = await Utils.post('/api/GenerateImage', { prompt, negative_prompt: negativePrompt }) as GenerateImageResponse;

        if (response.image) {
          const decoded = `data:image/png;base64,${response.image}`;
          setGeneratedImageUrl(decoded);
        } else {
          await new Promise((resolve) => setTimeout(resolve, pollInterval));
          await pollGenerateImage(attempts - 1);
        }
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        await pollGenerateImage(attempts - 1);
      }
    };

    try {
      await pollGenerateImage(maxAttempts);
    } finally {
      setIsGenerating(false);
      setLoadingDots('');
    }
  };

  return (
    <div className="w-full mb-4">
      <Dropzone
        onDrop={onDrop}
        avatarImagePreview={avatarImagePreview}
        bannerImagePreview={bannerImagePreview}
        label="Drop an avatar or banner image ;3"
        className="bg-gray-800 border-dashed border-2 border-gray-500"
      />
      <div className="flex mt-4">
        <button
          className="ml-auto flex items-center bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
        >
          <FaMagic className="mr-2" />
          Generate an image
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Textarea
              label="Prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              showTokenizer={false}
            />
            <Textarea
              label="Negative Prompt"
              placeholder="Enter your negative prompt here..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              showTokenizer={false}
            />
            <GenerateButton
              isGenerating={isGenerating}
              loadingDots={loadingDots}
              onClick={handleGenerateImage}
            />
            {generatedImageUrl && (
              <div className="mt-4">
                <img src={generatedImageUrl} alt="Generated" className="w-full rounded-lg" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
