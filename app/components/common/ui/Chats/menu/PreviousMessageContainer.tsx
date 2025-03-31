import { motion } from 'framer-motion';

interface EmptyContentProps {
  className?: string;
}

export default function EmptyContent({ className = '' }: EmptyContentProps) {
  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: 250, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`ml-[70px] rounded-xl w-60 bg-gray-800 ${className}`}
    >
      <div className='h-full flex items-center justify-center' />
    </motion.div>
  );
}
