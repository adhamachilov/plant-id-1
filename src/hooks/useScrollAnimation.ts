import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  delay?: number;
}

const useScrollAnimation = ({ threshold = 0.1, delay = 0 }: ScrollAnimationOptions = {}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay for staggered animations
          setTimeout(() => {
            setVisible(true);
          }, delay * 1000);
          
          // Once visible, disconnect the observer
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Clean up
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold]);

  return { ref, visible };
};

export default useScrollAnimation;
