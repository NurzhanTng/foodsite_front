import { useCallback, useRef } from "react";

const useScroll = (offset: number = 0) => {
  const ref = useRef<HTMLInputElement>(null);

  const scrollToElement = useCallback((new_offset?: number) => {
    alert("Screen height" + window.screen.height);
    alert("Window height" + window.document.documentElement.scrollHeight);
    setTimeout(() => alert("Screen height" + window.screen.height), 2000);
    setTimeout(
      () =>
        alert("Window height" + window.document.documentElement.scrollHeight),
      2000,
    );
    new_offset = new_offset === undefined ? offset : new_offset;
    // if (ref.current) {
    //   const yOffset =
    //     ref.current.getBoundingClientRect().top -
    //     window.scrollY +
    //     window.innerHeight / 2 -
    //     new_offset;
    //   setTimeout(
    //     () => window.scrollTo({ top: yOffset, behavior: "smooth" }),
    //     2000,
    //   );
    // }
  }, []);

  return { ref, scrollToElement };
};

export default useScroll;
