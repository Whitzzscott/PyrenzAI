import { useState, useEffect } from "react";
import TypingIndicator from "../Indicator/TypingIndicator";
import CustomMarkdown from "../Markdown/CustomMarkdown";

interface Message {
  name: string;
  user_name?: string;
  char_name?: string;
  text: string;
  icon: string;
  type: "user" | "assistant";
  token?: number | null;
  role?: string | null;
}

interface ChatMessagesProps {
  previous_message: Message[];
  isGenerating?: boolean;
  messageId?: string | null;
  token?: number | null;
  role?: string | null;
}

export default function ChatMessages({
  previous_message,
  isGenerating,
  messageId,
  token,
  role,
}: ChatMessagesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !previous_message.length) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 max-w-2xl mx-auto">
      {previous_message.map((msg, index) => {
        const isUser = msg.type === "user";
        const displayName = isUser ? msg.user_name : msg.char_name || msg.name || "Anon";

        return (
          <div
            key={index}
            className={`flex items-start ${isUser ? "justify-end" : "justify-start"}`}
            data-message-id={messageId ?? undefined}
            data-message-token={msg.token ?? token ?? undefined}
            data-role-message={msg.role ?? role ?? undefined}
          >
            {!isUser && msg.icon && (
              <img src={msg.icon} alt={displayName} className="w-8 h-8 rounded-full mr-3" />
            )}

            <div
              className={`flex flex-col max-w-md p-3 rounded-lg shadow-md ${isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}
            >
              {!isGenerating && !isUser && (
                <span className="block font-semibold">{displayName}</span>
              )}

              {isGenerating && !isUser && <TypingIndicator />}

              <CustomMarkdown text={msg.text} char={msg.char_name || "Anon"} user={msg.user_name || "User"} />
            </div>

            {isUser && msg.icon && <img src={msg.icon} alt={displayName} className="w-8 h-8 rounded-full ml-3" />}
          </div>
        );
      })}
    </div>
  );
}
