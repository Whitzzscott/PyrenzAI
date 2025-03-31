import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Utils } from '~/Utility/Utility';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
}: PaginationProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [isLoading, setIsLoading] = useState(false);

  const goToPage = async (page: number) => {
    if (page < 1 || page > totalPages) return;

    setIsLoading(true);
    try {
      const data = await Utils.post('/api/fetchCharacter', {
        type: 'character',
        page: page.toString(),
        maxCharacters: itemsPerPage.toString(),
      });

      console.log('Fetched Data:', data);

      navigate(`?page=${page}&search=${searchQuery}`, { replace: true });
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center gap-2 mt-8'>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={`px-4 py-2 rounded-full transition-all flex items-center justify-center ${
          currentPage === 1
            ? 'bg-gray-700 opacity-50 cursor-not-allowed'
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        const isVisible =
          pageNum === 1 ||
          pageNum === totalPages ||
          Math.abs(pageNum - currentPage) <= 2;

        return isVisible ? (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            disabled={isLoading}
            className={`px-4 py-2 rounded-full transition-all ${
              currentPage === pageNum
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {pageNum}
          </button>
        ) : null;
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={`px-4 py-2 rounded-full transition-all flex items-center justify-center ${
          currentPage === totalPages || isLoading
            ? 'bg-gray-700 opacity-50 cursor-not-allowed'
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
