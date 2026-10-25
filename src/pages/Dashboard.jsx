import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-semibold">Hello, {user.name} 👋</h2>
      </div>
    </>
  );
}