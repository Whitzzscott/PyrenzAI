export interface CharacterCardProps {
  id: number;
  name: string;
  description: string;
  creator: string;
  messages: number;
  image_url: string;
  tags?: string[];
  upvotes: number;
}
