import { AuthProvider } from "./view/context/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./view/config/router";
import { NotificationProvider } from "./view/context/NotificationContext";

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
