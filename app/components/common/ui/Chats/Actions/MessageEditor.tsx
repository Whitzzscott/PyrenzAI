import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface MessageEditorProps {
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

const MessageEditor: React.FC<MessageEditorProps> = ({
  initialText,
  onSave,
  onCancel,
}) => {
  const [editedText, setEditedText] = useState(initialText);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className='flex flex-col gap-2 border border-gray-500 rounded-lg p-2'
    >
      <textarea
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        className='w-full bg-transparent outline-none text-white p-2 border rounded-md resize-none'
        autoFocus
        rows={3}
      />

      <div className='flex justify-end gap-4'>
        <button
          onClick={onCancel}
          className='flex items-center gap-1 text-gray-400 hover:text-red-400 transition'
        >
          <X size={16} />
          Cancel
        </button>
        <button
          onClick={() => onSave(editedText)}
          className='flex items-center gap-1 text-gray-400 hover:text-green-400 transition'
        >
          <Check size={16} />
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default MessageEditor;
