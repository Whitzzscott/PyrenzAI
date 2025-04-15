import { motion } from "framer-motion";
import { Settings, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SettingsSidebar } from "~/components";

interface ChatbarProps {
  profilePic: string;
  safeName: string;
  setSettingsOpen: (open: boolean) => void;
  className?: string;
}

export default function Chatbar({
  profilePic,
  safeName,
  setSettingsOpen,
  className = "",
}: ChatbarProps) {
  const navigate = useNavigate();
  const [settingsOpen, setLocalSettingsOpen] = useState(false);

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    setLocalSettingsOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`w-full fixed top-0 left-0 px-4 py-2 bg-gray-900 flex items-center justify-between shadow-lg border-b border-gray-700 z-[999] pointer-events-auto ${className}`}
        style={{ height: "56px" }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => navigate("/Home")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1"
          >
            <ChevronLeft size={22} className="text-gray-300" />
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={profilePic}
              alt={safeName}
              className="w-10 h-10 rounded-full border-2 border-gray-600 object-cover"
            />
          </motion.div>

          <h1 className="text-base font-semibold text-gray-200 truncate font-baloo">
            {safeName}
          </h1>
        </div>

        {/* Only render settings button on mobile (sm: is for small screens, md: and larger are excluded) */}
        <motion.button
          onClick={handleSettingsOpen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 block sm:hidden"
        >
          <Settings size={20} className="text-gray-300" />
        </motion.button>
      </motion.div>

      {settingsOpen && (
        <SettingsSidebar
          settingsOpen={settingsOpen}
          setSettingsOpen={(open) => {
            setSettingsOpen(open);
            setLocalSettingsOpen(open);
          }}
        />
      )}
    </>
  );
}
