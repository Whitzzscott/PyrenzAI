export interface CharacterCardProps {
  id: string;
  name: string;
  description: string;
  creator: string | null;
  chat_messages_count: number;
  image_url: string;
  tags: string[];
  public: boolean;
}
