import { useEffect } from "react";

export function useInfiniteScroll(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
}
