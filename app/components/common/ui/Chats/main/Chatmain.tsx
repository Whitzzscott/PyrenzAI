import React from "react";
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
  return (
    <div className="flex flex-col h-screen text-white p-4 relative max-w-[900px] mx-auto w-full">
      <div className="block sm:hidden">
        <Chatbar 
          profilePic={char?.icon || `https://api.dicebear.com/9.x/adventurer/svg?seed=${char?.name?.split('@')[0] || 'Anon'}`} 
          safeName={char?.name || "Anon"} 
          setSettingsOpen={() => {}} 
        />
      </div>

      <div className="flex-1 overflow-y-auto pb-[60px] lg:pb-[80px] xl:pb-[80px]">
        <ChatMessages 
          previous_message={previous_message} 
          role="assistant" 
          isGenerating={isGenerating} 
        />
        <div ref={messagesEndRef}></div>
      </div>

      <div className="w-full fixed bottom-0 left-0 right-0 px-4 bg-[#1e1e1e] sm:relative sm:px-0 sm:bg-transparent">
        <ChatInput 
          onSend={handleSend} 
          user={{ 
            name: user?.name || "Anon", 
            icon: user?.icon || `https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name?.split('@')[0] || 'Anon'}` 
          }} 
        />
      </div>
    </div>
  );
}
