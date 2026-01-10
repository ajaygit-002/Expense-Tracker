import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';

const AddExpensePage = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Cash',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Education', 'Other'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Other'];

  const validate = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please add a description';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      addExpense({
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now(),
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/expenses');
      }, 1500);

      setFormData({
        amount: '',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
        paymentMethod: 'Cash',
        description: '',
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-slideIn flex items-center space-x-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-bold">Success!</p>
            <p className="text-sm">Expense added successfully</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <span className="text-2xl sm:text-3xl">➕</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              Add New Expense
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Track your spending with details
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-slate-700 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              💵 Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg font-semibold">
                $
              </span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                placeholder="0.00"
                className={`w-full pl-10 pr-4 py-4 rounded-2xl border-2 ${
                  errors.amount
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                } bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white text-lg font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <span className="mr-1">⚠️</span> {errors.amount}
              </p>
            )}
          </div>

          {/* Category & Payment Method (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                📋 Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-4 rounded-2xl border-2 ${
                  errors.category
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500'
                } bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold focus:outline-none focus:ring-2 transition-all duration-200`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <span className="mr-1">⚠️</span> {errors.category}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.date
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all duration-200`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <span className="mr-1">⚠️</span> {errors.date}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="What did you spend on?"
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.description
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
              } bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500 flex items-center">
                <span className="mr-1">⚠️</span> {errors.description}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 sm:py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/60 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              💾 Save Expense
            </button>
            <button
              type="button"
              onClick={() => navigate('/expenses')}
              className="sm:flex-none px-6 py-3 sm:py-4 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Tips Card */}
      <div className="mt-8 bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 shadow-lg">
        <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-4 flex items-center text-lg">
          <span className="text-2xl mr-2">💡</span> Pro Tips for Better Tracking
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Be specific in your descriptions for better tracking</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Choose the correct category to see accurate analytics</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Add expenses regularly to maintain accurate records</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddExpensePage;
