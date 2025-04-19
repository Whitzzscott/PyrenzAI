import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaWindows, FaMobileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface DownloadModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function DownloadModal({
  isModalOpen,
  closeModal,
}: DownloadModalProps) {
  const navigate = useNavigate();

  const buttonsConfig = [
    {
      icon: FaGlobe,
      label: "Web",
      link: "/Home",
      className: "w-full border-b-2 border-red-500 pb-4",
      buttonClassName:
        "flex flex-col items-center w-full bg-transparent hover:shadow-glow",
    },
    {
      icon: FaWindows,
      label: "Windows",
      link: "/Windows",
      className: "",
      buttonClassName:
        "flex flex-col items-center bg-black bg-opacity-80 p-3 rounded-lg border-2 border-red-500 w-40 hover:shadow-glow",
    },
    {
      icon: FaMobileAlt,
      label: "Mobile",
      link: "/Mobile",
      className: "",
      buttonClassName:
        "flex flex-col items-center bg-black bg-opacity-80 p-3 rounded-lg border-2 border-red-500 w-40 hover:shadow-glow",
    },
  ];

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-80 p-6 rounded-lg w-96 border-2 border-red-500"
          >
            <div className="grid grid-cols-1 gap-6">
              {buttonsConfig[0] &&
                (() => {
                  const Icon = buttonsConfig[0].icon;
                  return (
                    <div className={buttonsConfig[0].className}>
                      <motion.button
                        onClick={() => navigate(buttonsConfig[0].link)}
                        className={buttonsConfig[0].buttonClassName}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-4xl mb-2 text-white">
                          <Icon />
                        </div>
                        <div className="text-center text-white">
                          {buttonsConfig[0].label}
                        </div>
                      </motion.button>
                    </div>
                  );
                })()}

              <div className="flex flex-row justify-center space-x-4">
                {buttonsConfig.slice(1).map((button, index) => {
                  const Icon = button.icon;
                  return (
                    <motion.button
                      key={index}
                      onClick={() => navigate(button.link)}
                      className={button.buttonClassName}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-2xl mb-2 text-white">
                        <Icon />
                      </div>
                      <div className="text-center text-white">{button.label}</div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                whileHover={{ backgroundColor: "#333" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                X
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
