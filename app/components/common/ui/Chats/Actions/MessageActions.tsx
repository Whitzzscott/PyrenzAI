import { Pencil } from 'lucide-react';

interface MessageActionsProps {
  onEdit?: () => void;
}

export default function MessageActions({ onEdit }: MessageActionsProps) {
  return (
    <div className='absolute -top-6 left-1'>
      <Pencil
        size={16}
        className='text-gray-400 hover:text-white cursor-pointer transition-none'
        onClick={onEdit}
      />
    </div>
  );
}
