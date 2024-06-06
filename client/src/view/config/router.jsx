import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import ProtectedRoute from "./ProtectedRoute";
import RootPage from "../page/RootPage";
import Login from "../page/Login";
import Profile from "../page/Profile";
import Register from "../page/Register";
import Admin from "../page/Admin";
import AdminChats from "../page/AdminChats";
import AdminMessages from "../page/AdminMessages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    // errorElement: //<ErrorPage />,
    children: [
      {
        element: <ProtectedRoute redirectPath="/login" />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "admin/chats/:userId",
            element: <AdminChats />,
          },
          {
            path: "admin/chat/:chatId/messages",
            element: <AdminMessages />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
