import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-gray-600">
          Role: <span className="font-semibold">{user.role}</span>
        </p>
      </div>
    </div>
  );
}
