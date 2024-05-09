import { useCallback, useRef } from "react";

const useScroll = (offset: number = 0) => {
  const ref = useRef<HTMLInputElement>(null);

  const scrollToElement = useCallback((new_offset?: number) => {
    new_offset = new_offset === undefined ? offset : new_offset;
    if (ref.current) {
      const yOffset =
        ref.current.getBoundingClientRect().top + window.scrollY - new_offset;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  }, []);

  return { ref, scrollToElement };
};

export default useScroll;
