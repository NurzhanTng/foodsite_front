import Navigation from "../components/Navigation.tsx";
import MenuCategory from "../components/MenuCategory.tsx";
import useScrollEffect from "../hooks/useScrollEffect.ts";
import { useAppSelector } from "../store/hooks.ts";

function MainPage() {
  const state = useAppSelector((state) => state.main);
  const { categoryRefs } = useScrollEffect();
  console.log('hello')

  return (
    <>
      <Navigation />
      <div className="mt-[90px] w-full px-[10px]">
        {state.categories.map((category) => (
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
