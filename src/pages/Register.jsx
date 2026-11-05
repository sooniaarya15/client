import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { validateName, validateEmail, validatePassword } from '../utils/validators';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(newErrors);
    if (newErrors.name || newErrors.email || newErrors.password) {
      return toast.error('Please fix the errors in the form');
    }

    setLoading(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
        <h2 className="text-2xl font-bold text-center text-indigo-600">Create Account</h2>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className={inputClass('name')}
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>

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
          {errors.password ? (
            <p className="text-red-600 text-xs mt-1">{errors.password}</p>
          ) : (
            <p className="text-gray-500 text-xs mt-1">
              Min 8 characters with uppercase, lowercase and a number
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Creating...' : 'Register'}
        </button>
        <p className="text-sm text-center">
          Already registered?{' '}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}