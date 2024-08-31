import { useAppDispatch, useAppSelector } from "../store/hooks/hooks.ts";
import { Product } from "../utils/Types.ts";
import {
  ProductActions,
  setProductActions,
} from "../store/slices/loyaltySlice.ts";

const useActions = () => {
  const loyaltyState = useAppSelector((state) => state.loyalty);
  const categories = useAppSelector((state) => state.main.categories);
  const dispatch = useAppDispatch();

  const isProductInList = (
    productLists: (number | number[])[] | undefined,
    productId: number,
  ): boolean => {
    if (!productLists) return false;

    return productLists.some((productList) =>
      typeof productList === "number"
        ? productList === productId
        : productList.includes(productId),
    );
  };

  const getActionIdsByProduct = (product: Product, categoryId: number) => {
    return loyaltyState.actions
      .filter((action) => action.can_be_triggered)
      .flatMap((action) =>
        action.triggers.some(
          (trigger) =>
            trigger.product_id === product.id ||
            trigger.product_ids?.includes(product.id) ||
            trigger.category_id === categoryId ||
            trigger.category_ids?.includes(categoryId) ||
            isProductInList(trigger.product_lists, product.id),
        )
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

  return { updateProductActions };
};

export default useActions;
