import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/format';

export default function BarChartCard({ transactions }) {
  const map = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!map[key]) map[key] = { key, income: 0, expense: 0 };
    map[key][t.type] += t.amount;
  });

  const data = Object.values(map)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((m) => {
      const [y, mo] = m.key.split('-');
      const label = new Date(y, mo - 1).toLocaleString('en-IN', { month: 'short', year: '2-digit' });
      return { month: label, Income: m.income, Expense: m.expense };
    });

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold text-lg mb-2">Monthly Trends</h3>
      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-16">No data yet.</p>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="Income" fill="#10b981" />
              <Bar dataKey="Expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}