import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  if (!user) return null;

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <div className="flex gap-4 font-medium">
        <Link to="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        {user.role === "admin" && (
          <Link to="/users" className="hover:text-blue-600">
            View Users
          </Link>
        )}
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
