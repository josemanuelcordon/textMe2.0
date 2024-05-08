import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ redirectPath }) => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
