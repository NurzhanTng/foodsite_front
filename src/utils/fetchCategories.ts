import { Category } from "../Types.ts";

async function _fetchCategories() {
  /*
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
    const products: Product[] = await response.json();
    for (const i of range(0, products.length)) {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_API_BASE_URL +
          `food/categories/${products[i].id}/products/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        },
      );
      products[i].tags = await response.json();
    }
    category.products = products;
  }

  return categories;
  */

  const data: Category[] = [
    {
      id: 0,
      name: "🥘 Основные блюда",
      description:
        "Мы предлагаем вам самые свежие и вкусные блюда, которые точно порадуют вас и ваших близких",
      products: [
        {
          id: 0,
          category_id: 0,
          image_url:
            "https://eda.yandex.ru/images/3490335/6a1ccf7e5ce90b8e3f1a24ff3b1720ff-680x500.jpeg",
          name: "Свиные ребра в пивной глазури с салатом и соусом Сальса",
          description:
            "Свиные ребра в пивной глазури с салатом и соусом Сальса",
          price: 3300,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [
            {
              tag_name: "🧑‍🍳 Выбор шефа",
              tag_color: "#1B4255",
            },
            {
              tag_name: "🔥 Острое",
              tag_color: "#000000",
            },
          ],
          on_stop: false,
        },
        {
          id: 1,
          category_id: 0,
          image_url:
            "https://lobsterhouse.ru/wp-content/uploads/2/b/3/2b3e420d76050fa1a1cdfe31be639254.jpeg",
          name: "Кальмар в сливочном соусе",
          description: "Кальмар в сливочном соусе",
          price: 3300,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          id: 2,
          category_id: 0,
          image_url:
            "https://sun9-63.userapi.com/zXXNsZm9UcK-w9b9Y_lpWSiN2cHukEOd6vcFGw/fUS2i4QvMpU.jpg",
          name: "Филе утиной грудки с соусом из смородины и пюре батата",
          description: "Филе утиной грудки с соусом из смородины и пюре батата",
          price: 2900,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          category_id: 0,
          id: 3,
          image_url: "https://sludsky.ru/images/prods/big661.jpg",
          name: "Язык с запеченным картофелем",
          description: "Язык с запеченным картофелем",
          price: null,
          currency: "KZT",
          modifiers: [
            {
              id: 0,
              name: "Маленькая порция 300гр",
              price: 3490,
              currency: "KZT",
              on_stop: false,
            },
            {
              id: 1,
              name: "Большая порция 300гр",
              price: 4900,
              currency: "KZT",
              on_stop: false,
            },
          ],
          additions: [
            {
              id: 0,
              name: "Соус тартар",
              price: 350,
              currency: "KZT",
              on_stop: false,
            },
            {
              id: 1,
              name: "Соус чили",
              price: 250,
              currency: "KZT",
              on_stop: false,
            },
          ],
          tags: [],
          on_stop: false,
        },
      ],
    },
    {
      id: 1,
      name: "🍔 Бургеры",
      description:
        "Мы предлагаем вам самые сочные и аппетитные гамбургеры, которые вы когда-либо пробовали. Наш секрет - только свежие ингредиенты и мастерство наших поваров.",
      products: [
        {
          id: 4,
          category_id: 1,
          image_url:
            "http://static.tildacdn.com/tild6664-3432-4462-b938-353731303733/1592584780.jpg",
          name: "Бургер с котлетой из мраморной говядины с томатным джемом",
          description: "",
          price: 2390,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [
            {
              tag_name: "🧑‍🍳 Выбор шефа",
              tag_color: "#1B4255",
            },
          ],
          on_stop: false,
        },
        {
          id: 5,
          category_id: 1,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
      ],
    },
    {
      id: 2,
      name: "🥗 Салаты",
      description:
        "Наши салаты готовятся только перед тем, как они будут поданы на ваш стол",
      products: [
        {
          id: 6,
          category_id: 2,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          id: 7,
          category_id: 2,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          id: 8,
          category_id: 2,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          id: 9,
          category_id: 2,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          id: 10,
          category_id: 2,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          id: 11,
          category_id: 2,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
      ],
    },
    {
      id: 3,
      name: "🍮 Десерты",
      description:
        "Наша команда кондитеров готова предложить вам разнообразные варианты десертов, которые подойдут как для легкого перекуса, так и для особенных праздников.",
      products: [
        {
          id: 12,
          category_id: 3,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
        {
          id: 13,
          category_id: 3,
          image_url:
            "https://s3.amazonaws.com/images.ecwid.com/images/29352200/3360832319.jpg",
          name: "Бургер с куриной котлетой и свежими овощами",
          description: "",
          price: 2090,
          currency: "KZT",
          additions: [],
          modifiers: [],
          tags: [],
          on_stop: false,
        },
      ],
    },
  ];
  return data;
}

export default _fetchCategories;
