import { ALL_CATEGORIES } from '../utils/constants';

export default function Filters({ filters, setFilters }) {
  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const clear = () => setFilters({ type: '', category: '', startDate: '', endDate: '' });

  const input = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400';

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <select name="type" value={filters.type} onChange={handleChange} className={input}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="category" value={filters.category} onChange={handleChange} className={input}>
          <option value="">All categories</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className={input} />
        <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className={input} />
        <button onClick={clear} className="border border-indigo-600 text-indigo-600 rounded px-3 py-2 hover:bg-indigo-50">
          Clear filters
        </button>
      </div>
    </div>
  );
}