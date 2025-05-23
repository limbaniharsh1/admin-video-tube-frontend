import { routeConstants } from "../constants/routes";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import VerifyAdmin from "../pages/auth/VerifyAdmin";

export const authRoutes = [
  {
    PATH: routeConstants.LOGIN,
    COMPONENT: <Login />,
    NAME: "Login",
  },
  {
    PATH: routeConstants.SIGNUP,
    COMPONENT: <SignUp />,
    NAME: "SignUp",
  },
  {
    PATH: routeConstants.VERIFY_ADMIN,
    COMPONENT: <VerifyAdmin />,
    NAME: "VerifyAdmin",
  },
];
