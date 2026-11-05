import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/validators';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(form.email),
      password: form.password ? '' : 'Password is required',
    };
    setErrors(newErrors);
    if (newErrors.email || newErrors.password) {
      return toast.error('Please fix the errors in the form');
    }

    setLoading(true);
    try {
      await login(form.email.trim(), form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
      errors[field] ? 'border-red-500 focus:ring-red-300' : 'focus:ring-indigo-400'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white p-6 sm:p-8 rounded-xl shadow w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">Login</h2>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass('email')}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={inputClass('password')}
          />
          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-sm text-center">
          No account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}