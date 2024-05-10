import { useCallback, useRef } from "react";

const useScroll = (offset: number = 0) => {
  const ref = useRef<HTMLInputElement>(null);

  const scrollToElement = useCallback((new_offset?: number) => {
    function scroll(offset: number) {
      if (ref.current) {
        const input = ref.current.getBoundingClientRect().top;
        const start = window.scrollY;
        const height = window.visualViewport?.height
          ? window.visualViewport.height
          : window.innerHeight;
        // const direction = input > start + height / 2 + offset ? 1 : -1;
        const direction = -1;
        const yOffset = input + (direction * height) / 2 + offset;

        alert(start + yOffset);
        window.scrollTo({ top: start + yOffset, behavior: "smooth" });
      }
    }

    setTimeout(
      () => scroll(new_offset === undefined ? offset : new_offset),
      420,
    );
  }, []);

  return { ref, scrollToElement };
};

export default useScroll;
