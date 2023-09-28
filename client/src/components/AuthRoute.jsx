import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Denied from "../pages/Denied";

function AuthRoute({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  return isLoggedIn && allowedRoles.find((myrole) => myrole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} />
  ) : (
    <Navigate to={"/signin"} />
  );
}

export default AuthRoute;
