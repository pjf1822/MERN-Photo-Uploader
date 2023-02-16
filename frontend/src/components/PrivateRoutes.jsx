import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const PrivateRoutes = () => {
  const { auth } = useAuth();
  console.log(auth, "this is the auth status");
  if (auth === undefined) return "loading";

  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
