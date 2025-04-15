import { useEffect, useRef } from "react";
import { useParams } from "@remix-run/react";
import { motion } from "framer-motion";
import {
  Sidebar,
  DesktopSidebar,
  ChatContainer,
  PreviousChat,
  SkeletonMessage,
} from "~/components";
import { useChatStore } from "~/store/ChatStore";
import { fetchChatData } from "~/routes/api/Loader/ChatPageAPI";

export default function ChatPage() {
  const { chatID } = useParams<{ chatID: string }>();

  const {
    user,
    char,
    firstMessage,
    error,
    loading,
    previousMessages,
    setUser,
    setChar,
    setFirstMessage,
    setError,
    setLoading,
    setPreviousMessages,
  } = useChatStore();

  const hasFetchedData = useRef(false);
  const hasSentMessage = useRef(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem("User_Name") || "Anon";
    setUser({ name: storedUserName, user_name: storedUserName, icon: "" });
  }, [setUser]);

  useEffect(() => {
    if (!chatID || hasFetchedData.current) return;
    hasFetchedData.current = true;
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get("Character_Id") || undefined; // Convert null to undefined

    (async () => {
      try {
        const { character, messages, firstMessage } = await fetchChatData(
          chatID,
          characterId,
        );

        const validatedIcon = await validateImage(character.image_url);
        setChar({ ...character, image_url: validatedIcon });
        setFirstMessage(firstMessage);

        const formattedMessages = messages.map((msg) => {
          if (msg.type === "assistant") {
            return { ...msg, icon: validatedIcon };
          }
          return msg;
        });

        setPreviousMessages(formattedMessages);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, [
    chatID,
    setLoading,
    setChar,
    setFirstMessage,
    setPreviousMessages,
    setError,
  ]);

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
      <aside className="hidden lg:flex flex-col w-64">
        <Sidebar />
        {char && (
          <DesktopSidebar profilePic={char.image_url} safeName={char.name} />
        )}
      </aside>

      <main className="flex-1 overflow-y-auto scrollbar-transparent">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <SkeletonMessage />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            Error: {error}
          </div>
        ) : (
          <ChatContainer
            user={user}
            char={{
              name: char?.name || "Unknown",
              icon: char?.image_url || "",
            }}
            firstMessage={firstMessage}
            onSend={handleSend}
            previous_message={previousMessages}
          />
        )}
      </main>

      <PreviousChat />
    </motion.div>
  );
}
