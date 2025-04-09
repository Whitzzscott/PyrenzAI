import { ImageUploader } from '~/components';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  return <ImageUploader onImageSelect={onImageSelect} />;
}
