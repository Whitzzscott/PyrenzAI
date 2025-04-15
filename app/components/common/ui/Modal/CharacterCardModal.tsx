import React, { useState } from "react";
import { MessageSquare, Globe, Lock } from "lucide-react";
import { CharacterCardProps } from "~/components/types/CharacterCardPropsTypes";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@remix-run/react";
import { Utils } from "~/Utility/Utility";

interface CharacterCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: CharacterCardProps | null;
}

const CharacterCardModal: React.FC<CharacterCardModalProps> = ({
  isOpen,
  onClose,
  character,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (!character) return null;

  const handleChatNow = async () => {
    if (isLoading || !character?.id) return;

    setIsLoading(true);

    const requestData = {
      characterID: `${character.id}`,
    };

    try {
      const response = await Utils.post<{ chatID: string }>(
        "/api/chat-id",
        requestData,
      );

      if (response?.chatID) {
        navigate(`/chat/${response.chatID}`);
      } else {
        console.error("Failed to generate chatID");
      }
    } catch (error) {
      console.error("Error generating chatID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
        >
          <motion.div
            className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl w-11/12 sm:w-[400px] flex flex-col sm:flex-row items-start sm:items-center relative"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.8,
              rotate: -8,
              transition: { duration: 0.35, ease: "easeInOut" },
            }}
          >
            <motion.img
              src={character.image_url}
              alt={character.name}
              className="w-24 h-32 object-cover rounded-lg border-2 border-gray-700 shadow-lg sm:mr-4"
              initial={{ scale: 0.8 }}
              animate={{
                scale: 1,
                transition: { delay: 0.1, duration: 0.3, ease: "easeOut" },
              }}
            />
            <div className="flex flex-col items-start sm:items-start flex-1">
              <h2 className="mt-3 text-xl font-bold">{character.name}</h2>
              <span className="text-gray-400 text-sm">
                @{character.creator}
              </span>

              <p className="mt-4 text-gray-300 text-left text-sm leading-relaxed px-2">
                {character.description || "No description available."}
              </p>

              <div className="flex items-center mt-4 w-full">
                <motion.button
                  className={`flex-1 ${isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200`}
                  onClick={handleChatNow}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Chat Now"}
                </motion.button>
                <div className="flex items-center gap-1 ml-4">
                  <MessageSquare size={18} className="text-white" />
                  <span>{character.chat_messages_count}</span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap justify-start gap-2 w-full">
                {character.public !== undefined && (
                  <motion.span
                    className="bg-black text-white text-xs font-semibold py-1 px-3 rounded-full flex items-center gap-1 transition-transform duration-200 hover:scale-110"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0 },
                    }}
                  >
                    {character.public ? (
                      <>
                        <Globe size={14} />
                        Public
                      </>
                    ) : (
                      <>
                        <Lock size={14} />
                        Private
                      </>
                    )}
                  </motion.span>
                )}
                {character.tags &&
                  character.tags.length > 0 &&
                  character.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="bg-black text-white text-xs font-semibold py-1 px-3 rounded-full transition-transform duration-200 hover:scale-110"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: (index + 1) * 0.05 },
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default CharacterCardModal;
