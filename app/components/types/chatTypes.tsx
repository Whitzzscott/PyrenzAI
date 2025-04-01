import { MutableRefObject, RefObject } from 'react';

export interface Message {
  name: string;
  text: string;
  icon: string;
  type: "user" | "assistant";
  user_name?: string;
  char_name?: string;
  isGenerate?: boolean;
  isFirst?: boolean;
  token?: number | null;
  role?: string;
}

export interface User {
  name: string;
  user_name: string;
  icon: string;
}

export interface Character extends User {
  id: number;
  image_url: string;
  description: string;
  first_message: string;
}

export interface ChatContainerProps {
  user: User | null;
  char?: Partial<Character>;
  firstMessage: string | null;
  onSend: (message: string) => void;
  previous_message?: Message[];
  isGenerating?: boolean;
  handleSend?: (text: string) => Promise<void>;
  messageIdRef?: MutableRefObject<{
    charId: string | null;
    userId: string | null;
  } | null>;
  messagesEndRef?: RefObject<HTMLDivElement>;
}

export interface GenerateResponse {
  data: {
    role: string;
    content: string;
  };
  Engine: string;
  token: number;
  id: Array<{
    userMessageUuid: string;
    charMessageUuid: string;
  }>;
}
