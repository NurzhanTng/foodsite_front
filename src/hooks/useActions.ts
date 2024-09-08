import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import { Modifiers, Product } from "../utils/Types.ts";
import {
  ProductActions,
  setProductActions,
} from "../store/slices/loyaltySlice.ts";
import useCart from "./useCart.ts";
import currencyFormatter from "../utils/currencyFormatter.ts";

const useActions = () => {
  const loyaltyState = useAppSelector((state) => state.loyalty);
  const categories = useAppSelector((state) => state.main.categories);
  const dispatch = useAppDispatch();
  const { sumOneOrderProduct } = useCart();

  const getActionIdsByProduct = (product: Product, categoryId: number) => {
    return loyaltyState.actions
      .filter((action) => action.can_be_triggered)
      .flatMap((action) =>
        action.triggers.some((trigger) => {
          return (
            trigger.product_id === product.id ||
            trigger.product_ids?.includes(product.id) ||
            trigger.category_id === categoryId ||
            trigger.category_ids?.includes(categoryId)
          );
        })
          ? [action]
          : [],
      );
  };

  const updateProductActions = () => {
    const productActions: ProductActions = categories.reduce(
      (actions, category) => {
        category.products.forEach((product) => {
          const actionList = getActionIdsByProduct(product, category.id);
          if (actionList.length > 0) {
            actions[product.id] = actionList;
          }
        });
        return actions;
      },
      {} as ProductActions,
    );

    dispatch(setProductActions(productActions));
  };

  const getProductModifierPriceByActions = (
    modifier: Modifiers,
    product: Product,
  ) => {
    let price = modifier.price;

    if (isProductHaveActions(product)) {
      const action = loyaltyState.productActions[product.id][0];

      for (const payload of action.payloads) {
        if (payload.new_price) {
          price = payload.new_price;
        } else if (payload.discount_amount) {
          price =
            Math.max(price, payload.discount_amount) - payload.discount_amount;
        } else if (payload.discount_percent) {
          price *= 1 - payload.discount_percent / 100;
        }
      }
    }

    return price;
  };

  const isProductHaveActions = (product: Product) => {
    return product.id in loyaltyState.productActions;
  };

  const getProductPriceByActions = (product: Product) => {
    let productPrice = sumOneOrderProduct({
      product: product,
      price: 0,
      additions: [],
      active_modifier:
        product.price === null ||
        product.price === undefined ||
        product.price === 0 ||
        product.modifiers.length !== 0
          ? product.modifiers[0].id
          : null,
      amount: 1,
      client_comment: "",
    });

    if (isProductHaveActions(product)) {
      const action = loyaltyState.productActions[product.id][0];

      for (const payload of action.payloads) {
        if (payload.new_price) {
          productPrice = payload.new_price;
        } else if (payload.discount_amount) {
          productPrice =
            Math.max(productPrice, payload.discount_amount) -
            payload.discount_amount;
        } else if (payload.discount_percent) {
          productPrice *= 1 - payload.discount_percent / 100;
        }
      }
    }

    return productPrice;
  };

  const getTagTextByAction = (product: Product) => {
    let tagText: string | null = null;
    const productPrice = sumOneOrderProduct({
      product: product,
      price: 0,
      additions: [],
      active_modifier: null,
      amount: 1,
      client_comment: "",
    });

    if (isProductHaveActions(product)) {
      const action = loyaltyState.productActions[product.id][0];

      for (const payload of action.payloads) {
        if (payload.new_price) {
          tagText = `- ${currencyFormatter(productPrice - payload.new_price, product.currency)}`;
        } else if (payload.discount_amount) {
          tagText = `- ${currencyFormatter(payload.discount_amount)}`;
        } else if (payload.discount_percent) {
          tagText = `- ${payload.discount_percent}%`;
        }
      }
    }

    return tagText;
  };

  return {
    updateProductActions,
    getProductPriceByActions,
    isProductHaveActions,
    getTagTextByAction,
    getProductModifierPriceByActions,
  };
};

export default useActions;
