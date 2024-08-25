import { Category } from "./Types.ts";

async function _fetchCategories() {
  // console.log('fetch categories: ', import.meta.env.VITE_REACT_APP_API_BASE_URL + "food/categories/")
  const response = await fetch(
    import.meta.env.VITE_REACT_APP_API_BASE_URL + "food/categories/",
    {
      method: "GET",
    },
  );
  const categories: Category[] = await response.json();

  for (const category of categories) {
    const response = await fetch(
      import.meta.env.VITE_REACT_APP_API_BASE_URL +
        `food/categories/${category.id}/products/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    category.products = await response.json();
  }

  return categories.filter((category) => category.products.length !== 0);
}

export default _fetchCategories;
