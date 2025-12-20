import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
