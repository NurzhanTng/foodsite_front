import { Category } from "../pages/MainPage.tsx";

async function fetchCategories(setCategory: (categories: Category[]) => void) {
  /*
    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_API_BASE_URL + "categories",
        {
          method: "GET",
        },
      );
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
   */
  setCategory([
    {
      id: 0,
      name: "🥘 Основные блюда",
      description:
        "Мы предлагаем вам самые свежие и вкусные блюда, которые точно порадуют вас и ваших близких",
      products: [],
      stop: false,
    },
    {
      id: 1,
      name: "🍔 Бургеры",
      description:
        "Мы предлагаем вам самые сочные и аппетитные гамбургеры, которые вы когда-либо пробовали. Наш секрет - только свежие ингредиенты и мастерство наших поваров.",
      products: [],
      stop: false,
    },
    {
      id: 2,
      name: "🥗 Салаты",
      description:
        "Наши салаты готовятся только перед тем, как они будут поданы на ваш стол",
      products: [],
      stop: false,
    },
    {
      id: 3,
      name: "🍮 Десерты",
      description:
        "Наша команда кондитеров готова предложить вам разнообразные варианты десертов, которые подойдут как для легкого перекуса, так и для особенных праздников.",
      products: [],
      stop: false,
    },
  ]);
}

export default fetchCategories;
