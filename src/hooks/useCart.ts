import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import { OrderProduct, Product } from "../utils/Types.ts";
import {
  addOneToOrderProduct,
  addProductToCart,
  clearState as mainSliceClear,
  removeOneToOrderProduct,
  setCart,
  setErrors,
  setErrorText,
  setIsParamsCartUpdated,
} from "../store/slices/mainSlice.ts";
import { useState } from "react";
import { clearState as companySliceClear } from "../store/slices/companySlice.ts";
import { clearState as clientOrderSliceClear } from "../store/slices/clientOrderSlice.ts";
import { clearState as managerSliceClear } from "../store/slices/managerSlice.ts";
import { clearState as orderSliceClear } from "../store/slices/orderSlice.ts";
import { deleteAllTimers as timerSliceClear } from "../store/slices/timerSlice.ts";
import { clearState as userSliceClear } from "../store/slices/userSlice.ts";

type CartErrors = {
  cart: boolean;
  name: boolean;
  phone: boolean;
  kaspi_phone: boolean;
  address: boolean;
  time: boolean;
  cost: boolean;
};

const useCart = () => {
  const state = useAppSelector((state) => state.main);
  const order = useAppSelector((state) => state.order);
  const actions = useAppSelector((state) => state.loyalty.orderActions);
  const dispatch = useAppDispatch();
  const [showComment, setShowComment] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [isButtonInactive, setIsButtonInactive] = useState(false);

  const usePopup = {
    showComment,
    toggleComment: () => setShowComment((value) => !value),
    showTime,
    toggleTime: () => setShowTime((value) => !value),
  };

  const isMargaritaAdded = (): boolean => {
    for (const cartElement of state.cart) {
      if (
        cartElement.price === 0 &&
        cartElement.product?.id === 1 &&
        cartElement.usedAction === undefined
      ) {
        return true;
      }
    }
    return false;
  };

  const scrollByElementId = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
  };

  type handleErrorsTypes = {
    cart?: boolean;
    name?: boolean;
    phone?: boolean;
    kaspi_phone?: boolean;
    address?: boolean;
    time?: boolean;
    cost?: boolean;
  };

  const handleErrors = ({
    cart = false,
    name = false,
    phone = false,
    kaspi_phone = false,
    address = false,
    time = false,
    cost = false,
  }: handleErrorsTypes) => {
    const minCost = actions.some((action) =>
      action.triggers.some((trigger) => trigger.isDelivery !== undefined),
    )
      ? 2000
      : 5000;

    const errors = {
      cart: cart ? false : state.cart.length === 0,
      name: name ? false : order.user_name.length === 0,
      phone: phone ? false : order.phone.length !== 11,
      kaspi_phone: kaspi_phone ? false : order.kaspi_phone.length !== 11,
      // address: !checkIsInPolygon(companies[0].delivery_layers[0].points, [
      //   order.address.long,
      //   order.address.lat,
      // ]),
      address: address
        ? false
        : order.isDelivery
          ? !(
              order.address.long > 0 &&
              order.address.lat > 0 &&
              order.address.parsed !== ""
            )
          : order.company_id === -1,
      time: time ? false : order.done_time === "" || order.done_time === null,
      cost: cost
        ? false
        : sumCurrency(state.cart) < minCost && sumCurrency(state.cart) > 10,
    };
    console.log(
      `handleErrors: ${JSON.stringify(errors)} ${state.cart.reduce((price, product) => price + product.price, 0)}`,
    );

    if (errors.cart) {
      scrollByElementId("cart_input");
    } else if (errors.name) {
      scrollByElementId("name_input");
    } else if (errors.phone) {
      scrollByElementId("phone_input");
    } else if (errors.kaspi_phone) {
      scrollByElementId("kaspi_input");
    } else if (errors.address) {
      scrollByElementId("delivery_input");
    } else if (errors.time) {
      scrollByElementId("time_input");
    }

    dispatch(setErrorText(getErrorText(errors)));
    return errors;
  };

  const handleOrderClick = () => {
    if (isButtonInactive) return;

    const errors = handleErrors({});

    if (
      errors.name ||
      errors.cart ||
      errors.phone ||
      errors.kaspi_phone ||
      errors.address ||
      errors.time ||
      errors.cost
    ) {
      dispatch(setErrors(errors));
      return;
    }

    setIsButtonInactive(true);
    setTimeout(() => {
      setIsButtonInactive(false);
    }, 20000);

    fetch(import.meta.env.VITE_REACT_APP_API_BASE_URL + `food/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: cartToJson(),
    })
      .then(async (data) => {
        if (!(data.status >= 200 && data.status < 300)) return;
        dispatch(mainSliceClear());
        dispatch(companySliceClear());
        dispatch(clientOrderSliceClear());
        dispatch(managerSliceClear());
        dispatch(orderSliceClear());
        dispatch(timerSliceClear());
        dispatch(userSliceClear());
      })
      .then(() => {
        window.location.href = import.meta.env.VITE_REACT_APP_API_BOT_URL;
      })
      .catch((err) => console.log("Error: " + err));
  };

  const getErrorText = (errors: CartErrors) => {
    const minCost = actions.some((action) =>
      action.triggers.some((trigger) => trigger.isDelivery !== undefined),
    )
      ? 3000
      : 5000;

    if (errors.cart) return "Корзина не может быть пустой";
    if (errors.name) return "Имя не может быть пустым";
    if (errors.phone) return "Введите корректный номер телефона";
    if (errors.kaspi_phone) return "Введите корректный номер каспи";
    if (errors.address) return "Необходимо указать правильный адрес";
    if (errors.address) return "Необходимо указать время";
    if (errors.cost) return `Минимальная сумма заказа ${minCost}тг`;
    return "";
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
            (addition) => addition.id === parseInt(addition_id),
          );
        }),
        price: cartElement["price"],
        amount: cartElement["amount"],
        client_comment: "",
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

  const addOneProductToCart = (
    product: Product,
    price: number | null = null,
  ) => {
    const orderProduct: OrderProduct = {
      product: product,
      active_modifier: null,
      additions: [],
      amount: 1,
      price: 0,
      client_comment: "",
    };

    if (product.modifiers.length !== 0) {
      const modifiers = Array.from(product.modifiers);
      modifiers.sort((a, b) => {
        return a.price - b.price;
      });
      orderProduct.active_modifier = modifiers[0].id;
    }
    orderProduct.price = price ? price : sumOneOrderProduct(orderProduct);

    dispatch(addProductToCart(orderProduct));
  };

  const increaseProduct = (product: Product) => {
    dispatch(
      addOneToOrderProduct(
        state.cart.findIndex(
          (orderProduct) =>
            orderProduct.product?.id === product.id && orderProduct.price !== 0,
        ),
      ),
    );
  };

  const decreaseProduct = (product: Product) => {
    dispatch(
      removeOneToOrderProduct(
        state.cart.findIndex(
          (orderProduct) =>
            orderProduct.product?.id === product.id && orderProduct.price !== 0,
        ),
      ),
    );
  };

  const countProductInCart = (product_id: number) => {
    let count = 0;
    let types_count = 0;
    for (const orderProduct of state.cart) {
      if (orderProduct.product?.id === product_id && orderProduct.price !== 0) {
        count += orderProduct.amount;
        types_count += 1;
      }
    }
    return [count, types_count];
  };

  const sumCurrency = (orderProducts: OrderProduct[]) => {
    let sum = 0;
    for (const orderProduct of orderProducts) {
      // sum += sumOneOrderProduct(orderProduct);
      if (orderProduct.usedAction === undefined) sum += orderProduct.price;
      else
        sum +=
          orderProduct.price === 0
            ? orderProduct.additions.reduce(
                (sum, addition) => sum + addition.price,
                0,
              )
            : orderProduct.price;
    }
    if (!actions) return sum;
    for (const action of actions) {
      if (!action.payloads[0].comboProducts || !action.payloads[0].new_price)
        continue;
      sum +=
        action.payloads[0].comboProducts.length * action.payloads[0].new_price;
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
            (modifier) => modifier.id === orderProduct.active_modifier,
          )?.price || 0;
      }
    } else {
      price = orderProduct.product.price;
    }

    return (
      orderProduct.amount *
      (price +
        orderProduct.additions.reduce(
          (acc, addition) => acc + addition.price,
          0,
        ))
    );
  };

  const cartToJson = (cart: OrderProduct[] = []) => {
    if (cart.length == 0) cart = state.cart;

    return JSON.stringify({
      products: cart
        .map((orderProduct) => {
          if (orderProduct.product === undefined) return null;
          return {
            product: getProductById(orderProduct.product.id),
            amount: orderProduct.amount,
            client_comment: "",
            price: orderProduct.price,
            product_id: orderProduct.product.id,
            active_modifier: orderProduct.active_modifier,
            additions: orderProduct.additions.map((addition) => addition.id),
          };
        })
        .filter((orderProduct) => orderProduct !== null),
      client_id: order.client_id,
      bonus_used: order.bonus_used,
      user_name: order.user_name,
      address: { ...order.address, exact_address: order.exactAddress },
      company_id: order.company_id,
      done_time: order.done_time,
      exact_address: order.exactAddress,
      phone: order.phone,
      kaspi_phone: order.kaspi_phone,
      is_delivery: true,
      client_comment: order.client_comment,
      bonus_amount: Math.min(sumCurrency(state.cart), order.max_bonus),
      delivery_price: order.delivery_amount,
      actions: getOrderActions(),
    });
  };

  const getOrderActions = () => {
    return actions.map((action) => {
      return {
        ...action,
        payloads: action.payloads.map((payload) => {
          return {
            ...payload,
            comboProducts:
              payload.comboProducts &&
              payload.comboProducts.map((comboProduct) =>
                comboProduct.map((product) => product.product?.id),
              ),
          };
        }),
      };
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
    handleErrors,

    isButtonInactive,
    usePopup,
    isMargaritaAdded,
  };
};

export default useCart;
