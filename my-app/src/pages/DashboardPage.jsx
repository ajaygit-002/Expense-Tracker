import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useExpenses, useTheme } from '../context/ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import gsap from 'gsap';

const DashboardPage = () => {
  const { expenses, income, formatAmount, getCurrencySymbol } = useExpenses();
  const { theme } = useTheme();
  const cardsRef = useRef([]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const balance = income - totalExpenses;

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

  const StatCard = ({ title, value, icon, gradient, index, trend, color }) => (
    <div
      ref={(el) => (cardsRef.current[index] = el)}
      className={`relative overflow-hidden rounded-3xl p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${gradient} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center shadow-md`}>
            <span className="text-3xl">{icon}</span>
          </div>
          {trend && (
            <div className="flex items-center gap-1">
              <span className={`text-lg ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '↗' : '↘'}
              </span>
              <span className={`text-sm font-bold ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            </div>
          )}
        </div>
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">{title}</h3>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white overflow-wrap-anywhere">
          {formatAmount(value)}
        </p>
        <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full bg-linear-to-r ${gradient} rounded-full`} style={{width: '70%'}}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <span className="text-2xl sm:text-3xl">💰</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm sm:text-base">
            📊 Export
          </button>
          <Link
            to="/add-expense"
            className="flex-1 sm:flex-none px-5 py-2.5 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span className="text-lg">+</span> Add Expense
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Total Income"
          value={income}
          icon="💰"
          gradient="from-green-400 to-emerald-600"
          index={0}
          trend={12}
        />
        <StatCard
          title="Total Expenses"
          value={totalExpenses}
          icon="💸"
          gradient="from-red-400 to-pink-600"
          index={1}
          trend={-5}
        />
        <StatCard
          title="Current Balance"
          value={balance}
          icon="💵"
          gradient="from-blue-400 to-indigo-600"
          index={2}
          trend={8}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Category Pie Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Expenses by Category
              </h2>
            </div>
          </div>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No expense data available
            </div>
          )}
        </div>

        {/* Monthly Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-xl">📈</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Monthly Trend
              </h2>
            </div>
          </div>
          {monthlyData.some(d => d.expenses > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
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
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No trend data available
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <span className="text-xl">🔄</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Transactions
            </h2>
          </div>
          <Link
            to="/expenses"
            className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors font-medium text-sm"
          >
            View All
          </Link>
        </div>
        {recentTransactions.length > 0 ? (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-700/30 hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
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
