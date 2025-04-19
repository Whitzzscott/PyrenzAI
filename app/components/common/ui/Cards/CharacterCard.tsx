import { MessageSquare, Share2, Globe, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "~/components";
import { CharacterCardProps } from "~/components/types/CharacterCardPropsTypes";
import { CharacterCardModal } from "~/components";

export default function CharacterCard({
  id,
  name,
  description,
  creator,
  chat_messages_count,
  image_url,
  tags = [],
  public: isPublic = false,
}: CharacterCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<CharacterCardProps | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = () => {
    setModalData({
      id,
      name,
      description,
      creator,
      chat_messages_count,
      image_url,
      tags,
      public: isPublic,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        onClick={handleCardClick}
        className="w-full sm:w-56 min-h-[360px] rounded-xl shadow-lg border border-gray-600 bg-gray-900 text-white font-[Baloo_Da_2] overflow-hidden cursor-pointer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        aria-label={`Character card for ${name}`}
      >
        <div className="relative w-full h-48">
          <img
            src={image_url}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
          />
        </div>

        <CardContent className="p-3">
          <h2 className="text-lg font-bold truncate">{name}</h2>
          <span className="text-gray-400 text-xs">@{creator}</span>

          <p className="mt-2 text-gray-300 text-xs leading-tight line-clamp-4">
            {description?.length > 120
              ? `${description.substring(0, 120)}...`
              : description || "No description available."}
          </p>

          <div className="mt-3 flex flex-wrap gap-1">
            {isPublic && (
              <span
                key="public-tag"
                className="bg-black text-white text-[10px] font-semibold py-1 px-2 rounded-full flex items-center gap-1"
              >
                <Globe size={12} />
                Public
              </span>
            )}
            {!isPublic && (
              <span
                key="private-tag"
                className="bg-black text-white text-[10px] font-semibold py-1 px-2 rounded-full flex items-center gap-1"
              >
                <Lock size={12} />
                Private
              </span>
            )}
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-black text-white text-[10px] font-semibold py-1 px-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center text-gray-400 text-xs">
            <div className="flex items-center">
              <MessageSquare size={14} className="text-white" />
              <span className="font-medium ml-1">{chat_messages_count}</span>
            </div>

            <div className="flex items-center ml-auto gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${window.location.origin}/characters/${id}`,
                  );
                }}
                className="flex items-center transition-colors duration-200 hover:text-blue-400"
                aria-label={`Share ${name}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Share2 size={16} />
              </motion.button>
            </div>
          </div>
        </CardContent>
      </motion.div>

      {isModalOpen && modalData && (
        <CharacterCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          character={modalData}
        />
      )}
    </>
  );
}
