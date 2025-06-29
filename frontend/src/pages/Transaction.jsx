import React, { useEffect, useState } from "react";
import { Appbar } from "../component/Appbar";

const API_URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/transactions/`;
const statusColors = {
  Completed: "bg-blue-600 text-white",
  Pending: "bg-yellow-400 text-black",
  Failed: "bg-red-600 text-white",
};

const columns = [
  { label: "Name", value: "user_id" },
  { label: "Date", value: "date" },
  { label: "Category", value: "category" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status" },
];

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(50);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [sortBy, order]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ sortBy, order, search });
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
      setPage(1);
    } catch (err) {
      setTransactions([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  // CSV Export
  function arrayToCSV(data) {
    if (!data.length) return "";
    const header = columns.map((col) => col.label);
    const csvRows = [
      header.join(","),
      ...data.map((row) =>
        columns
          .map((col) => {
            let val = row[col.value];
            if (col.value === "date" && val)
              val = new Date(val).toLocaleDateString();
            if (typeof val === "string")
              val = `"${val.replace(/"/g, '""')}"`;
            return val ?? "";
          })
          .join(",")
      ),
    ];
    return csvRows.join("\n");
  }

  function downloadCSV() {
    const csv = arrayToCSV(transactions);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  const total = transactions.length;
  const totalPages = perPage === "all" ? 1 : Math.ceil(total / perPage);
  const paginatedTransactions =
    perPage === "all"
      ? transactions
      : transactions.slice((page - 1) * perPage, page * perPage);

  const handlePerPageChange = (e) => {
    setPerPage(e.target.value === "all" ? "all" : Number(e.target.value));
    setPage(1);
  };

  const handlePageChange = (newPage) => setPage(newPage);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <Appbar />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Transactions</h2>

        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download CSV
          </button>

          <form
            className="flex items-center gap-4"
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="px-4 py-2 rounded bg-white text-blue-700 border border-blue-300 w-64 focus:outline-none"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded bg-white text-blue-700 border border-blue-300"
            >
              {columns.map((col) => (
                <option key={col.value} value={col.value}>
                  Sort by {col.label}
                </option>
              ))}
            </select>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="px-3 py-2 rounded bg-white text-blue-700 border border-blue-300"
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-2 ml-auto">
            <label className="text-blue-700">Show</label>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="px-2 py-1 rounded bg-white text-blue-700 border border-blue-300"
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value="all">All</option>
            </select>
            <span className="text-blue-700">per page</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-blue-700 text-left">
                {columns.map((col) => (
                  <th key={col.value} className="py-3 px-4">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center text-blue-700 py-8">
                    Loading...
                  </td>
                </tr>
              ) : paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-blue-700 py-8">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((tx) => (
                  <tr key={tx._id} className="border-b border-blue-100">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <img
                        src={tx.user_profile || "/default-avatar.png"}
                        alt={tx.user_id}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-blue-900">{tx.user_id}</span>
                    </td>
                    <td className="py-3 px-4 text-blue-900">
                      {tx.date ? new Date(tx.date).toLocaleDateString() : ""}
                    </td>
                    <td className="py-3 px-4 text-blue-900">
                      {tx.category || "-"}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        tx.amount > 0 ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : ""}
                      {tx.amount?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          statusColors[tx.status] || "bg-gray-500 text-white"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {perPage !== "all" && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 rounded bg-white text-blue-700 border border-blue-300 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-blue-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 rounded bg-white text-blue-700 border border-blue-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
