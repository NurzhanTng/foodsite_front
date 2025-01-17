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
import CartPage2 from "../pages/CartPage2";
import CartPage3 from "../pages/CartPage3";
import CartDishPage from "../pages/CartDishPage";
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
import PhotoPage from "../pages/PhotoPage";
import SearchTestPage from "../pages/SearchTestPage";
import ReceiptPage from "../pages/ReceiptPage/ui/ReceiptPage.tsx";
import CookPage from "../pages/CookPage";
import RunnerMainPage from "../pages/RunnerMainPage";
import RedirectPage from "../pages/RedirectPage";
import ComboPage from "../pages/ComboPage";
import ActionPage from "../pages/ActionPage";
import DeliveryPageTest, {
  DeliveryPage as DeliveryPage2,
} from "../pages/NewDeliveryPage";
import KaspiPaymentPage from "../pages/KaspiPaymentPage";
// import HistoryWrapper from "./context/HistoryWrapper.tsx";

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
    path: "/cart2",
    element: <CartPage2 />,
  },
  {
    path: "/cart3",
    element: <CartPage3 />,
  },
  {
    path: "/cartProduct/:product_index",
    element: <CartDishPage />,
  },
  {
    path: "/combo/:action_id",
    element: <ComboPage />,
  },
  {
    path: "/delivery",
    element: <DeliveryPage2 />,
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
    path: "/runner",
    element: <RunnerMainPage />,
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
    path: "/cook",
    element: <CookPage />,
  },
  {
    path: "/redirect2",
    element: <RedirectPage />,
  },
  {
    path: "/redirect",
    element: <RedirectPage />,
  },
  {
    path: "/action/:actionId",
    element: <ActionPage />,
  },
  {
    path: "/testYandex",
    element: <DeliveryPageTest />,
  },
  {
    path: "/kaspiTest",
    element: <KaspiPaymentPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace={true} />,
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
