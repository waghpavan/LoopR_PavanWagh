export const RecentTransactionsTable = ({ transactions, count = 5 }) => {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, count);

  return (
    <div className="bg-blue-50 rounded-lg shadow-lg p-4 min-w-[340px]">
      <h3 className="text-lg text-blue-700 font-bold mb-3">Recent Transactions</h3>
      <table className="min-w-full">
        <thead>
          <tr className="text-blue-500 text-left border-b border-blue-200">
            <th className="py-2 px-2">Name</th>
            <th className="py-2 px-2">Date</th>
            <th className="py-2 px-2">Amount</th>
            <th className="py-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((tx) => (
            <tr key={tx.id || tx._id} className="hover:bg-blue-100 transition">
              <td className="py-1 px-2 text-blue-900">{tx.user_id}</td>
              <td className="py-1 px-2 text-blue-900">
                {tx.date ? new Date(tx.date).toLocaleDateString() : ""}
              </td>
              <td
                className={`py-1 px-2 font-semibold ${
                  tx.amount > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.amount > 0 ? "+" : ""}
                {tx.amount?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td className="py-1 px-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    tx.status?.toLowerCase() === "paid" ||
                    tx.status?.toLowerCase() === "completed"
                      ? "bg-blue-600 text-white"
                      : tx.status?.toLowerCase() === "pending"
                      ? "bg-yellow-400 text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {tx.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
