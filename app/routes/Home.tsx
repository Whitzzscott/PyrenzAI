import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "@remix-run/react";
import {
  Sidebar,
  Banner,
  SearchBar,
  CharacterCard,
  LoadMore,
  Footer,
  CustomButton,
  SkeletonCard,
} from "~/components";
import { Sparkles } from "lucide-react";
import { useHomeStore } from "~/store/HomeStore";
import { useUserStore } from "~/store/UserStore";
import { fetchCharacters } from "~/routes/api/Loader/CharacterAPI";

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

  const { user_uuid } = useUserStore();

  const [isClient, setIsClient] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  useEffect(() => {
    setIsClient(true);
    setSearch(searchParams.get("search") || "");
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  const fetchCharactersData = useCallback(async () => {
    if (!user_uuid) {
      console.error("User UUID is null");
      return;
    }
    setLoading(true);
    const { characters, total } = await fetchCharacters(
      currentPage,
      itemsPerPage,
      search,
      user_uuid,
    );
    setCharacters(characters);
    setTotal(total);
    setLoading(false);
  }, [currentPage, search, itemsPerPage, user_uuid]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchCharactersData();
    }, 300);
    return () => clearTimeout(timeout);
  }, [fetchCharactersData]);

  useEffect(() => {
    navigate(`?page=${currentPage}&search=${encodeURIComponent(search)}`, {
      replace: true,
    });
  }, [currentPage, search, navigate]);

  return (
    <div
      className="flex flex-col bg-[#0F0F0F] min-h-screen text-white font-['Baloo Da 2']"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
        backgroundSize: bgImage ? "cover" : "auto",
        backgroundPosition: bgImage ? "center" : "unset",
      }}
      aria-label="Home Page"
    >
      <div className="flex flex-1">
        <div className="hidden sm:block sm:pl-[50px]">
          <Sidebar />
        </div>
        <div className="p-6 flex-1">
          <Banner />
          <SearchBar
            search={search}
            setSearch={setSearch}
            setCurrentPage={setCurrentPage}
            aria-label="Search Characters"
          />
          <h2 className="text-3xl font-extrabold mt-10 mb-4 text-blue-400 flex items-center">
            <Sparkles size={28} className="mr-2" aria-hidden="true" /> Explore
          </h2>

          <CustomButton aria-label="Custom Action Button" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-2">
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => (
                <SkeletonCard
                  key={i}
                  aria-label={`Loading Character ${i + 1}`}
                />
              ))
            ) : characters.length > 0 ? (
              characters.map((char) => (
                <div
                  key={char.id}
                  data-character-id={char.id}
                  className="flex justify-center transition-transform hover:scale-105"
                  aria-labelledby={`character-${char.id}`}
                >
                  <CharacterCard {...char} />
                </div>
              ))
            ) : (
              <p
                className="text-gray-500 text-center w-full"
                aria-live="polite"
              >
                No characters found. (˚ ˃̣̣̥⌓˂̣̣̥ )
              </p>
            )}
          </div>

          <LoadMore
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            user_param_uuid={user_uuid || ""}
            onLoadMore={setCurrentPage}
          />
        </div>
      </div>
      {isClient && <Footer />}
    </div>
  );
}
