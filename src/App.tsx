import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import DishPage from "./pages/DishPage.tsx";

// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
// library.add(faCheckSquare, faCoffee);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/dish/:dishId",
    element: <DishPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace={true} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
