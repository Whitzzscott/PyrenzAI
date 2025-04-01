import { motion, AnimatePresence } from 'framer-motion';
import SupportUs from '~/Assets/Images/Support.png';
import {Persona} from '~/components';

interface SettingsSidebarProps {
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

export default function SettingsSidebar({
  settingsOpen,
  setSettingsOpen,
}: SettingsSidebarProps) {
  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-[#111827] bg-opacity-60 backdrop-blur-lg z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSettingsOpen(false)}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            initial={{ x: '100%', opacity: 0.8, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: '100%', opacity: 0.8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="fixed right-0 top-0 h-full w-72 bg-[#111827] shadow-2xl z-[999] p-6 rounded-l-2xl flex flex-col space-y-6"
          >
            <div className="flex justify-center">
              <motion.img
                src={SupportUs}
                alt="Support Us"
                className="rounded-lg max-w-full h-auto select-none pointer-events-none shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0px 0px 30px rgba(255,255,255,0.2)',
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              />
            </div>

            <div className="flex justify-center mt-8">
              <Persona />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
