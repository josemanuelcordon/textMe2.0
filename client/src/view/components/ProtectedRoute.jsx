import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ redirectPath }) => {
  const { phone } = useAuth();

  return phone ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
