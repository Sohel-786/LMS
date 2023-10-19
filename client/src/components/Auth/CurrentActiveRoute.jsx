import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function CurrentActiveRoute() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} replace={false} />
  )
}

export default CurrentActiveRoute;
