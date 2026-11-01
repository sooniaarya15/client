import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import PieChartCard from '../components/PieChartCard';
import BarChartCard from '../components/BarChartCard';
import Filters from '../components/Filters';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const emptyFilters = { type: '', category: '', startDate: '', endDate: '' };

export default function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const { data } = await api.get('/transactions', { params });
      setTransactions(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = async (payload) => {
    try {
      await api.post('/transactions', payload);
      toast.success('Transaction added');
      fetchTransactions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add');
    }
  };

  const deleteTransaction = async (id) => {
    const previous = transactions;
    setTransactions(transactions.filter((t) => t._id !== id));
    try {
      await api.delete(`/transactions/${id}`);
      toast.success('Transaction deleted');
    } catch (err) {
      setTransactions(previous);
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Hello, {user.name} 👋</h2>

        <StatsCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PieChartCard transactions={transactions} />
          <BarChartCard transactions={transactions} />
        </div>

        <TransactionForm onAdd={addTransaction} />
        <Filters filters={filters} setFilters={setFilters} />
        <TransactionList transactions={transactions} onDelete={deleteTransaction} loading={loading} />
      </div>
    </>
  );
}