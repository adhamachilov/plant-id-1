import { useState, useEffect, useRef } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  delay?: number;
}

export default function useScrollAnimation({
  threshold = 0.1,
  delay = 0
}: ScrollAnimationOptions = {}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only set visible after delay
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
          }, delay * 1000);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  return { ref, visible };
}
