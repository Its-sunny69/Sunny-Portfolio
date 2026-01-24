import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClick);
    });

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClick);
    };
  }, [callback]);

  return ref;
};

export default useOutsideClick;