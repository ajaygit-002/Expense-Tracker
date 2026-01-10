import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useExpenses, useTheme } from '../context/ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import gsap from 'gsap';

const DashboardPage = () => {
  const { expenses, income, setIncome, formatAmount, getCurrencySymbol } = useExpenses();
  const { theme } = useTheme();
  const cardsRef = useRef([]);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [tempIncome, setTempIncome] = useState(income);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const balance = income - totalExpenses;

  const handleUpdateIncome = () => {
    setIncome(parseFloat(tempIncome));
    setShowIncomeModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Category-wise expenses
  const categoryData = expenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.category === exp.category);
    if (existing) {
      existing.value += parseFloat(exp.amount);
    } else {
      acc.push({ category: exp.category, value: parseFloat(exp.amount) });
    }
    return acc;
  }, []);

  // Recent transactions
  const recentTransactions = expenses.slice(-5).reverse();

  // Monthly trend (last 6 months)
  const monthlyData = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const monthExpenses = expenses
      .filter(exp => new Date(exp.date).getMonth() === monthIndex)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    monthlyData.push({
      name: months[monthIndex],
      expenses: monthExpenses,
    });
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444'];

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          }
        );
      }
    });
  }, []);

  const StatCard = ({ title, value, icon, gradient, index, trend, color, onClick, editable }) => (
    <div
      ref={(el) => (cardsRef.current[index] = el)}
      onClick={editable ? onClick : undefined}
      className={`relative overflow-hidden rounded-2xl h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group ${
        editable ? 'cursor-pointer' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.06] dark:group-hover:opacity-[0.08] transition-opacity duration-300`} />
      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300`}>
            <span className="text-3xl">{icon}</span>
          </div>
          {editable && (
            <button className="p-2 rounded-lg bg-slate-100/50 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 shadow-sm">
              <span className="text-lg">✏️</span>
            </button>
          )}
          {trend && !editable && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <span className={`text-base ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '↗' : '↘'}
              </span>
              <span className={`text-xs font-bold ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            {title} {editable && <span className="text-blue-500 normal-case font-normal">(Click to edit)</span>}
          </h3>
          <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white overflow-wrap-anywhere leading-tight">
            {formatAmount(value)}
          </p>
        </div>
        <div className="mt-6 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full bg-linear-to-r ${gradient} rounded-full transition-all duration-500`} style={{width: '70%'}}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-slideIn flex items-center space-x-3">
          <span className="text-2xl">✅</span>
          <p className="font-semibold">Income updated successfully!</p>
        </div>
      )}

      {/* Income Edit Modal */}
      {showIncomeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-linear-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Update Total Income
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set your monthly or total income amount
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Income Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
                  {getCurrencySymbol()}
                </span>
                <input
                  type="number"
                  value={tempIncome}
                  onChange={(e) => setTempIncome(e.target.value)}
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-lg font-semibold"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpdateIncome}
                className="flex-1 px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Update Income
              </button>
              <button
                onClick={() => {
                  setShowIncomeModal(false);
                  setTempIncome(income);
                }}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2">
            <span className="text-xl">📄</span>
            <span>Export Data</span>
          </button>
          <Link
            to="/add-expense"
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="text-xl">+</span>
            <span>Add Expense</span>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Income"
          value={income}
          icon="💰"
          gradient="from-green-500 to-emerald-600"
          index={0}
          editable={true}
          onClick={() => setShowIncomeModal(true)}
        />
        <StatCard
          title="Total Expenses"
          value={totalExpenses}
          icon="💸"
          gradient="from-red-500 to-pink-600"
          index={1}
          trend={-5}
        />
        <StatCard
          title="Current Balance"
          value={balance}
          icon="💵"
          gradient="from-blue-500 to-indigo-600"
          index={2}
          trend={8}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Category Pie Chart */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm h-112.5 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Expenses by Category
            </h2>
          </div>
          <div className="flex-1 flex items-center justify-center">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-slate-500 dark:text-slate-400">
              <p className="text-4xl mb-4">📊</p>
              <p className="font-medium">No expense data available</p>
            </div>
          )}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm h-112.5 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
              <span className="text-2xl">📈</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Monthly Trend
            </h2>
          </div>
          <div className="flex-1">
          {monthlyData.some(d => d.expenses > 0) ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis 
                  dataKey="name" 
                  stroke={theme === 'dark' ? '#94a3b8' : '#64748b'}
                  style={{ fontSize: '12px', fontWeight: '500' }}
                />
                <YAxis 
                  stroke={theme === 'dark' ? '#94a3b8' : '#64748b'}
                  style={{ fontSize: '12px', fontWeight: '500' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  }}
                />
                <Bar dataKey="expenses" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-slate-500 dark:text-slate-400">
              <div>
                <p className="text-4xl mb-4">📈</p>
                <p className="font-medium">No trend data available</p>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
              <span className="text-2xl">🔄</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recent Transactions
            </h2>
          </div>
          <Link
            to="/expenses"
            className="px-5 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300 font-semibold text-sm shadow-sm hover:shadow"
          >
            View All →
          </Link>
        </div>
        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-5 rounded-xl bg-slate-50/50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-sm group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {transaction.category.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {transaction.description || transaction.category}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg font-medium">
                        {transaction.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">
                    -{formatAmount(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {transaction.paymentMethod || 'Cash'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-4">📭</p>
            <p>No transactions yet</p>
            <Link
              to="/add-expense"
              className="inline-block mt-4 px-6 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform"
            >
              Add your first expense
            </Link>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-3xl">📝</p>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">+</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{expenses.length}</p>
          <p className="text-sm text-blue-100">Total Transactions</p>
        </div>
        <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-3xl">📊</p>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">~</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">{categoryData.length}</p>
          <p className="text-sm text-purple-100">Categories</p>
        </div>
        <div className="bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-3xl">💳</p>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">Ø</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">
            ${totalExpenses > 0 ? (totalExpenses / expenses.length).toFixed(0) : '0'}
          </p>
          <p className="text-sm text-pink-100">Avg. Expense</p>
        </div>
        <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <p className="text-3xl">🎯</p>
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold">%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mb-1">
            {income > 0 ? ((totalExpenses / income) * 100).toFixed(0) : '0'}%
          </p>
          <p className="text-sm text-orange-100">Expense Ratio</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
