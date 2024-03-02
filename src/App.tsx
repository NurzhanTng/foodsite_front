import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage.tsx";
import { useEffect } from "react";
import { fetchCategories } from "./store/slices/mainSlice.ts";
import { useAppDispatch } from "./store/hooks.ts";
import CartPage from "./pages/CartPage.tsx";
import CartDishPage from "./pages/CartDishPage.tsx";
import MapTestPage from "./pages/MapTestPage.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPage />,
  },
  {
    path: "/dish/:dishId",
    element: <DishPage />,
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/cartProduct/:product_index',
    element: <CartDishPage />
  },
  {
    path: '/mapTest',
    element: <MapTestPage />
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace={true} />,
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
