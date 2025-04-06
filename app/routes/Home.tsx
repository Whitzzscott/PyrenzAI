import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  Sidebar,
  Banner,
  SearchBar,
  CharacterCard,
  Pagination,
  Footer,
} from "~/components";
import { Sparkles } from "lucide-react";
import { CustomButton, SkeletonCard } from "~/components";
import { useHomeStore } from "~/store/HomeStore"; 
import { supabase } from "~/Utility/supabaseClient"; 

 interface Character {
  id: number;
  name: string;
  description: string;
  creator: string;
  messages: number;
  image_url: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
}

interface GetCharactersResponse {
  characters: Character[];
  total: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    search,
    currentPage,
    characters,
    total,
    loading,
    bgImage,
    setSearch,
    setCurrentPage,
    setCharacters,
    setTotal,
    setLoading,
   } = useHomeStore();  

  const [isClient, setIsClient] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  useEffect(() => {
    setIsClient(true);
    setSearch(searchParams.get("search") || "");
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const fetchCharacters = useCallback(async () => {
    const user_uuid = localStorage.getItem("user_uuid")

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('fetchcharacter', {
        request_type: 'character',
        page: currentPage,
        max_characters: itemsPerPage,
        search_term: search || null,
        user_uuid_param: user_uuid   
      });
      

      if (error) {
        throw error;
      }

      setCharacters(data.characters || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, itemsPerPage]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCharacters();
    }, 300);
    return () => clearTimeout(timeout);
  }, [fetchCharacters]);

  useEffect(() => {
    navigate(`?page=${currentPage}&search=${encodeURIComponent(search)}`, { replace: true });
  }, [currentPage, search, navigate]);
  
  return (
    <div
      className="flex flex-col bg-[#0F0F0F] min-h-screen text-white font-['Baloo Da 2']"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: bgImage ? 'cover' : 'auto',
        backgroundPosition: bgImage ? 'center' : 'unset'
      }}
    >
      <div className="flex flex-1">
        <Sidebar />
        <div className="p-6 flex-1 ml-20 sm:ml-16">
          <Banner />
          <SearchBar search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} />
          <h2 className="text-3xl font-extrabold mt-10 mb-4 text-blue-400 flex items-center">
            <Sparkles size={28} className="mr-2" /> Explore
          </h2>

          <CustomButton />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2">
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)
            ) : characters.length > 0 ? (
              characters.map((char) => (
                <div key={char.id} className="flex justify-center transition-transform hover:scale-105">
                  <CharacterCard {...char} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">No characters found. (˚ ˃̣̣̥⌓˂̣̣̥ )</p>
            )}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} itemsPerPage={itemsPerPage} />
        </div>
      </div>
      {isClient && <Footer />}
    </div>
  );
}
