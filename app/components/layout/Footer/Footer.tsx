import { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import { Card, CardContent } from "~/components";
import HoldingGun from "../../../Assets/Images/Mascot-holdingGun.png";
import { motion } from "framer-motion";

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center space-y-5 mb-8 font-[Fredoka_One]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative w-[90%] max-w-[650px] rounded-2xl overflow-hidden border-none bg-transparent"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <CardContent
          className="relative flex flex-col justify-center items-center h-[160px] text-white bg-no-repeat bg-center bg-cover border-none bg-transparent overflow-hidden"
          style={{
            backgroundImage: `url(${HoldingGun})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom -164px",
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => setMousePosition({ x: e.clientX, y: e.clientY })}
        >
          {hovering && (
            <motion.div
              className="absolute w-20 h-20 bg-white opacity-20 rounded-full pointer-events-none"
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: "translate(-50%, -50%)",
                filter: "blur(10px)",
                mixBlendMode: "overlay",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <h1 className="text-2xl md:text-3xl font-bold relative text-center">
            Join The Discord Server Or Else...
          </h1>
        </CardContent>
      </motion.div>

      <motion.a
        href="https://discord.com/invite/yourserver"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-white text-lg font-semibold"
        whileHover={{ scale: 1.05, color: "#60a5fa" }}
        transition={{ duration: 0.3 }}
      >
        <FaDiscord size={30} />
        Join Discord
      </motion.a>
    </motion.div>
  );
}
