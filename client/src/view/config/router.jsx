import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import RootPage from "../page/RootPage";
import Login from "../components/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    //errorElement: //<ErrorPage />,
    children: [
      {
        element: <ProtectedRoute redirectPath="/login" />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
