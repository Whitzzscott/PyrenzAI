import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  Sidebar,
  Banner,
  SearchBar,
  CharacterCard,
  Pagination,
  Footer,
} from "~/components/Component";
import { Sparkles } from "lucide-react";
import { Utils } from "~/Utility/Utility";
import { CustomButton } from "../components/Component";
import { SkeletonCard } from "../components/Component";
import { useScreenSize } from "~/components/hooks/useScreenSize";

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
  const [isClient, setIsClient] = useState(false);
  const { isMobile } = useScreenSize(); 
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("page")) || 1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const body = {
        type: "character",
        page: currentPage.toString(),
        maxCharacters: itemsPerPage.toString(),
        ...(search ? { search } : {}),
      };

      const data = await Utils.post<GetCharactersResponse>("/api/fetchCharacter", body);
      setCharacters(data?.characters || []);
      setTotal(data?.total || 0);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

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
    <div className="flex flex-col bg-[#0F0F0F] min-h-screen text-white font-['Baloo Da 2']">
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
      {isClient && !isMobile && <Footer />}
    </div>
  );
}
