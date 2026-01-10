import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';

const ExpenseListPage = () => {
  const { expenses, deleteExpense, updateExpense } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Education', 'Other'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other'];

  // Filter and sort expenses
  let filteredExpenses = expenses.filter((exp) => {
    const matchesSearch =
      exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || exp.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort expenses
  filteredExpenses = [...filteredExpenses].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'amount-desc':
        return parseFloat(b.amount) - parseFloat(a.amount);
      case 'amount-asc':
        return parseFloat(a.amount) - parseFloat(b.amount);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const handleSaveEdit = () => {
    updateExpense(editingId, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    deleteExpense(id);
    setShowDeleteModal(null);
  };

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-scaleIn">
            <div className="text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Expense?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This action cannot be undone. Are you sure you want to delete this expense?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(showDeleteModal)}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <span className="text-2xl sm:text-3xl">📝</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              Expense List
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage and track expenses
            </p>
          </div>
        </div>
        <Link
          to="/add-expense"
          className="w-full sm:w-auto px-5 py-2.5 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <span className="text-lg">+</span> Add New Expense
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-3xl">📊</p>
            <div className="text-right">
              <p className="text-3xl font-bold">{filteredExpenses.length}</p>
              <p className="text-sm text-blue-100">Total Expenses</p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-br from-red-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-3xl">💸</p>
            <div className="text-right">
              <p className="text-3xl font-bold">${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-red-100">Total Amount</p>
            </div>
          </div>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <p className="text-3xl">💳</p>
            <div className="text-right">
              <p className="text-3xl font-bold">
                ${filteredExpenses.length > 0 ? (totalAmount / filteredExpenses.length).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
              </p>
              <p className="text-sm text-purple-100">Average Expense</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span className="text-lg">🔍</span> Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search expenses..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📁 Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ⬇️ Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table / Card View */}
      {filteredExpenses.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      {editingId === expense.id ? (
                        <>
                          <td className="px-6 py-4">
                            <input
                              type="date"
                              value={editForm.date}
                              onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                              className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="text"
                              value={editForm.description}
                              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                              className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm w-full"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={editForm.category}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                              className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                            >
                              {categories.filter(c => c !== 'All').map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={editForm.paymentMethod}
                              onChange={(e) => setEditForm({ ...editForm, paymentMethod: e.target.value })}
                              className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm"
                            >
                              {paymentMethods.map((method) => (
                                <option key={method} value={method}>{method}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <input
                              type="number"
                              value={editForm.amount}
                              onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                              step="0.01"
                              className="px-2 py-1 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm w-24 text-right"
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={handleSaveEdit}
                              className="text-green-600 hover:text-green-700 mr-3 text-xl"
                              title="Save"
                            >
                              ✅
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-700 text-xl"
                              title="Cancel"
                            >
                              ❌
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {new Date(expense.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                            {expense.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                              {expense.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {expense.paymentMethod}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-red-600 dark:text-red-400">
                            ${parseFloat(expense.amount).toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            <button
                              onClick={() => handleEdit(expense)}
                              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mr-3 text-lg"
                              title="Edit"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(expense.id)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-lg"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3 sm:space-y-4">
            {filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      {expense.description}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    ${parseFloat(expense.amount).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {expense.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-400">
                      {expense.paymentMethod}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(expense.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-12 border border-gray-200 dark:border-slate-700 shadow-xl text-center">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Expenses Found</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchTerm || filterCategory !== 'All'
              ? 'Try adjusting your filters'
              : 'Start tracking your expenses now!'}
          </p>
          <Link
            to="/add-expense"
            className="inline-block px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:scale-105 transition-transform"
          >
            + Add First Expense
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExpenseListPage;
