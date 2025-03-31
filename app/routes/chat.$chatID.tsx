import { useEffect, useRef, useState } from "react";
import { useParams } from "@remix-run/react";
import { motion } from "framer-motion";
import { Sidebar } from "~/components/Component";
import { DesktopSidebar } from "~/components/Component";
import { ChatContainer } from "~/components/Component";
import { EmptyContent } from "~/components/Component";
import { SkeletonMessage } from "~/components/Component";
import { Utils } from "~/Utility/Utility";
import { User, Character, Message } from "~/components/types/chatTypes";
import { useIsDesktop } from "~/components/hooks/useIsDesktop";

export default function ChatPage() {
  const { chatID } = useParams<{ chatID: string }>();
  const isDesktop = useIsDesktop();
  
  const [user, setUser] = useState<User | null>(null);
  const [char, setChar] = useState<Character | null>(null);
  const [firstMessage, setFirstMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [previousMessages, setPreviousMessages] = useState<Message[]>([]);
  
  const hasFetchedData = useRef(false);
  const hasSentMessage = useRef(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("User_Name") || "Anon";
    const storedUserImage = localStorage.getItem("User_Image") 
      || `https://api.dicebear.com/8.x/avataaars/svg?seed=${storedUserName.split("@")[0] || "UnknownUser"}`;

    setUser({ name: storedUserName, user_name: storedUserName, icon: storedUserImage });
  }, []);

  useEffect(() => {
    if (!chatID || hasFetchedData.current) return;
    hasFetchedData.current = true;
    setLoading(true);

    (async () => {
      try {
        const { character } = await Utils.post<{ character: Character }>("/api/GetChatId", {
          type: "getchatid",
          chatID,
        });

        if (!character) throw new Error("Character not found");

        const validatedIcon = await validateImage(character.image_url);
        setChar({ ...character, image_url: validatedIcon });
        setFirstMessage(character.first_message);

        const { messages: fetchedMessages } = await Utils.post<{ messages: any[] }>("/api/GetMessages", { chatID });

        if (fetchedMessages) {
          const formattedMessages = fetchedMessages.flatMap((msg) => {
            return [
              msg.user_message &&
              !previousMessages.some((m) => m.text === msg.user_message)
                ? { name: user?.name || "User", text: msg.user_message, icon: user?.icon || "", type: "user" }
                : null,
              msg.ai_message &&
              !previousMessages.some((m) => m.text === msg.ai_message)
                ? { name: character.name || "Assistant", text: msg.ai_message, icon: validatedIcon, type: "assistant" }
                : null,
            ].filter(Boolean) as Message[];
          });

          setPreviousMessages((prev) => [...prev, ...formattedMessages]);
        }
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, [chatID, previousMessages, user]);

  const handleSend = (message: string) => {
    if (!hasSentMessage.current) {
      hasSentMessage.current = true;
      console.log("Sending message:", message);
    }
  };

  const validateImage = async (url: string) => {
    if (!url) return "";
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(url);
      img.onerror = () => resolve("");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen w-full text-white bg-gray-900"
    >
      {isDesktop && <Sidebar />}
      {isDesktop && char && <DesktopSidebar profilePic={char.image_url} safeName={char.name} />}
      {isDesktop && <EmptyContent />}

      <div className="flex-1 w-full overflow-y-auto scrollbar-transparent">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <SkeletonMessage />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">Error: {error}</div>
        ) : (
          <ChatContainer
            user={user}
            char={{ name: char?.name || "Unknown", icon: char?.image_url || "" }}
            isDesktop={isDesktop}
            firstMessage={firstMessage}
            onSend={handleSend}
            previous_message={previousMessages}
          />
        )}
      </div>
    </motion.div>
  );
}
