import { useNavigate, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { supabase } from "~/Utility/supabaseClient";
import { motion } from "framer-motion";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  user_param_uuid: string;
  onLoadMore: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  user_param_uuid,
  onLoadMore,
}: PaginationProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc("fetch_public_characters", {
        request_type: "character",
        page: currentPage + 1,
        items_per_page: itemsPerPage,
        search_term: searchQuery || null,
        user_param_uuid: user_param_uuid,
      });

      if (error) {
        throw error;
      }

      onLoadMore(currentPage + 1);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <motion.button
        onClick={handleLoadMore}
        disabled={isLoading || currentPage >= totalPages}
        className={`px-4 py-2 rounded-full flex items-center justify-center ${
          isLoading || currentPage >= totalPages
            ? "bg-gray-700 opacity-50 cursor-not-allowed"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
        aria-label="Load more items"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        Load More
      </motion.button>
    </div>
  );
}
