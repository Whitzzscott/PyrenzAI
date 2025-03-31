import { motion } from 'framer-motion';

interface Message {
  name: string;
  text: string;
  icon: string;
}

interface ChatListProps {
  messages: Message[];
}

export default function ChatList({ messages }: ChatListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className='w-64 bg-gray-800 border-r border-gray-700 p-2 rounded-lg ml-2'
    >
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.2 }}
          className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200'
        >
          <img
            src={msg.icon}
            alt={msg.name}
            className='w-10 h-10 rounded-full'
          />
          <div className='flex-1 min-w-0'>
            <h2 className='text-sm font-semibold'>{msg.name}</h2>
            <p className='text-xs text-gray-400 truncate'>{msg.text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
