import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowRight, MoreVertical } from "lucide-react";
import { Menu } from "~/components";

interface ChatInputProps {
  className?: string;
  onSend?: (message: string, user: { name: string; icon: string }) => void;
  user: { name: string; icon: string };
  char: { name: string };
}

const MAX_CHAR_LIMIT = 280;

export default function ChatInput({ className, onSend, user, char }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || trimmedMessage.length > MAX_CHAR_LIMIT) return;
    onSend?.(trimmedMessage, user);
    setMessage("");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative mx-auto max-w-[640px] ${className}`}
      >
        <div className={`relative flex bg-gray-700 rounded-2xl p-3 ${className}`}>
          <motion.button
            className="mr-2 text-gray-400 hover:text-white transition duration-200 p-2 rounded-full bg-gray-800 hover:bg-gray-600 flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            aria-label="More options"
          >
            <MoreVertical size={20} />
          </motion.button>

          <textarea
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHAR_LIMIT) {
                setMessage(e.target.value);
                setShowWarning(false);
              } else {
                setShowWarning(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Chat with ${char.name}`}
            className="flex-1 w-full bg-transparent outline-none text-white px-4 py-2 rounded-full focus:ring-0 resize-none overflow-hidden min-w-0 max-w-full"
            rows={1}
          />

          <motion.button
            onClick={message.trim().length > 0 ? handleSend : undefined}
            className={`ml-2 flex items-center gap-1 text-gray-400 transition duration-200 px-4 py-2 rounded-full flex-shrink-0 ${
              message.length > MAX_CHAR_LIMIT ? "cursor-not-allowed opacity-50" : "hover:text-white bg-gray-800 hover:bg-gray-600"
            }`}
            whileHover={message.length <= MAX_CHAR_LIMIT ? { scale: 1.05 } : {}}
            whileTap={message.length <= MAX_CHAR_LIMIT ? { scale: 0.95 } : {}}
            aria-label="Send message"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={message.trim() ? "send" : "continue"}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {message.trim().length > 0 ? <Send size={20} /> : <ArrowRight size={20} />}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.span
                key={message.trim() ? "Send" : "Continue"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                {message.trim().length > 0 ? "Send" : "Continue"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>

        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm px-3 py-2 rounded-md shadow-lg"
          >
            Exceeded {MAX_CHAR_LIMIT} characters, please shorten your message.
          </motion.div>
        )}
      </motion.div>

      {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
