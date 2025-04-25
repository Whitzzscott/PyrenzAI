import { useState } from 'react';
import {
  FaHome,
  FaCompass,
  FaComments,
  FaDiscord,
  FaBars,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  hideNavbar: boolean;
  setShowLogin: (value: boolean) => void;
  setShowRegister: (value: boolean) => void;
}

export default function Header({
  hideNavbar,
  setShowLogin,
  setShowRegister,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', icon: FaHome, link: '/Home' },
    { name: 'Explore', icon: FaCompass, link: '/Explore' },
    { name: 'Chats', icon: FaComments, link: '/Chats' },
    {
      name: 'Discord',
      icon: FaDiscord,
      link: 'https://discord.com',
      external: true,
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full bg-black bg-opacity-40 p-4 z-50 transition-opacity duration-500 ${
        hideNavbar ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src='/favicon.ico' alt="Pyrenz Logo" className="h-8 w-8" />
          <h1 className="text-2xl font-bold text-white font-baloo-da-2">
            Pyrenz<span className="text-redorange">AI</span>
          </h1>
        </motion.div>

        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map(({ name, icon: Icon, link, external }) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-white font-baloo-da-2 hover:text-[#E03201]"
              onClick={() =>
                external
                  ? window.open(link, '_blank')
                  : (window.location.href = link)
              }
            >
              <Icon size={18} /> {name}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLogin(true)}
            className="text-white font-baloo-da-2 hover:text-[#E03201] transition-all"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRegister(true)}
            className="bg-[#E03201] text-white px-4 py-2 rounded font-baloo-da-2 transition-all hover:bg-[#611600]"
          >
            Sign Up
          </motion.button>
        </div>

        <div className="md:hidden relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            <FaBars />
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 p-2"
              >
                {menuItems.map(({ name, icon: Icon, link, external }) => (
                  <motion.button
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-800 rounded"
                    onClick={() =>
                      external
                        ? window.open(link, '_blank')
                        : (window.location.href = link)
                    }
                  >
                    <Icon className="inline-block mr-2" /> {name}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogin(true)}
                  className="text-white font-baloo-da-2 hover:text-[#E03201] transition-all"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowRegister(true)}
                  className="bg-[#E03201] text-white px-4 py-2 rounded font-baloo-da-2 transition-all hover:bg-[#611600]"
                >
                  Sign Up
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
