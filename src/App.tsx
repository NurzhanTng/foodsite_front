import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import DishPage from "./pages/DishPage.tsx";
import { useEffect } from "react";
import { fetchCategories } from "./store/slices/mainSlice.ts";
import { useAppDispatch } from "./store/hooks.ts";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
