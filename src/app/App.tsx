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
// import HistoryWrapper from "./context/HistoryWrapper.tsx";
import PhotoPage from "../pages/PhotoPage";
import SearchTestPage from "../pages/SearchTestPage";
import ReceiptPage from "../pages/ReceiptPage/ui/ReceiptPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TransferPage />,
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
    element: <ManagerMainPage />,
  },
  {
    path: "/orders/:order_id",
    element: <OrderPage />,
  },
  {
    path: "/orders/search",
    element: <OrderSearchPage />,
  },
  {
    path: "/active_orders",
    element: <ActiveOrdersPage />,
  },
  {
    path: "/history_orders",
    element: <InactiveOrdersPage />,
  },
  {
    path: "/client_order",
    element: <ClientOrderPage />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/offer",
    element: <OfferPage />,
  },
  {
    path: "/delivery_order/:order_id",
    element: <DeliveryOrderPage />,
  },
  {
    path: "/photo",
    element: <PhotoPage />,
  },
  {
    path: "/search_test",
    element: <SearchTestPage />,
  },
  {
    path: "/receipt",
    element: <ReceiptPage />,
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
