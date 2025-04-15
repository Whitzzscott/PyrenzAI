import { Utils } from "~/Utility/Utility";
import { Character, Message } from "~/components/types/chatTypes";

export const fetchChatData = async (chatID: string, characterId?: string) => {
  try {
    const payload = {
      type: "getchatid",
      chatID,
      ...(characterId && { characterId }),
    };

    const { character } = await Utils.post<{ character: Character }>(
      "/api/GetChatId",
      payload,
    );

    if (!character) throw new Error("Character not found");

    const { messages: fetchedMessages } = await Utils.post<{ messages: any[] }>(
      "/api/GetMessages",
      { chatID },
    );

    const formattedMessages = fetchedMessages.flatMap((msg) => {
      return [
        msg.user_message
          ? { name: "User", text: msg.user_message, icon: "", type: "user" }
          : null,
        msg.ai_message
          ? {
              name: character.name || "Assistant",
              text: msg.ai_message,
              icon: character.image_url,
              type: "assistant",
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
