import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import RootPage from "../page/RootPage";
import Login from "../components/Login";
import Profile from "../page/Profile";

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
          {
            path: "/profile",
            element: <Profile />,
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
