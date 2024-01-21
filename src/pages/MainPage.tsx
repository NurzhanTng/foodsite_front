import Navigation from "../components/Navigation.tsx";
import MenuCategory from "../components/MenuCategory.tsx";
import useMainPage from "../hooks/useMainPage.ts";

function MainPage() {
  const { activeCategory, setActiveCategory, categories, categoryRefs } =
    useMainPage();

  return (
    <>
      <Navigation
        activeCategory={activeCategory}
        categories={categories}
        setActiveCategory={setActiveCategory}
      />
      <div className="mt-[90px] w-full px-[10px]">
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
