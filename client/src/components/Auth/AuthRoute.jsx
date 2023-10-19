import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoute({ allowedRoles }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  return isLoggedIn && allowedRoles.find((myrole) => myrole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to={"/denied"} replace={false} />
  ) : (
    <Navigate to={"/signin"} />
  );
}

export default AuthRoute;
