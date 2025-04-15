import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

interface PersonaCard {
  id: string;
  name: string;
  description: string;
}

interface PersonaModalProps {
  isOpen: boolean;
  onClose: () => void;
  personaData: PersonaCard[];
  loading: boolean;
  onSelect: (persona: PersonaCard) => void;
}

export default function PersonaModal({
  isOpen,
  onClose,
  personaData,
  loading,
  onSelect,
}: PersonaModalProps) {
  if (!isOpen) return null;

  const truncateDescription = (description: string, limit: number = 100) => {
    return description.length > limit
      ? `${description.slice(0, limit)}...`
      : description;
  };

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <motion.div
        className="bg-gray-800 rounded-lg p-5 w-96"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Personas</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-400 transition"
          >
            <span>&#10005;</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="space-y-4 mt-4">
            {personaData.length > 0 ? (
              personaData.map((persona) => (
                <div key={persona.id} className="bg-gray-700 rounded-lg p-4">
                  <p className="text-lg font-semibold text-white">
                    {persona.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    {truncateDescription(persona.description)}
                  </p>
                  <button
                    onClick={() => onSelect(persona)}
                    className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                  >
                    Select
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-white">
                No persona data available.
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}
