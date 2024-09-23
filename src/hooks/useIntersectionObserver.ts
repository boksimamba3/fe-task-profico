import { useCallback, useRef, useState } from "react";

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const { threshold = 0, rootMargin = "0px" } = options ?? {};

  const nodeRef = useRef<Element | null>(null);
  const rootRef = useRef<Element | Document | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observe = useCallback(() => {
    const node = nodeRef.current;

    if (!node) {
      setEntry(null);
      return;
    }

    const observer = new IntersectionObserver(([e]) => setEntry(e), {
      root: rootRef.current,
      rootMargin,
      threshold,
    });

    observer.observe(node);

    observerRef.current = observer;
  }, [rootMargin, threshold]);

  const unobserve = useCallback(() => {
    const currentObserver = observerRef.current;
    const node = nodeRef.current;

    if (node) {
      currentObserver?.unobserve(node);
    }

    observerRef.current = null;
  }, []);

  const refCb = useCallback<(node: Element | null) => void>(
    (node) => {
      unobserve();
      nodeRef.current = node;
      observe();
    },
    [observe, unobserve],
  );

  const rootRefCb = useCallback<(node: Element | Document | null) => void>(
    (rootNode) => {
      unobserve();
      rootRef.current = rootNode;
      observe();
    },
    [observe, unobserve],
  );

  const isVisible = entry?.isIntersecting ?? false;

  return [refCb, rootRefCb, isVisible] as const;
}
