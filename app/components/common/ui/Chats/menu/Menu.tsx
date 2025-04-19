import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Customization,
  Cosmetic
} from "./MenuItem"

interface MenuProps {
  onClose: () => void;
}

export default function Menu({ onClose }: MenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Cosmetic");
  const [bgImage, setBgImage] = useState<string | null>(null);

  useEffect(() => {
    const savedBg = localStorage.getItem("bgImage");
    if (savedBg) {
      setBgImage(savedBg);
      applyBackground(savedBg);
    }
  }, []);

  const applyBackground = (imageUrl: string | null) => {
    if (imageUrl) {
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    } else {
      document.body.style.backgroundImage = "none";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-sm relative h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-2 bg-gray-700 rounded-md text-white hover:bg-gray-600 transition duration-200"
            >
              <span>{selectedOption}</span>
              {isDropdownOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="mt-2 bg-gray-700 text-white rounded-md shadow-lg overflow-hidden"
              >
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-600 transition duration-200"
                  onClick={() => {
                    setSelectedOption("Cosmetic");
                    setIsDropdownOpen(false);
                  }}
                >
                  Cosmetic
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-600 transition duration-200"
                  onClick={() => {
                    setSelectedOption("AI Customization");
                    setIsDropdownOpen(false);
                  }}
                >
                  AI Customization
                </button>
              </motion.div>
            )}
          </div>

          {selectedOption === "Cosmetic" && (
            <Cosmetic onBackgroundChange={applyBackground} />
          )}
          {selectedOption === "AI Customization" && (
            <Customization />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
