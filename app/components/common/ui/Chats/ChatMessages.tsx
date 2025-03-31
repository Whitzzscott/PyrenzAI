import React, { useState, useEffect } from "react";
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
  is_generating: boolean;
  isDesktop?: boolean;
  messageId?: string | null;
  token?: number | null;
  role?: string | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  previous_message,
  is_generating,
  isDesktop = false,
  messageId,
  token,
  role,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="text-gray-400 text-center">Loading messages...</div>;
  }

  return (
    <div className="space-y-4 p-4 max-w-2xl mx-auto">
      {previous_message.map((msg, index) => {
        const isUser = msg.type === "user";
        const displayName = isUser ? msg.user_name : msg.char_name || msg.name || "Unknown";

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

            <div className={`max-w-md p-3 rounded-lg shadow-md ${isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}>
              <span className="block font-semibold">{displayName}</span>
              <CustomMarkdown text={msg.text} char={msg.char_name || "Unknown"} user={msg.user_name || "User"} />
            </div>

            {isUser && msg.icon && <img src={msg.icon} alt={displayName} className="w-8 h-8 rounded-full ml-3" />}
          </div>
        );
      })}

      {/* ✅ Show Typing Indicator when `is_generating` */}
      {is_generating && (
        <div className="flex items-start justify-start">
          <div className="max-w-md p-3 rounded-lg shadow-md bg-gray-700 text-white">
            <TypingIndicator />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
