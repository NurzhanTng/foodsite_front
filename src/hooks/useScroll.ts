import { useCallback, useRef } from "react";

let it = 0;

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
        const direction = input > start + height / 2 ? 1 : -1;
        const yOffset = input + (direction * height) / 2 + offset;

        window.scrollTo({ top: start + yOffset, behavior: "smooth" });
        setTimeout(() => alert(200 + (it - 1) * 50), 500);
        it = it + 1;
      }
    }

    setTimeout(
      () => scroll(new_offset === undefined ? offset : new_offset),
      200 + it * 50,
    );
  }, []);

  return { ref, scrollToElement };
};

export default useScroll;
