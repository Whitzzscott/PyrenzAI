import { useState, useEffect } from 'react';
import { FaDiscord } from 'react-icons/fa';
import { Card, CardContent } from '~/components';
import HoldingGun from '../../../Assets/Images/Mascot-holdingGun.png';

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='flex flex-col items-center space-y-5 mb-8 font-[Fredoka_One]'>
      <Card className='relative w-[90%] max-w-[650px] rounded-2xl overflow-hidden transition-all duration-300 border-none bg-transparent'>
        <CardContent
          className='relative flex flex-col justify-center items-center h-[160px] text-white bg-no-repeat bg-center bg-cover border-none bg-transparent overflow-hidden'
          style={{
            backgroundImage: `url(${HoldingGun})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom -164px',
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        >
          {hovering && (
            <div
              className='absolute w-20 h-20 bg-white opacity-20 rounded-full pointer-events-none transition-all duration-300'
              style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: 'translate(-50%, -50%)',
                filter: 'blur(10px)',
                mixBlendMode: 'overlay',
              }}
            />
          )}
          <h1 className='text-2xl md:text-3xl font-bold relative text-center'>
            Join The Discord Server Or Else...
          </h1>
        </CardContent>
      </Card>

      <a
        href='https://discord.com/invite/yourserver'
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-3 text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:text-blue-400'
      >
        <FaDiscord size={30} />
        Join Discord
      </a>
    </div>
  );
}
