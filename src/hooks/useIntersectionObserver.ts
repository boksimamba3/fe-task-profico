import { RefObject, useEffect, useState } from "react";

export function useIntersectionObserver(target: RefObject<HTMLElement>, options: IntersectionObserverInit) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!target.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
  }, [target, options]);

  return entry;
}
