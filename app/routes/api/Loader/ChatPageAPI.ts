import { Utils } from "~/Utility/Utility";
import { Character, Message } from "~/components/types/chatTypes";

export const fetchChatData = async (
  conversation_id: string,
  user_uuid?: string,
  auth_key?: string
) => {
  try {
    if (!conversation_id) {
      throw new Error("conversation_id is required");
    }

    if (!user_uuid || !auth_key) {
      throw new Error("user_uuid and auth_key are required");
    }

    const payload = {
      type: "getchatid",
      conversation_id,
      user_uuid,
      auth_key,
    };

    const { character } = await Utils.post<{ character: Character }>(
      "/api/Chats",
      payload
    );

    if (!character) throw new Error("Character not found");

    const messagesPayload = {
      conversation_id,
      user_uuid,
      auth_key,
    };

    const { messages: fetchedMessages } = await Utils.post<{ messages: any[] }>(
      "/api/GetMessages",
      messagesPayload
    );

    if (!Array.isArray(fetchedMessages)) {
      throw new Error("Invalid messages format");
    }

    const formattedMessages = fetchedMessages.flatMap((msg) => {
      return [
        msg.user_message
          ? { name: "User", text: msg.user_message, icon: "", type: "user", conversation_id }
          : null,
        msg.ai_message
          ? {
              name: character.name || "Assistant",
              text: msg.ai_message,
              icon: character.image_url,
              type: "assistant",
              conversation_id,
            }
          : null,
      ].filter(Boolean) as Message[];
    });

    return {
      character,
      messages: formattedMessages,
      firstMessage: character.first_message,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
