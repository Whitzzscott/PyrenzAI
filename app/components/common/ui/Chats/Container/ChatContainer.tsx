import { useEffect, useRef, useState, Suspense, useCallback } from "react";
import { useParams } from "@remix-run/react";
import { useChatStore } from "~/store/ChatStore";
import { ChatMain } from "~/components";
import {
  Message,
  ChatContainerProps,
  GenerateResponse,
} from "~/components/types/chatTypes";
import { Utils } from "~/Utility/Utility";

export default function ChatContainer({
  user,
  char,
  firstMessage,
  onSend,
  previous_message = [],
  className = "",
}: ChatContainerProps & { previous_message?: Message[]; className?: string }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatID } = useParams<{ chatID: string }>();
  const messageIdRef = useRef<{
    charId: string | null;
    userId: string | null;
  } | null>(null);
  const [charIcon, setCharIcon] = useState<string>(char?.icon ?? "");
  const { messages, setMessages } = useChatStore();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    if (!char?.icon || charIcon === char.icon) return;
    const img = new Image();
    img.src = char.icon;
    img.onload = () => setCharIcon(char.icon || "");
    img.onerror = () => setCharIcon("");
  }, [char?.icon, charIcon]);

  useEffect(() => {
    if (char && firstMessage && messages.length === 0) {
      setMessages([
        {
          name: char.name ?? "Unknown",
          text: firstMessage,
          icon: char.icon ?? "",
          type: "assistant",
        },
        ...previous_message,
      ]);
    }
  }, [char, firstMessage, previous_message, setMessages, messages.length]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!user || !char || !chatID) return;
      const userMessage: Message = {
        name: user.name,
        text,
        icon: user.icon,
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
      onSend(text);
      setIsGenerating(true);
      try {
        const response = await Utils.post<GenerateResponse>("/api/Generate", {
          Type: "Generate",
          ConversationId: chatID,
          Message: { User: text },
          Engine: "Mango Ube",
          characterImageUrl: charIcon,
        });
        if (!response?.data?.content)
          throw new Error("No valid response from API");
        const messageText = response.data.content;
        const firstId = response.id?.[0] ?? {};
        messageIdRef.current = {
          charId: firstId.charMessageUuid ?? null,
          userId: firstId.userMessageUuid ?? null,
        };
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsGenerating(false);
      }
    },
    [user, char, chatID, charIcon, setMessages, onSend],
  );

  return (
    <Suspense fallback={<div className="text-white">Loading chat...</div>}>
      <div
        className={`flex justify-center items-center w-full h-full ${className}`}
      >
        <ChatMain
          user={user}
          char={char}
          previous_message={messages}
          isGenerating={isGenerating}
          messageIdRef={messageIdRef}
          messagesEndRef={messagesEndRef}
          handleSend={handleSend}
          firstMessage={firstMessage}
          onSend={onSend}
        />
      </div>
    </Suspense>
  );
}
