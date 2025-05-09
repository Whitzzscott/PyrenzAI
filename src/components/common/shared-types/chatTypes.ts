import { MutableRefObject, RefObject } from 'react';

export interface Message {
  name: string;
  text: string;
  id?: string;
  icon: string;
  type: 'user' | 'assistant';
  user_name?: string;
  char_name?: string;
  isGenerate?: boolean;
  isFirst?: boolean;
  token?: number | null;
  role?: string;
  conversation_id?: string;
  error?: boolean;
}

export interface User {
  name: string;
  user_name: string;
  icon: string;
}

export interface Character extends User {
  id: number;
  uuid: string;
  description: string;
  first_message: string;
  profile_image?: string;
  persona?: string;
  scenario?: string;
  gender?: string;
  tags?: string[];
  token_total?: number;
}

export interface ChatContainerProps {
  user: User | null;
  char?: Partial<Character>;
  firstMessage?: string | null;
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
  remainingMessages: number;
}
