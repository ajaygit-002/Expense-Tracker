import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';

export const TransactionList = () => {
  const {
    transactions,
    deleteTransaction,
    searchTransactions,
    sortTransactions,
    categories
  } = useExpense();

  const { isDark } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingAmount, setEditingAmount] = useState('');

  const getFilteredTransactions = () => {
    let filtered = searchQuery
      ? searchTransactions(searchQuery)
      : transactions;

    if (filterCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === filterCategory);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((t) => t.type === filterType);
    }

    return sortTransactions(sortBy, sortOrder).filter((t) =>
      filtered.some((f) => f.id === t.id)
    );
  };

  const displayTransactions = getFilteredTransactions();

  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditingTitle(transaction.title);
    setEditingAmount(transaction.amount);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle('');
    setEditingAmount('');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`animate-slideUp rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 border ${
      isDark
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-gray-100'
    }`}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        📋 Transaction History
      </h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-105 ${
            isDark
              ? 'bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:ring-purple-500'
              : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500'
          }`}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
            isDark
              ? 'bg-slate-700 border border-slate-600 text-white focus:ring-purple-500'
              : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500'
          }`}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={`px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
            isDark
              ? 'bg-slate-700 border border-slate-600 text-white focus:ring-purple-500'
              : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500'
          }`}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-slate-700 border border-slate-600 text-white focus:ring-purple-500'
                : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500'
            }`}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDark
                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>

      {/* Transaction List */}
      {displayTransactions.length === 0 ? (
        <div className="text-center py-12">
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            📭 No transactions found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className={`w-full text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                <th className={`text-left py-4 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Title
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Category
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Amount
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Type
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Date
                </th>
                <th className={`text-left py-4 px-4 font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {displayTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`border-b transition-all duration-300 hover:scale-x-105 ${
                    isDark
                      ? 'border-slate-700 hover:bg-slate-700/50'
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="py-4 px-4">
                    {editingId === transaction.id ? (
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className={`w-full px-3 py-1 rounded transition-all ${
                          isDark
                            ? 'bg-slate-600 border border-slate-500 text-white'
                            : 'bg-gray-50 border border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      transaction.title
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      isDark
                        ? 'bg-purple-900/40 text-purple-300'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {editingId === transaction.id ? (
                      <input
                        type="number"
                        value={editingAmount}
                        onChange={(e) => setEditingAmount(e.target.value)}
                        step="0.01"
                        className={`w-full px-3 py-1 rounded transition-all ${
                          isDark
                            ? 'bg-slate-600 border border-slate-500 text-white'
                            : 'bg-gray-50 border border-gray-300 text-gray-900'
                        }`}
                      />
                    ) : (
                      <span
                        className={`font-bold text-lg ${
                          transaction.type === 'income'
                            ? isDark ? 'text-green-400' : 'text-green-600'
                            : isDark ? 'text-red-400' : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}$
                        {parseFloat(transaction.amount).toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        transaction.type === 'income'
                          ? isDark ? 'bg-green-900/40 text-green-300' : 'bg-green-100 text-green-800'
                          : isDark ? 'bg-red-900/40 text-red-300' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {transaction.type === 'income' ? '📈 Income' : '📉 Expense'}
                    </span>
                  </td>
                  <td className="py-4 px-4">{formatDate(transaction.date)}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      {editingId === transaction.id ? (
                        <>
                          <button
                            onClick={() => {
                              if (editingTitle && editingAmount) {
                                cancelEdit();
                              }
                            }}
                            className={`font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                              isDark
                                ? 'text-green-400 hover:text-green-300'
                                : 'text-green-600 hover:text-green-800'
                            }`}
                          >
                            ✓ Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className={`font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                              isDark
                                ? 'text-gray-400 hover:text-gray-300'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(transaction)}
                            className={`font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                              isDark
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-blue-600 hover:text-blue-800'
                            }`}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className={`font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                              isDark
                                ? 'text-red-400 hover:text-red-300'
                                : 'text-red-600 hover:text-red-800'
                            }`}
                          >
                            🗑️ Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
