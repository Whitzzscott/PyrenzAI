import { useState, useEffect } from "react";

export function useScreenSize(desktopBreakpoint = 1024, mobileBreakpoint = 768) {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateScreenSize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= desktopBreakpoint);
      setIsMobile(width <= mobileBreakpoint);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [desktopBreakpoint, mobileBreakpoint]);

  return {
    isDesktop: isClient ? isDesktop : false,
    isMobile: isClient ? isMobile : false,
  };
}
