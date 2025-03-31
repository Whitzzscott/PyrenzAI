import { MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '~/components/Component';
import { CharacterCardProps } from '~/components/Types/CharacterCardPropsTypes';
import { CharacterCardModal } from '~/components/Component';

export default function CharacterCard({
  id,
  name,
  description,
  creator,
  messages,
  image_url,
  tags = [],
  upvotes,
}: CharacterCardProps) {
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<CharacterCardProps | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleVote = async () => {
    if (hasLiked) return;
    setHasLiked(true);
    setCurrentUpvotes((prev) => prev + 1);

    await fetch(`/characters/upvote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  };

  const handleCardClick = () => {
    setModalData({
      id,
      name,
      description,
      creator,
      messages,
      image_url,
      tags,
      upvotes,
    });
    setIsModalOpen(true);
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className={`w-full sm:w-56 min-h-[360px] rounded-xl shadow-lg border border-gray-600 bg-gray-900 text-white font-[Baloo_Da_2] overflow-hidden cursor-pointer 
        ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
        transition-all duration-[1500ms] ease-out`}
      >
        <div className='relative w-full h-48'>
          <img
            src={image_url}
            alt={name}
            className='absolute inset-0 w-full h-full object-cover rounded-t-xl'
          />
        </div>

        <CardContent className='p-3'>
          <h2 className='text-lg font-bold truncate'>{name}</h2>
          <span className='text-gray-400 text-xs'>@{creator}</span>

          <p className='mt-2 text-gray-300 text-xs leading-tight line-clamp-4'>
            {description?.length > 120
              ? `${description.substring(0, 120)}...`
              : description || 'No description available.'}
          </p>

          {tags.length > 0 && (
            <div className='mt-3 flex flex-wrap gap-1'>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className='bg-black text-white text-[10px] font-semibold py-1 px-2 rounded-full'
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className='mt-4 flex items-center text-gray-400 text-xs'>
            <div className='flex items-center'>
              <MessageSquare size={14} className='text-white' />
              <span className='font-medium ml-1'>{messages}</span>
            </div>

            <div className='flex items-center ml-auto gap-2'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote();
                }}
                className='flex items-center transition-colors duration-200 hover:text-green-400'
              >
                <ThumbsUp size={16} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${window.location.origin}/characters/${id}`,
                  );
                }}
                className='flex items-center transition-colors duration-200 hover:text-blue-400'
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && modalData && (
        <CharacterCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          character={modalData}
        />
      )}
    </>
  );
}
