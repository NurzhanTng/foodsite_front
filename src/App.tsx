import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchCategories } from "./store/slices/mainSlice.ts";
import { useAppDispatch } from "./store/hooks.ts";

import MenuPage from "./pages/MenuPage";
import DishPage from "./pages/DishPage.tsx";
import CartPage from "./pages/CartPage";
import CartDishPage from "./pages/CartDishPage.tsx";
import DeliveryPage from "./pages/DeliveryPage";
import TransferPage from "./pages/TransferPage";
import ManagerMainPage from "./pages/ManagerMainPage";
import { fetchCompanies } from "./store/slices/companySlice.ts";
import OrderPage from "./pages/OrderPage";
import OrderSearchPage from "./pages/OrderSearchPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <TransferPage />
  },
  {
    path: "/menu",
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
    path: "/delivery",
    element: <DeliveryPage />,
  },
  {
    path: "/orders",
    element: <ManagerMainPage />
  },
  {
    path: "/orders/:order_id",
    element: <OrderPage />
  },
  {
    path: "/orders/search",
    element: <OrderSearchPage />
  },
  {
    path: "*",
    element: <Navigate to={"/menu"} replace={true} />,
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
