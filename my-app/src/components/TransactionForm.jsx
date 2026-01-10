import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';

export const TransactionForm = ({ transaction = null, onClose = null }) => {
  const { addTransaction, editTransaction, categories } = useExpense();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState(
    transaction || {
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (transaction?.id) {
      editTransaction(transaction.id, formData);
    } else {
      addTransaction(formData);
    }

    setFormData({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`animate-slideUp rounded-xl shadow-lg p-6 md:p-8 mb-6 transition-all duration-300 border ${
      isDark
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-gray-100'
    }`}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        {transaction ? '✏️ Edit Transaction' : '➕ Add New Transaction'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {/* Title */}
          <div className="transition-all duration-300">
            <label className={`block text-sm font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Grocery Shopping"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-105 ${
                isDark
                  ? `bg-slate-700 border ${errors.title ? 'border-red-500' : 'border-slate-600'} text-white placeholder-gray-400 focus:ring-purple-500`
                  : `bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-300'} text-gray-900 placeholder-gray-500 focus:ring-blue-500`
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2 animate-fadeIn">⚠️ {errors.title}</p>
            )}
          </div>

          {/* Amount */}
          <div className="transition-all duration-300">
            <label className={`block text-sm font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-105 ${
                isDark
                  ? `bg-slate-700 border ${errors.amount ? 'border-red-500' : 'border-slate-600'} text-white placeholder-gray-400 focus:ring-purple-500`
                  : `bg-gray-50 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} text-gray-900 placeholder-gray-500 focus:ring-blue-500`
              }`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-2 animate-fadeIn">⚠️ {errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div className="transition-all duration-300">
            <label className={`block text-sm font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-slate-700 border border-slate-600 text-white focus:ring-purple-500'
                  : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="transition-all duration-300">
            <label className={`block text-sm font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-105 ${
                isDark
                  ? `bg-slate-700 border ${errors.date ? 'border-red-500' : 'border-slate-600'} text-white focus:ring-purple-500`
                  : `bg-gray-50 border ${errors.date ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:ring-blue-500`
              }`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-2 animate-fadeIn">⚠️ {errors.date}</p>
            )}
          </div>

          {/* Type */}
          <div className="transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <label className={`block text-sm font-semibold mb-2 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
                isDark
                  ? 'bg-slate-700 border border-slate-600 text-white focus:ring-purple-500'
                  : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500'
              }`}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-opacity-20 border-gray-400">
          <button
            type="submit"
            className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isDark
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50'
            }`}
          >
            {transaction ? '💾 Update Transaction' : '➕ Add Transaction'}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isDark
                  ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ✕ Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
