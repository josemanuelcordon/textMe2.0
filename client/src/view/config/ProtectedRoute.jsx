import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ redirectPath }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Permitir a los administradores acceder a cualquier ruta que comience con /admin
  if (user && user.role === "ADMIN" && location.pathname.startsWith("/admin")) {
    return <Outlet />;
  }

  // Redirigir a /admin si el usuario es admin pero está intentando acceder a otra ruta no específica de admin
  if (user && user.role === "ADMIN" && location.pathname !== "/admin") {
    return <Navigate to="/admin" replace />;
  }

  // Redirigir a login si no hay usuario
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  // Permitir el acceso a otros usuarios
  return <Outlet />;
};

export default ProtectedRoute;
