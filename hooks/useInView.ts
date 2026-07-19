import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a boolean that flips to true once the element enters the
 * viewport. On mobile (<768 px) or when prefers-reduced-motion is set, returns
 * true immediately so sections are never hidden on fast-flick mobile scrolling.
 */
export function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);

  // Initialise to true on mobile / reduced-motion so the first render is
  // already visible — no observer needed, no blank-frame risk.
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.innerWidth < 768) return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return false;
  });

  useEffect(() => {
    if (inView) return; // already revealed — skip observer

    const el = ref.current;
    if (!el) return;

    // Already in viewport on mount — reveal immediately, skip observer.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
