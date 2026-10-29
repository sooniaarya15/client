import { formatCurrency, formatDate } from '../utils/format';

export default function TransactionList({ transactions, onDelete, loading }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-semibold text-lg mb-3">Transactions</h3>

      {loading ? (
        <p className="text-gray-500 text-center py-6">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No transactions found.</p>
      ) : (
        <ul className="divide-y">
          {transactions.map((t) => (
            <li key={t._id} className="py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium truncate">
                  {t.category}
                  {t.note && <span className="text-gray-500 font-normal"> · {t.note}</span>}
                </p>
                <p className="text-xs text-gray-500">{formatDate(t.date)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </span>
                <button
                  onClick={() => onDelete(t._id)}
                  className="text-gray-400 hover:text-red-600"
                  aria-label="Delete transaction"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}