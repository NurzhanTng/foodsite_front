import { useCallback, useRef } from "react";

const useScroll = (offset: number = 0) => {
  const ref = useRef<HTMLInputElement>(null);

  // function alertData() {
  //   alert("Screen height: " + window.screen.height);
  //   alert("Window height: " + window.document.documentElement.scrollHeight);
  //   alert("Visual viewport height: " + window.visualViewport?.height);
  // }

  const scrollToElement = useCallback((new_offset?: number) => {
    // alertData();
    // setTimeout(() => alertData(), 1000);
    new_offset = new_offset === undefined ? offset : new_offset;
    if (ref.current) {
      const yOffset =
        ref.current.getBoundingClientRect().top -
        window.scrollY +
        (window.visualViewport
          ? window.visualViewport.height / 2
          : window.innerHeight / 2) -
        new_offset;
      setTimeout(
        () => window.scrollTo({ top: yOffset, behavior: "smooth" }),
        1000,
      );
    }
  }, []);

  return { ref, scrollToElement };
};

export default useScroll;
