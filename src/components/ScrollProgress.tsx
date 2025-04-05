import { useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress / 100})`;
      }
      
      if (buttonRef.current) {
        const shouldShow = window.scrollY > 300;
        buttonRef.current.style.opacity = shouldShow ? '1' : '0';
        buttonRef.current.style.pointerEvents = shouldShow ? 'auto' : 'none';
      }
      
      lastScrollY = window.scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    // Initial setup
    if (progressRef.current) {
      progressRef.current.style.transformOrigin = 'left';
      progressRef.current.style.transition = 'transform 0.1s linear';
    }

    if (buttonRef.current) {
      buttonRef.current.style.transition = 'opacity 0.2s ease-in-out';
      buttonRef.current.style.opacity = '0';
      buttonRef.current.style.pointerEvents = 'none';
    }

    // Initial calculation
    updateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-blue-600 w-full"
        />
      </div>
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 z-50"
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default ScrollProgress; 