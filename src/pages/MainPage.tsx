import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Navigation from "../components/Navigation.tsx";
import fetchCategories from "../utils/fetchCategories.ts";
import MenuCategory from "../components/MenuCategory.tsx";

export type CategoryRefs = {
  [key: string]: HTMLDivElement | null;
};

export type ProductTypes = {
  name: string;
  price: number;
  stop: boolean;
};

export type Product = {
  id: number;
  name: string;
  image_url: string;
  types: ProductTypes[];
  price: number;
  stop: boolean;
};

export type Category = {
  id: number;
  name: string;
  description: string;
  products: Product[];
  stop: boolean;
};

function MainPage() {
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
          console.log(`New active category ${category.id}`);
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

  return (
    <>
      <Navigation
        activeCategory={activeCategory}
        categories={categories}
        setActiveCategory={setActiveCategory}
      />
      <div className="mx-[10px] mt-[90px] w-full">
        {categories.map((category) => (
          <MenuCategory
            key={category.id}
            category={category}
            categoryRefs={categoryRefs}
          />
        ))}
      </div>
    </>
  );
}

export default MainPage;
