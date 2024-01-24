import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.tsx";
import useCart from "../hooks/useCart.ts";

function DishPage() {
  const {dishId} = useParams()
  const { getProductById } = useCart()

  if (!dishId) return;
  const product = getProductById(parseInt(dishId))
  if (!product) return;

  return <ProductCard product={product} />;
}

export default DishPage;
