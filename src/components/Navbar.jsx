import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold">💰 Finance Tracker</h1>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-indigo-600 px-3 py-1 rounded text-sm font-medium hover:bg-indigo-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}