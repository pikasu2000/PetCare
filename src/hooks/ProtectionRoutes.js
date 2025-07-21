import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectionRoutes = ({ children }) => {
  const isAuthenticated = useSelector((state) => !state.auth.user);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }

  return children;
};

export default ProtectionRoutes;
