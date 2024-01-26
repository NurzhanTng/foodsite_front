import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { Product, OrderProduct } from "../Types.ts";
import {
  addOneToOrderProduct,
  addProductToCart,
  removeOneToOrderProduct,
} from "../store/slices/mainSlice.ts";

const useCart = () => {
  const state = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

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
    dispatch(
      addOneToOrderProduct(
        state.cart.findIndex(
          (orderProduct) => orderProduct.product?.id === product.id,
        ),
      ),
    );
  };

  const decreaseProduct = (product: Product) => {
    dispatch(
      removeOneToOrderProduct(
        state.cart.findIndex(
          (orderProduct) => orderProduct.product?.id === product.id,
        ),
      ),
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
    if (orderProduct.product.price === null) {
      if (orderProduct.active_modifier !== null) {
        price =
          orderProduct.product.modifiers[orderProduct.active_modifier].price;
      }
    } else {
      price = orderProduct.product.price;
    }
    console.log(`Price: ${price}`);

    return (
      orderProduct.amount *
      (price +
        orderProduct.additions.reduce(
          (acc, addition) => (acc += addition.price),
          0,
        ))
    );
  };

  return {
    getProductById,
    addOneProductToCart,
    countProductInCart,
    increaseProduct,
    decreaseProduct,
    sumCurrency,
    sumOneOrderProduct,
  };
};

export default useCart;
