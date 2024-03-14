import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { fetchCategories } from "./store/slices/mainSlice.ts";
import { useAppDispatch } from "./store/hooks.ts";

import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage.tsx";
import CartPage from "./pages/CartPage";
import CartDishPage from "./pages/CartDishPage.tsx";
import MapTestPage from "./pages/MapTestPage.tsx";
import DeliveryPage from "./pages/DeliveryPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ManagerMainPage from "./pages/ManagerMainPage/ui/ManagerMainPage.tsx";

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
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/cartProduct/:product_index",
    element: <CartDishPage />,
  },
  {
    path: "/mapTest",
    element: <MapTestPage />,
  },
  {
    path: "/delivery",
    element: <DeliveryPage />,
  },
  {
    path: "/orders",
    element: <ManagerMainPage />
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
