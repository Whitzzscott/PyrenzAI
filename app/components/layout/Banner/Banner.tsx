import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "~/components";
import backgroundtree from "../../../Assets/Images/BackgroundTree.png";

export default function Banner() {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Pyrenz Ai";
  const typingSpeed = 80;
  const resetTime = 3000;

  const getRandomChar = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  useEffect(() => {
    let index = 0;
    let typingTimeout: NodeJS.Timeout;
    let restartTimeout: NodeJS.Timeout;

    const typeText = () => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev.slice(0, -1) + getRandomChar());

        setTimeout(() => {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
          typingTimeout = setTimeout(typeText, typingSpeed);
        }, typingSpeed / 2);
      } else {
        restartTimeout = setTimeout(startTyping, resetTime);
      }
    };

    const startTyping = () => {
      index = 0;
      setDisplayedText("");
      setTimeout(typeText, 800);
    };

    typeText();

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(restartTimeout);
    };
  }, []);

  useEffect(() => {
    const cursorBlink = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <motion.div
      className="p-4 rounded-3xl mb-4 text-center flex justify-center items-center h-[140px] font-[Baloo_Da_2] text-white border-none relative"
      style={{
        backgroundImage: `url(${backgroundtree})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold relative z-10">
        {displayedText}
        <motion.span
          className="ml-1"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "loop" }}
        >
          |
        </motion.span>
      </h1>
    </motion.div>
  );
}
