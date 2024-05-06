import { AuthProvider } from "./view/context/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./view/config/router";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
