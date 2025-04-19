import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useUserStore } from "~/store/UserStore";
import { useChatStore } from "~/store/ChatStore";
import { fetchChatData } from "~/routes/api/Loader/ChatPageAPI";
import { Utils } from "~/Utility/Utility";
import {
  Sidebar,
  DesktopSidebar,
  ChatContainer,
  PreviousChat,
  SkeletonMessage,
} from "~/components";

interface PersonaResponse {
  user_uuid: string;
  name: string;
  user_name: string;
  icon: string;
}

const fallbackUserData: PersonaResponse = {
  user_uuid: "fallback-uuid",
  name: "Fallback User",
  user_name: "fallback_user",
  icon: "fallback-icon-url",
};

export default function ChatPage() {
  const { user_uuid, auth_key } = useUserStore();
  const { conversation_id } = useParams<{ conversation_id: string }>();

  const [chatData, setChatData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<PersonaResponse | null>(null);

  const { setFirstMessage } = useChatStore();

  useEffect(() => {
    const getChatData = async () => {
      if (conversation_id && user_uuid && auth_key) {
        try {
          const result = await fetchChatData(conversation_id, user_uuid, auth_key);
          setChatData(result);

          if (result.character && result.character.first_message) {
            setFirstMessage(result.character.first_message);
          }
        } catch (error) {
          console.error("Error fetching chat data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getChatData();
  }, [conversation_id, user_uuid, auth_key, setFirstMessage]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await Utils.post<PersonaResponse>("/persona", {});
        setUserData(response);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserData(fallbackUserData);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <SkeletonMessage />
      </div>
    );
  }

  if (!chatData) {
    return <div className="text-center text-white">Unknown Chat or Character... Try again later.</div>;
  }

  const { character, messages, firstMessage } = chatData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen w-full text-white bg-gray-900"
    >
      <aside className="hidden lg:flex flex-col w-64">
        <Sidebar />
        {character && (
          <DesktopSidebar
            profilePic={character.profile_image}
            safeName={character.name}
          />
        )}
      </aside>

      <main className="flex-1 overflow-y-auto scrollbar-transparent">
        <ChatContainer
          user={userData}
          char={character}
          firstMessage={firstMessage || character.first_message}
          onSend={() => {}}
          previous_message={messages}
        />
      </main>

      <PreviousChat />
    </motion.div>
  );
}
