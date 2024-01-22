import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import fetchCategories from "../utils/fetchCategories.ts";
import { Category } from "../Types.ts";

export type CategoryRefs = {
  [key: string]: HTMLDivElement | null;
};

const useScrollEffect = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories((categories: Category[]) => {
      setCategories(categories);
      setActiveCategory(categories[0].id);
    });
  }, []);

  const categoryRefs: React.MutableRefObject<CategoryRefs> = useRef({});

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  const handleScroll = useCallback(() => {
    for (const category of categories) {
      const element = categoryRefs.current[category.id];
      if (element) {
        const rect = element.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 - 100 &&
          rect.bottom >= window.innerHeight / 2 - 100
        ) {
          setActiveCategory(category.id);
          // console.log(`New active category ${category.id}`);
          break;
        }
      }
    }
  }, [categories, categoryRefs]);

  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 30),
    [handleScroll],
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    categoryRefs,
  };
};

export default useScrollEffect;
