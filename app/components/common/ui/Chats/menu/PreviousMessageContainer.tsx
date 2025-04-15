import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import SkeletonLoader from "~/components/common/ui/Skeleton/SkeletonPreviousMessage";
import CryingMascot from "~/Assets/Images/MascotCrying.png";
import { Utils } from "~/Utility/Utility";

interface Message {
  id: number;
  conversation_id: string;
  message: string;
  character_image_url: string;
  created_at: string;
  user_uuid: string;
}

export default function PreviousChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { chatID } = useParams<{ chatID: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousChat = async () => {
      try {
        const response = await Utils.post<Message[]>("/api/PreviousChat", {
          page: 1,
          order: "asc",
          limit: 32,
          Type: "GetPreviousChatById",
          conversationId: chatID,
        });

        if (!response || !Array.isArray(response)) {
          throw new Error("Invalid response from API");
        }

        setMessages(response);
      } catch (error) {
        console.error("Failed to fetch previous chat:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousChat();
  }, [chatID]);

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [chatID]);

  const truncateMessage = (text: string, maxLength = 50) => {
    if (!text) return "No message content";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleMessageClick = (conversationId: string) => {
    navigate(`/chat/${conversationId}`);
    window.location.reload();
  };

  return (
    <aside className="hidden lg:flex flex-col justify-end w-64 p-4 h-full">
      <div className="rounded-xl w-full bg-gray-800 flex-grow overflow-auto min-h-[200px] max-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <p className="text-gray-300">Loading previous chats...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <motion.img
              src={CryingMascot}
              alt="Crying Mascot"
              className="w-24 h-24 mt-2"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-gray-300">
              Oh no, messages failed to load. Please try again later.
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <motion.img
              src={CryingMascot}
              alt="Crying Mascot"
              className="w-24 h-24 mt-3"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
            <p className="text-gray-300">
              No chats to load. Start a new conversation!
            </p>
          </div>
        ) : (
          messages.slice(0, 11).map((message) => (
            <motion.div
              key={message.id}
              data-message-id={message.conversation_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-start space-x-4 p-4 border-b border-gray-700 cursor-pointer"
              onClick={() => handleMessageClick(message.conversation_id)}
            >
              <motion.img
                src={message.character_image_url}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1">
                <p className="text-gray-300 break-words">
                  {truncateMessage(message.message)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </aside>
  );
}
