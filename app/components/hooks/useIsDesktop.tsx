import { useState, useEffect } from 'react';

export function useIsDesktop(breakpoint = 1024) {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateScreenSize = () => setIsDesktop(window.innerWidth >= breakpoint);
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [breakpoint]);

  return isClient ? isDesktop : false;
}
