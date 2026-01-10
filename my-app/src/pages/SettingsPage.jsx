import { useState } from 'react';
import { useExpenses, useTheme, currencies } from '../context/ExpenseContext';

const SettingsPage = () => {
  const { income, setIncome, expenses, clearAllExpenses, currency, setCurrency, getCurrencySymbol, formatAmount } = useExpenses();
  const { theme, toggleTheme } = useTheme();
  const [tempIncome, setTempIncome] = useState(income);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState('');
  const [searchCurrency, setSearchCurrency] = useState('');

  const handleSaveIncome = () => {
    setIncome(parseFloat(tempIncome));
    setShowSuccess('Income updated successfully!');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handleCurrencyChange = (currencyCode) => {
    setCurrency(currencyCode);
    setShowSuccess(`Currency changed to ${currencyCode}!`);
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const filteredCurrencies = currencies.filter(curr => 
    curr.name.toLowerCase().includes(searchCurrency.toLowerCase()) ||
    curr.code.toLowerCase().includes(searchCurrency.toLowerCase()) ||
    curr.country.toLowerCase().includes(searchCurrency.toLowerCase())
  );

  const handleClearData = () => {
    clearAllExpenses();
    setShowClearModal(false);
    setShowSuccess('All data cleared successfully!');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const exportData = () => {
    const data = {
      income,
      expenses,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowSuccess('Data exported successfully!');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const stats = {
    totalExpenses: expenses.length,
    totalAmount: expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0),
    categories: [...new Set(expenses.map(e => e.category))].length,
    oldestExpense: expenses.length > 0 ? new Date(Math.min(...expenses.map(e => new Date(e.date)))).toLocaleDateString() : 'N/A',
    newestExpense: expenses.length > 0 ? new Date(Math.max(...expenses.map(e => new Date(e.date)))).toLocaleDateString() : 'N/A',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-slideIn flex items-center space-x-3">
          <span className="text-2xl">✅</span>
          <p className="font-semibold">{showSuccess}</p>
        </div>
      )}

      {/* Clear Data Modal */}
      {showClearModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Clear All Data?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This will permanently delete all {expenses.length} expenses. This action cannot be undone!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleClearData}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                  Yes, Clear All
                </button>
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Manage preferences and account
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">👤</span> Profile Information
        </h2>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
            U
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">User Account</h3>
            <p className="text-gray-600 dark:text-gray-400">user@example.com</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Income Settings */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">💰</span> Monthly Income
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Set your monthly income for accurate budget tracking
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                  {getCurrencySymbol()}
                </span>
                <input
                  type="number"
                  value={tempIncome}
                  onChange={(e) => setTempIncome(e.target.value)}
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <button
                onClick={handleSaveIncome}
                className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Save
              </button>
            </div>
          </div>

          {/* Currency Selector */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Current Currency: <span className="font-bold">{currencies.find(c => c.code === currency)?.flag} {currency}</span>
            </label>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search country or currency..."
                value={searchCurrency}
                onChange={(e) => setSearchCurrency(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
              {filteredCurrencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr.code)}
                  className={`p-3 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                    currency === curr.code
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{curr.flag}</span>
                        <span className="font-bold text-gray-900 dark:text-white">{curr.code}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{curr.country}</p>
                    </div>
                    <span className="text-xl font-bold text-gray-700 dark:text-gray-300">{curr.symbol}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">🎨</span> Appearance
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Dark Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Toggle between light and dark theme
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
              theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 flex items-center justify-center text-sm ${
                theme === 'dark' ? 'transform translate-x-8' : ''
              }`}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </div>
          </button>
        </div>
      </div>

      {/* Data Statistics */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">📊</span> Data Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalExpenses}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Expenses</p>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
              {formatAmount(stats.totalAmount)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Spent</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.categories}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Categories Used</p>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl col-span-2 md:col-span-1">
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{stats.oldestExpense}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Oldest Record</p>
          </div>
          <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl col-span-2 md:col-span-2">
            <p className="text-lg font-bold text-pink-600 dark:text-pink-400">{stats.newestExpense}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Newest Record</p>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">💾</span> Data Management
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Export Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Download all your expenses as JSON file
              </p>
            </div>
            <button
              onClick={exportData}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
            >
              📥 Export
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Clear All Data</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Permanently delete all expenses (cannot be undone)
              </p>
            </div>
            <button
              onClick={() => setShowClearModal(true)}
              className="px-6 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-linear-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 border border-blue-200 dark:border-purple-700 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="mr-2">ℹ️</span> About Expense Tracker
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          A modern, responsive expense tracking application built with React.js, Vite, and Tailwind CSS.
          Perfect for managing your personal finances with ease.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
            React 18
          </span>
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-sm font-medium">
            Vite
          </span>
          <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-400 rounded-full text-sm font-medium">
            Tailwind CSS
          </span>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-sm font-medium">
            React Router
          </span>
          <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 rounded-full text-sm font-medium">
            Recharts
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Version 2.0 • Built with ❤️
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
