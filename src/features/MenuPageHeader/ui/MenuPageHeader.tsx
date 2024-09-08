import Header from "../../../entities/Header.tsx";
import useHeader from "../hooks/useHeader.ts";
import Button from "../../../shared/Button.tsx";

const MenuPageHeader = () => {
  const { state, scrollToCategory, mainRef, navRef, combos } = useHeader();

  return (
    <Header myRef={mainRef}>
      <nav
        ref={navRef}
        className="m-0 flex w-max select-none list-none gap-3 p-4"
      >
        {state.categories.map((category) => (
          <Button
            key={category.id}
            id={`${category.name}-link`}
            styleType={
              state.activeCategory === category.id ? "primary" : "secondary"
            }
            className="cursor-default rounded-full px-3 py-2"
            onClick={() => scrollToCategory(category.name)}
            text={category.name}
          />
        ))}
        {combos.length !== 0 && (
          <Button
            key={-1}
            id={`combo-link`}
            styleType={state.activeCategory === -1 ? "primary" : "secondary"}
            className="cursor-default rounded-full px-3 py-2"
            onClick={() => scrollToCategory("Комбо")}
            text={"Комбо"}
          />
        )}
      </nav>
    </Header>
  );
};

export default MenuPageHeader;
