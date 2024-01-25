import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { Product, OrderProduct } from "../Types.ts";
import { addOneToOrderProduct, addProductToCart, removeOneToOrderProduct } from "../store/slices/mainSlice.ts";

const useCart = () => {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  const findOrderByProduct = (product: Product) => {
    return state.cart.findIndex((orderProduct) => {
      if (product.modifiers.length !== 0) {
        const modifiers = Array.from(product.modifiers);
        modifiers.sort((a, b) => {
          return a.price - b.price;
        });
        const activeModifier = modifiers[0].id;
        return orderProduct.product.id === product.id && orderProduct.active_modifier === activeModifier
      } else {
        return orderProduct.product.id === product.id && !orderProduct.active_modifier
      }
    })
  }

  const getProductById = (id: number) => {
    let main_product: Product | null = null;
    for (const category of state.categories) {
      for (const product of category.products) {
        if (product.id === id) {
          main_product = product;
        }
      }
    }
    return main_product;
  };

  const addOneProductToCart = (product: Product) => {
    const orderProduct: OrderProduct = {
      product: product,
      active_modifier: null,
      additions: [],
      amount: 1,
      client_comment: "",
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
    const indexOfOrderProduct = findOrderByProduct(product)
    dispatch(addOneToOrderProduct(indexOfOrderProduct))
  }

  const decreaseProduct = (product: Product) => {
    const indexOfOrderProduct = findOrderByProduct(product)
    dispatch(removeOneToOrderProduct(indexOfOrderProduct))
  }

  const countProductInCart = (product_id: number) => {
    let count = 0;
    let types_count = 0;
    for (const orderProduct of state.cart) {
      if (orderProduct.product.id === product_id) {
        count += orderProduct.amount;
        types_count += 1;
      }
    }
    return [count, types_count];
  };

  return {
    getProductById,
    addOneProductToCart,
    countProductInCart,
    increaseProduct,
    decreaseProduct
  };
};

export default useCart;
