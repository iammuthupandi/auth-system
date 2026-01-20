import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/access-denied" />;
  return children;
}
