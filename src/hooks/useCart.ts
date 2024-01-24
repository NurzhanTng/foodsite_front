import { useAppSelector } from "../store/hooks.ts";
import { Product } from "../Types.ts";


const useCart = () => {
  const state = useAppSelector((state) => state.main);
  // const dispatch = useAppDispatch();

  const getProductById = (id: number) => {
    let main_product: Product | null = null;
    for (const category of state.categories) {
      for (const product of category.products) {
        if (product.id === id) {
          main_product = product
        }
      }
    }
    return main_product
  }

  const addProductToCart = () => {
    // const OrderProduct: OrderProduct = {
    //   product: product,
    //   modifiers: [],
    //   amount: 1,
    //   active_size: null,
    //   client_comment: ''
    // }
    // dispatch()
  }

  return {
    getProductById,
    addProductToCart
  }
}

export default useCart;