import { useCallback, useEffect, useSyncExternalStore } from "react";

function getLocalStorageItem(key: string): string | null {
  return window.localStorage.getItem(key);
}

function removeLocalStorageItem(key: string): void {
  window.localStorage.removeItem(key);
}

function setLocalStorageItem(key: string, value: unknown): void {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
}

function localStorageSubscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const store = useSyncExternalStore(
    localStorageSubscribe,
    () => getLocalStorageItem(key),
    () => {
      throw Error("useLocalStorage is not supported in this environment");
    },
  );

  const setState = useCallback<(value: T) => void>(
    (v) => {
      try {
        const nextState = typeof v === "function" ? v(JSON.parse(store!)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [key, store],
  );

  useEffect(() => {
    if (getLocalStorageItem(key) === null && typeof initialValue !== "undefined") {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
