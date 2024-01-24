// import { Category } from "../Types.ts";
//
// async function fetchCategories() {
//   console.log("request");
//   const response = await fetch(
//     import.meta.env.VITE_REACT_APP_API_BASE_URL + "food/categories/",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );
//   console.log(`My response from category: ${await response.json()}`);
//   const categories: Category[] = await response.json();
//
//   console.log("Get categories: ", await response.json());
//
//   for (const category of categories) {
//     const response = await fetch(
//       import.meta.env.VITE_REACT_APP_API_BASE_URL + "get_products_by_category",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category_id: category.id,
//         }),
//       },
//     );
//     category.products = await response.json();
//     console.log(`Get products of category['${category.id}']: ${categories}`);
//   }
//   return categories;
// }
//
// export default fetchCategories();

