import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { TimerProvider } from "./context/TimerContext.tsx";

import TransferPage from "../pages/TransferPage";
import AviataMain from "../pages/AviataMain";
import CityPage from "../pages/CityPage";
import SightSeeingPage from "../pages/SightSeeingPage";
// import MenuPage from "../pages/MenuPage";
// import DishPage from "../pages/DishPage";
// import CartPage from "../pages/CartPage";
// import CartDishPage from "../pages/CartDishPage";
// import DeliveryPage, { OldDeliveryPage } from "../pages/DeliveryPage";
// import ManagerMainPage from "../pages/ManagerMainPage";
// import OrderPage from "../pages/OrderPage";
// import OrderSearchPage from "../pages/OrderSearchPage";
// import ActiveOrdersPage from "../pages/ActiveOrdersPage";
// import InactiveOrdersPage from "../pages/InactiveOrdersPage";
// import ClientOrderPage from "../pages/ClientOrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TransferPage />,
  },
  {
    path: "/main",
    element: <AviataMain />,
  },
  {
    path: "/city/:city_id",
    element: <CityPage />,
  },
  {
    path: "/sightseeing/:sightseeing_id",
    element: <SightSeeingPage />,
  },
  // {
  //   path: "/menu",
  //   element: <MenuPage />,
  // },
  // {
  //   path: "/dish/:dishId",
  //   element: <DishPage />,
  // },
  // {
  //   path: "/cart",
  //   element: <CartPage />,
  // },
  // {
  //   path: "/cartProduct/:product_index",
  //   element: <CartDishPage />,
  // },
  // {
  //   path: "/delivery",
  //   element: <DeliveryPage />,
  // },
  // {
  //   path: "/orders",
  //   element: <ManagerMainPage />,
  // },
  // {
  //   path: "/orders/:order_id",
  //   element: <OrderPage />,
  // },
  // {
  //   path: "/orders/search",
  //   element: <OrderSearchPage />,
  // },
  // {
  //   path: "/active_orders",
  //   element: <ActiveOrdersPage />,
  // },
  // {
  //   path: "/history_orders",
  //   element: <InactiveOrdersPage />,
  // },
  // {
  //   path: "/client_order",
  //   element: <ClientOrderPage />,
  // },
  // {
  //   path: "/map_test",
  //   element: <OldDeliveryPage />,
  // },
  {
    path: "*",
    element: <Navigate to={"/menu"} replace={true} />,
  },
]);

function App() {
  return (
    <TimerProvider>
      <RouterProvider router={router} />
    </TimerProvider>
  );
}

export default App;
