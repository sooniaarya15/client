import { useState } from 'react';
import { formatCurrency } from '../utils/format';

function Card({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-xl sm:text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}

export default function StatsCards({ transactions }) {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const [budget, setBudget] = useState(() => Number(localStorage.getItem('budget')) || 0);
  const percent = budget > 0 ? Math.min((expense / budget) * 100, 100) : 0;
  const over = budget > 0 && expense > budget;

  const handleBudget = (e) => {
    const v = Number(e.target.value) || 0;
    setBudget(v);
    localStorage.setItem('budget', v);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Total Income" value={formatCurrency(income)} color="text-green-600" />
        <Card title="Total Expense" value={formatCurrency(expense)} color="text-red-600" />
        <Card
          title="Balance"
          value={formatCurrency(balance)}
          color={balance >= 0 ? 'text-indigo-600' : 'text-red-600'}
        />
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 className="font-semibold">Budget</h3>
          <input
            type="number"
            min="0"
            placeholder="Set budget (₹)"
            value={budget || ''}
            onChange={handleBudget}
            className="border rounded px-3 py-1 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        {budget > 0 ? (
          <>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${over ? 'bg-red-500' : 'bg-indigo-500'}`}
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className={`text-sm mt-1 ${over ? 'text-red-600' : 'text-gray-600'}`}>
              {formatCurrency(expense)} of {formatCurrency(budget)} spent
              {over && ' – over budget!'}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500">Set a budget to track your spending.</p>
        )}
      </div>
    </div>
  );
}