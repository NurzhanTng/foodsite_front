import { useCallback, useRef } from "react";

const useScroll = (offset: number = 0) => {
  const ref = useRef<HTMLInputElement>(null);

  // function alertData(bounding: number) {
  //   console.log(bounding);
  //   alert("Screen height: " + window.screen.height);
  //   alert("Window height: " + window.document.documentElement.scrollHeight);
  //   alert("Visual viewport height: " + window.visualViewport?.height);
  //   alert("2 * window.scrollY: " + 2 * window.scrollY);
  //   alert(
  //     "window.visualViewport?.height / 2: " +
  //       (window.visualViewport?.height
  //         ? window.visualViewport?.height / 2
  //         : 300),
  //   );
  //   alert("ref.current.getBoundingClientRect().top: " + bounding);
  //   alert("offset: " + offset);
  // }

  const scrollToElement = useCallback((new_offset?: number) => {
    function scroll(offset: number) {
      // console.log(offset);
      if (ref.current) {
        // alertData(ref.current.getBoundingClientRect().top);
        const input = ref.current.getBoundingClientRect().top;
        const start = window.scrollY;
        const height = window.visualViewport?.height
          ? window.visualViewport.height
          : window.innerHeight;
        const center = start + height / 2;
        // const difference = input - currentCenter;
        // const newScroll = start - difference;
        const direction = input > center ? 1 : -1;
        const newScroll2 = input + (direction * height) / 2 + offset;

        console.log(input, start, height, center, direction, newScroll2);

        // const yOffset =
        //   window.scrollY +
        //   window.innerHeight -
        //   (window.visualViewport?.height
        //     ? window.visualViewport?.height / 2
        //     : 0) -
        //   ref.current.getBoundingClientRect().top;
        // offset;
        // console.log(newScroll);
        window.scrollTo({ top: start + newScroll2, behavior: "smooth" });
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
