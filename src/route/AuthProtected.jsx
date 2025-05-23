import { useSelector } from "react-redux";
import Login from "../pages/auth/Login";
import { useNavigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const { token } = useSelector((store) => store.Auth);
  const navigate = useNavigate();
  return token ? children : <Login />;
};

export default AuthProtected;
