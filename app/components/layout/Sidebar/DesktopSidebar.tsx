import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SupportUs from '~/Assets/Images/Support.png';

interface DesktopSidebarProps {
  className?: string;
  profilePic: string;
  safeName: string;
}

export default function DesktopSidebar({ className, profilePic, safeName }: DesktopSidebarProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = profilePic;
    image.onload = () => setIsLoading(false);
  }, [profilePic]);

  return (
    <motion.div
      initial={{ x: '-100%', opacity: 0.8, scale: 0.98 }}
      animate={{ x: 60, opacity: 1, scale: 1 }}
      exit={{ x: '-100%', opacity: 0.8, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed left-0 top-0 h-full w-72 bg-[#111827] shadow-2xl z-20 p-6 flex flex-col space-y-6 ${className}`}
    >
      <div className="flex flex-col items-center">
        <motion.img
          src={profilePic}
          alt="Profile"
          className="mx-auto h-[200px] w-[200px] rounded-md object-cover"
        />
        <span className="text-white mt-4 text-lg font-semibold">{safeName}</span>
      </div>

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
    </motion.div>
  );
}
