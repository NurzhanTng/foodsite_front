import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { TimerProvider } from "./context/TimerContext.tsx";

import TransferPage from "../pages/TransferPage";
import MenuPage from "../pages/MenuPage";
import DishPage from "../pages/DishPage";
import CartPage from "../pages/CartPage";
import CartDishPage from "../pages/CartDishPage";
import DeliveryPage from "../pages/DeliveryPage";
import ManagerMainPage from "../pages/ManagerMainPage";
import OrderPage from "../pages/OrderPage";
import OrderSearchPage from "../pages/OrderSearchPage";
import ActiveOrdersPage from "../pages/ActiveOrdersPage";
import InactiveOrdersPage from "../pages/InactiveOrdersPage";
import ClientOrderPage from "../pages/ClientOrderPage";
import PrivacyPolicy from "../pages/PrivacyPolicy/ui/PrivacyPolicy.tsx";
import OfferPage from "../pages/OfferPage/ui/OfferPage.tsx";
import AppThemeProvider from "./context/ThemeProvider.tsx";
import DeliveryOrderPage from "../pages/DeliveryOrderPage/ui/DeliveryOrderPage.tsx";
import HistoryWrapper from "./context/HistoryWrapper.tsx";
import PhotoPage from "../pages/PhotoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <HistoryWrapper>
        <TransferPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/menu",
    element: (
      <HistoryWrapper>
        <MenuPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/dish/:dishId",
    element: (
      <HistoryWrapper>
        <DishPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/cart",
    element: (
      <HistoryWrapper>
        <CartPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/cartProduct/:product_index",
    element: (
      <HistoryWrapper>
        <CartDishPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/delivery",
    element: (
      <HistoryWrapper>
        <DeliveryPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/orders",
    element: (
      <HistoryWrapper>
        <ManagerMainPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/orders/:order_id",
    element: (
      <HistoryWrapper>
        <OrderPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/orders/search",
    element: (
      <HistoryWrapper>
        <OrderSearchPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/active_orders",
    element: (
      <HistoryWrapper>
        <ActiveOrdersPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/history_orders",
    element: (
      <HistoryWrapper>
        <InactiveOrdersPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/client_order",
    element: (
      <HistoryWrapper>
        <ClientOrderPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/privacy",
    element: (
      <HistoryWrapper>
        <PrivacyPolicy />
      </HistoryWrapper>
    ),
  },
  {
    path: "/offer",
    element: (
      <HistoryWrapper>
        <OfferPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/delivery_order/:order_id",
    element: (
      <HistoryWrapper>
        <DeliveryOrderPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "/photo",
    element: (
      <HistoryWrapper>
        <PhotoPage />
      </HistoryWrapper>
    ),
  },
  {
    path: "*",
    element: <Navigate to={"/menu"} replace={true} />,
  },
]);

function App() {
  return (
    <AppThemeProvider>
      <TimerProvider>
        <RouterProvider router={router} />
      </TimerProvider>
    </AppThemeProvider>
  );
}

export default App;
