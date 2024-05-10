import { useCallback, useRef, useState } from "react";

const useScroll = (offset: number = 0) => {
  const ref = useRef<HTMLInputElement>(null);
  const [it, setIt] = useState(0);

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
      }
    }

    setTimeout(
      () => {
        scroll(new_offset === undefined ? offset : new_offset);
        setIt((it) => it + 1);
        setTimeout(() => alert(200 + it * 50), 500);
      },
      200 + it * 50,
    );
  }, []);

  return { ref, scrollToElement };
};

export default useScroll;
