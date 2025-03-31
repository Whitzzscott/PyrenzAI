import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowRight, MoreVertical } from 'lucide-react';
import {Menu} from '~/components/Component';

interface ChatInputProps {
  className?: string;
  onSend?: (message: string, user: { name: string; icon: string }) => void;
  user: { name: string; icon: string };
}

export default function ChatInput({ className, onSend, user }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onSend?.(trimmedMessage, user);
    setMessage('');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? 200 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`max-w-[640px] w-full flex items-center bg-gray-700 rounded-full p-3 relative overflow-hidden ${className}`}
      >
        <motion.button
          className='mr-2 text-gray-400 hover:text-white transition duration-200 p-2 rounded-full bg-gray-800 hover:bg-gray-600 flex-shrink-0'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(true)}
          aria-label='More options'
        >
          <MoreVertical size={20} />
        </motion.button>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder='Type a message...'
          className='flex-1 w-full bg-transparent outline-none text-white px-4 py-2 rounded-full focus:ring-0 resize-none overflow-hidden min-w-0 max-w-full'
          rows={1}
        />

        <motion.button
          onClick={handleSend}
          className='ml-2 flex items-center gap-1 text-gray-400 hover:text-white transition duration-200 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-600 flex-shrink-0'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label='Send message'
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={message.trim() ? 'send' : 'continue'}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {message.trim() ? <Send size={20} /> : <ArrowRight size={20} />}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode='wait'>
            <motion.span
              key={message.trim() ? 'Send' : 'Continue'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='text-sm font-medium'
            >
              {message.trim() ? 'Send' : 'Continue'}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
