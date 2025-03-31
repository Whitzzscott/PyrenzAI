import { useState, useEffect, useRef, Suspense } from "react";
import { useParams } from "@remix-run/react";
import { ChatMain } from "~/components/Component";
import { Message, ChatContainerProps, GenerateResponse } from "~/components/types/chatTypes";
import { Utils } from "~/Utility/Utility";

export default function ChatContainer({
  user,
  char,
  isDesktop,
  firstMessage,
  onSend,
  previous_message = [],
}: ChatContainerProps & { previous_message?: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { chatID } = useParams<{ chatID: string }>();
  const messageIdRef = useRef<{ charId: string | null; userId: string | null } | null>(null);
  const [charIcon, setCharIcon] = useState<string>(char?.icon ?? "");

  useEffect(() => {
    if (char?.icon) {
      const img = new Image();
      img.src = char.icon;
      img.onload = () => setCharIcon(char.icon ?? "");
      img.onerror = () => setCharIcon("");
    }
  }, [char?.icon]);

  useEffect(() => {
    const firstMsg: Message | null =
      char && firstMessage
        ? {
            name: char.name ?? "Unknown",
            text: firstMessage,
            icon: char.icon ?? "",
            type: "assistant",
            isFirst: true,
          }
        : null;

    setMessages(firstMsg ? [firstMsg, ...previous_message] : [...previous_message]);
  }, [firstMessage, char, previous_message]);

  const handleSend = async (text: string) => {
    if (!user || !char || !chatID) return;

    const userMessage: Message = {
      name: user.name ?? "User",
      text,
      icon: user.icon ?? "",
      type: "user",
    };

    const assistantMessage: Message = {
      name: char.name ?? "Assistant",
      text: "",
      icon: charIcon,
      type: "assistant",
      isGenerate: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setLoading(true);
    onSend(text);

    try {
      const response = await Utils.post<GenerateResponse>("/api/Generate", {
        Type: "Generate",
        ConversationId: chatID,
        Message: { User: text },
        Engine: "Mango Ube",
      });

      if (!response?.data?.content) throw new Error("No valid response from API");

      const messageText = response.data.content;
      const firstId = response.id?.[0];
      const charId = firstId?.charMessageUuid ?? null;
      const userId = firstId?.userMessageUuid ?? null;
      if (charId && userId) messageIdRef.current = { charId, userId };

      setMessages((prev) =>
        prev.map((msg) => (msg.isGenerate ? { ...msg, text: messageText, isGenerate: false } : msg))
      );
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense fallback={<div className="text-white">Loading chat...</div>}>
      <ChatMain
        user={user}
        char={char}
        isDesktop={isDesktop}
        previous_message={messages}
        isGenerating={loading}
        messageIdRef={messageIdRef}
        messagesEndRef={messagesEndRef}
        handleSend={handleSend}
        firstMessage={firstMessage}
        onSend={onSend}
      />
    </Suspense>
  );
}
