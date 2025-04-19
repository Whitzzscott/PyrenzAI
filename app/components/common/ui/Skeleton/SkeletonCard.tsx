import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SkeletonCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="w-full sm:w-56 min-h-[360px] rounded-xl shadow-lg border border-gray-600 bg-gray-900"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative w-full h-48 bg-gray-700 rounded-t-xl"></div>

      <div className="p-3">
        <div className="h-6 bg-gray-600 w-3/4 mb-2 rounded-md"></div>
        <div className="h-4 bg-gray-600 w-full mb-2 rounded-md"></div>
        <div className="h-4 bg-gray-600 w-2/3 mb-2 rounded-md"></div>

        <div className="mt-3 flex flex-wrap gap-1">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-6 bg-gray-700 w-16 rounded-full"
            ></div>
          ))}
        </div>

        <div className="mt-4 flex items-center text-gray-400 text-xs">
          <div className="h-5 w-12 bg-gray-600 rounded-md"></div>
          <div className="flex items-center ml-auto gap-2">
            <div className="h-5 w-5 bg-gray-600 rounded-full"></div>
            <div className="h-5 w-5 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
