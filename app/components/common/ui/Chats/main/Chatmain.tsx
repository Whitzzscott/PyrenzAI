import React, { useEffect, useState, useRef } from "react";
import { ChatContainerProps } from "~/components/types/chatTypes";
import ChatInput from "../ChatInput";
import Chatbar from "../ChatBar";
import ChatMessages from "../ChatMessages";

export default function ChatMain({
  user,
  char,
  previous_message = [],
  isGenerating,
  messagesEndRef,
  handleSend,
}: ChatContainerProps) {
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const storedBgImage = localStorage.getItem("bgImage");
    if (storedBgImage) {
      handleBackgroundChange(storedBgImage);
    }
  }, []);

  useEffect(() => {
    const scrollWithDelay = () => {
      if (messagesEndRef?.current) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    };

    scrollWithDelay();
  }, [previous_message, messagesEndRef]);

  useEffect(() => {
    if (bgImage) {
      localStorage.setItem("bgImage", bgImage);
    } else {
      localStorage.removeItem("bgImage");
    }
  }, [bgImage]);

  const handleBackgroundChange = (newImageUrl: string | null) => {
    setBgImage(newImageUrl);
  };

  return (
    <div
      className="flex flex-col h-screen text-white p-4 relative w-full justify-center items-center"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: bgImage ? "cover" : "auto",
        backgroundPosition: bgImage ? "center" : "unset",
      }}
    >
      <div className="block sm:hidden w-full">
        <Chatbar
          profilePic={
            char?.icon ||
            `https://api.dicebear.com/9.x/adventurer/svg?seed=${char?.name?.split("@")[0] || "Anon"}`
          }
          safeName={char?.name || "Anon"}
          setSettingsOpen={() => {}}
        />
      </div>

      <div className="flex-1 w-full overflow-y-auto pb-[60px] lg:pb-[80px] xl:pb-[80px] lg:pl-[50px]">
        <ChatMessages
          previous_message={previous_message}
          role="assistant"
          isGenerating={isGenerating}
        />
        <div ref={messagesEndRef}></div>
      </div>

      <div className="w-full bg-[#1e1e1e] sm:relative sm:bg-transparent">
        <ChatInput
          onSend={handleSend}
          user={{
            name: user?.name || "Anon",
            icon:
              user?.icon ||
              `https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name?.split("@")[0] || "Anon"}`,
          }}
          char={{ name: char?.name || "Anon" }}
        />
      </div>
    </div>
  );
}
