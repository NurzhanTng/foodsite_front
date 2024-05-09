import { useCallback, useRef } from "react";

const useScroll = (offset: number = 0) => {
  const ref = useRef<HTMLInputElement>(null);

  function alertData() {
    alert("Screen height: " + window.screen.height);
    alert("Window height: " + window.document.documentElement.scrollHeight);
    alert("Visual viewport height: " + window.visualViewport?.height);
  }

  const scrollToElement = useCallback((new_offset?: number) => {
    function scroll(offset: number) {
      if (ref.current) {
        alertData();
        const yOffset =
          2 * window.scrollY +
          (window.visualViewport?.height
            ? window.visualViewport?.height / 2
            : 300) -
          ref.current.getBoundingClientRect().top -
          offset;
        window.scrollTo({ top: yOffset, behavior: "smooth" });
      }
    }

    setTimeout(
      () => scroll(new_offset === undefined ? offset : new_offset),
      1000,
    );
  }, []);

  return { ref, scrollToElement };
};

export default useScroll;
