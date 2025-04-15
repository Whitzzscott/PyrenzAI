import { supabase } from "~/Utility/supabaseClient";
import { Character } from "~/components/types/CharacterProp";

export const fetchCharacters = async (
  currentPage: number,
  itemsPerPage: number,
  search: string,
  user_uuid: string,
): Promise<{ characters: Character[]; total: number }> => {
  try {
    const { data, error } = await supabase.rpc("fetch_public_characters", {
      request_type: "character",
      page: currentPage,
      items_per_page: itemsPerPage,
      search_term: search || null,
      user_param_uuid: user_uuid,
    });

    if (error) {
      throw error;
    }

    if (!data || !data.characters) {
      return {
        characters: [],
        total: 0,
      };
    }

    const formattedCharacters = data.characters.map((char: any) => ({
      id: char.id,
      name: char.name,
      description: char.description,
      creator: char.creator,
      chat_messages_count: char.chat_messages_count,
      image_url: char.profile_image,
      tags: Object.keys(char.tags),
      public: char.is_public,
    }));

    return {
      characters: formattedCharacters,
      total: data.total || 0,
    };
  } catch (error) {
    console.error("Error fetching characters:", error);
    return {
      characters: [],
      total: 0,
    };
  }
};
