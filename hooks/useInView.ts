import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a boolean that flips to true once the element enters the
 * viewport. On mobile (<768 px) or when prefers-reduced-motion is set, returns
 * true immediately so sections are never hidden on fast-flick mobile scrolling.
 */
export function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);

  // Always start false so the first client render matches the prerendered HTML
  // (the server has no window). Deciding during render instead would make the
  // client's initial state differ from the server's, and React does not patch
  // mismatched inline styles on hydration, so sections would stay at opacity 0.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return; // already revealed — skip observer

    // Mobile / reduced-motion: reveal immediately, no observer needed.
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

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
