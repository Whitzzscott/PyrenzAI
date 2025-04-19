import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export default function SearchBar({
  search,
  setSearch,
  setCurrentPage,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(search);

  const handleSearch = () => {
    setSearch(inputValue);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      className="relative w-full mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={handleSearch}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <FaSearch />
      </motion.div>
      <motion.input
        type="text"
        placeholder="Search characters..."
        value={inputValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        onKeyDown={handleKeyDown}
        className="w-full p-3 pl-12 border-none rounded-full text-lg bg-gray-800 text-white shadow-lg focus:ring-2 focus:ring-blue-500 outline-none"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
