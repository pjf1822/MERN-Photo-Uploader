import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = false;
  if (auth === undefined) return "loading";

  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
