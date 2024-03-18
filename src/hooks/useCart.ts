import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { Product, OrderProduct } from "../utils/Types.ts";
import {
  addOneToOrderProduct,
  addProductToCart,
  removeOneToOrderProduct,
  setCart,
  setIsParamsCartUpdated
} from "../store/slices/mainSlice.ts";
import { useState } from "react";

const useCart = () => {
  const state = useAppSelector((state) => state.main);
  const order = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const [showComment, setShowComment] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const usePopup = {
    showComment,
    toggleComment: () => setShowComment(!showComment),
    showTime,
    toggleTime: () => setShowTime(!showTime)
  };

  const handleOrderClick = () => {
    console.log("cart to json", cartToJson());
    if (state.cart.length === 0) return;
    fetch(import.meta.env.VITE_REACT_APP_API_BASE_URL + `food/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: cartToJson()
    })
      .then((data) => {
        // console.log(data.status);
        // console.log(data.json());

        if (data.status >= 200 && data.status < 300) {
          const tg = window.Telegram.WebApp;
          tg.close();
        }
      })
      .catch((err) => console.log("Error: " + err));
  };

  const updateCartFromParams = (params: string | null) => {
    if (state.isParamsCartUpdated) return;
    if (params === null) return;
    if (state.categories.length === 0) return;

    const cart = JSON.parse(params);
    const new_cart: OrderProduct[] = [];

    for (const cartElement of cart) {
      const product = getProductById(cartElement["product_id"]);
      if (product === undefined) continue;

      new_cart.push({
        product: product,
        active_modifier: cartElement["active_modifier"],
        additions: cartElement["additions"].map((addition_id: string) => {
          return product.additions.find(
            (addition) => addition.id === parseInt(addition_id)
          );
        }),
        amount: cartElement["amount"],
        client_comment: ""
      });
    }

    dispatch(setIsParamsCartUpdated(true));
    dispatch(setCart(new_cart));
  };

  const getProductById = (id: number) => {
    for (const category of state.categories) {
      for (const product of category.products) {
        if (product.id === id) {
          return product;
        }
      }
    }
    return;
  };

  const addOneProductToCart = (product: Product) => {
    const orderProduct: OrderProduct = {
      product: product,
      active_modifier: null,
      additions: [],
      amount: 1,
      client_comment: ""
    };

    if (product.modifiers.length !== 0) {
      const modifiers = Array.from(product.modifiers);
      modifiers.sort((a, b) => {
        return a.price - b.price;
      });
      orderProduct.active_modifier = modifiers[0].id;
    }

    dispatch(addProductToCart(orderProduct));
  };

  const increaseProduct = (product: Product) => {
    dispatch(
      addOneToOrderProduct(
        state.cart.findIndex(
          (orderProduct) => orderProduct.product?.id === product.id
        )
      )
    );
  };

  const decreaseProduct = (product: Product) => {
    dispatch(
      removeOneToOrderProduct(
        state.cart.findIndex(
          (orderProduct) => orderProduct.product?.id === product.id
        )
      )
    );
  };

  const countProductInCart = (product_id: number) => {
    let count = 0;
    let types_count = 0;
    for (const orderProduct of state.cart) {
      if (orderProduct.product?.id === product_id) {
        count += orderProduct.amount;
        types_count += 1;
      }
    }
    return [count, types_count];
  };

  const sumCurrency = (orderProducts: OrderProduct[]) => {
    let sum = 0;
    for (const orderProduct of orderProducts) {
      sum += sumOneOrderProduct(orderProduct);
    }
    return sum;
  };

  const sumOneOrderProduct = (orderProduct: OrderProduct) => {
    if (!orderProduct.product) return 0;

    let price = 0;
    if (
      orderProduct.product.price === null ||
      orderProduct.product.price === undefined ||
      orderProduct.product.price === 0 ||
      orderProduct.product.modifiers.length !== 0
    ) {
      if (orderProduct.active_modifier !== null) {
        price =
          orderProduct.product.modifiers.find(
            (modifier) => modifier.id === orderProduct.active_modifier
          )?.price || 0;
      }
    } else {
      price = orderProduct.product.price;
    }

    return (
      orderProduct.amount *
      (price +
        orderProduct.additions.reduce(
          (acc, addition) => (acc += addition.price),
          0
        ))
    );
  };

  const cartToJson = (cart: OrderProduct[] = []) => {
    if (cart.length == 0) cart = state.cart;

    return JSON.stringify({
      products: cart.map((orderProduct) => {
        if (orderProduct.product === undefined) return null;
        return {
          product: getProductById(orderProduct.product.id),
          amount: orderProduct.amount,
          client_comment: "",
          price: sumOneOrderProduct(orderProduct),
          product_id: orderProduct.product.id,
          active_modifier: orderProduct.active_modifier,
          additions: orderProduct.additions.map((addition) => addition.id)
        };
      }).filter((orderProduct) => orderProduct !== null),
      client_id: order.client_id,
      bonus_used: order.bonus_used,
      user_name: order.user_name,
      address: order.address,
      company_id: 1,
      exact_address: order.exactAddress,
      phone: order.phone,
      kaspi_phone: order.kaspi_phone,
      client_comment: order.client_comment,
      actions: []
    });
  };

  const deleteCartProducts = () => {
    dispatch(setCart([]));
  };


  return {
    getProductById,
    addOneProductToCart,
    countProductInCart,
    increaseProduct,
    decreaseProduct,
    sumCurrency,
    sumOneOrderProduct,
    cartToJson,
    updateCartFromParams,
    deleteCartProducts,
    handleOrderClick,

    usePopup
  };
};

export default useCart;
