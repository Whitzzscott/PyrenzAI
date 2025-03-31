import { useState, useEffect } from 'react';
import { Card } from '~/components/Component';
import backgroundtree from '../../../Assets/Images/BackgroundTree.png';

export default function Banner() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Pyrenz Ai';
  const typingSpeed = 80;
  const resetTime = 3000;

  const getRandomChar = () => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
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
      setDisplayedText('');
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

  useEffect(() => {
    const updateCursor = (e: MouseEvent) =>
      setCursorPosition({ x: e.clientX, y: e.clientY });

    document.addEventListener('mousemove', updateCursor);
    return () => document.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <Card
      className='p-4 rounded-3xl mb-4 text-center transition-all duration-300 flex justify-center items-center h-[140px] font-[Baloo_Da_2] text-white border-none relative'
      style={{
        backgroundImage: `url(${backgroundtree})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hovering && (
        <div
          className='absolute w-20 h-20 bg-white opacity-20 rounded-full'
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(10px)',
            mixBlendMode: 'overlay',
          }}
        />
      )}
      <h1 className='text-3xl font-bold relative z-10'>
        {displayedText}
        <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
          |
        </span>
      </h1>
    </Card>
  );
}
