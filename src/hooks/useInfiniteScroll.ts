import { useEffect, useRef, useState, MutableRefObject } from "react";

interface InfiniteScrollOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  disabled?: boolean;
}

export function useInfiniteScroll(
  callback: () => void,
  options: InfiniteScrollOptions = {}
): MutableRefObject<HTMLDivElement | null> {
  const { root = null, rootMargin = "0px", threshold = 0, disabled = false } = options;
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isObserving, setIsObserving] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);
    setIsObserving(true);

    return () => {
      observer.disconnect();
      setIsObserving(false);
    };
  }, [callback, root, rootMargin, threshold, disabled]);

  return sentinelRef;
}
