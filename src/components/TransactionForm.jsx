import { useState } from 'react';
import toast from 'react-hot-toast';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/constants';
import { todayISO } from '../utils/format';

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    type: 'expense',
    category: EXPENSE_CATEGORIES[0],
    amount: '',
    note: '',
    date: todayISO(),
  });
  const [saving, setSaving] = useState(false);

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      const list = value === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
      setForm({ ...form, type: value, category: list[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return toast.error('Enter a valid amount');
    if (!form.date) return toast.error('Select a date');
    setSaving(true);
    try {
      await onAdd({ ...form, amount: Number(form.amount) });
      setForm({ ...form, amount: '', note: '' });
    } finally {
      setSaving(false);
    }
  };

  const input = 'w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-4 space-y-3">
      <h3 className="font-semibold text-lg">Add Transaction</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <select name="type" value={form.type} onChange={handleChange} className={input}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select name="category" value={form.category} onChange={handleChange} className={input}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          min="0"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className={input}
        />
        <input type="date" name="date" value={form.date} onChange={handleChange} className={input} />
        <input
          type="text"
          name="note"
          placeholder="Note (optional)"
          value={form.note}
          onChange={handleChange}
          className={`${input} sm:col-span-1 lg:col-span-2`}
        />
      </div>
      <button
        disabled={saving}
        className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
      >
        {saving ? 'Saving...' : 'Add'}
      </button>
    </form>
  );
}