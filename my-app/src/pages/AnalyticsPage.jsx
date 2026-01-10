import { useState } from 'react';
import { useExpenses, useTheme } from '../context/ExpenseContext';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';

const AnalyticsPage = () => {
  const { expenses, income } = useExpenses();
  const { theme } = useTheme();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#8b5cf6'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Get available years from expenses
  const years = [...new Set(expenses.map(exp => new Date(exp.date).getFullYear()))].sort((a, b) => b - a);
  if (years.length === 0) years.push(new Date().getFullYear());

  // Category-wise spending
  const categoryData = expenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.name === exp.category);
    const amount = parseFloat(exp.amount);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: exp.category, value: amount });
    }
    return acc;
  }, []);

  // Monthly trend for selected year
  const monthlyTrend = months.map((month, index) => {
    const monthExpenses = expenses
      .filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getFullYear() === selectedYear && expDate.getMonth() === index;
      })
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    return {
      month: month.substring(0, 3),
      expenses: monthExpenses,
      income: income / 12, // Assuming fixed monthly income
    };
  });

  // Daily spending for selected month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dayExpenses = expenses
      .filter(exp => {
        const expDate = new Date(exp.date);
        return (
          expDate.getFullYear() === selectedYear &&
          expDate.getMonth() === selectedMonth &&
          expDate.getDate() === day
        );
      })
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

    return {
      day: day,
      amount: dayExpenses,
    };
  });

  // Payment method distribution
  const paymentMethodData = expenses.reduce((acc, exp) => {
    const method = exp.paymentMethod || 'Cash';
    const existing = acc.find(item => item.name === method);
    const amount = parseFloat(exp.amount);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: method, value: amount });
    }
    return acc;
  }, []);

  // Stats
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const balance = income - totalExpenses;
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const highestExpense = expenses.length > 0 ? Math.max(...expenses.map(e => parseFloat(e.amount))) : 0;
  const topCategory = categoryData.length > 0 ? categoryData.reduce((a, b) => (a.value > b.value ? a : b)).name : 'N/A';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700">
          <p className="font-semibold text-gray-900 dark:text-white">
            {payload[0].name}: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics & Insights
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Deep dive into spending patterns
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {[
          { label: 'Total Spent', value: `$${totalExpenses.toFixed(2)}`, icon: '💸', color: 'red' },
          { label: 'Balance', value: `$${balance.toFixed(2)}`, icon: '💰', color: 'green' },
          { label: 'Avg Expense', value: `$${avgExpense.toFixed(2)}`, icon: '📊', color: 'blue' },
          { label: 'Highest', value: `$${highestExpense.toFixed(2)}`, icon: '⬆️', color: 'purple' },
          { label: 'Top Category', value: topCategory, icon: '🏆', color: 'yellow' },
        ].map((metric, index) => (
          <div
            key={index}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl p-4 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-2xl mb-2">{metric.icon}</div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{metric.label}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white truncate">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Time Filters */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📅 Select Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📆 Select Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Category Distribution Pie Chart */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-2">🎯</span> Spending by Category
          </h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No data available
            </div>
          )}
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-2">💳</span> Payment Methods
          </h2>
          {paymentMethodData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Monthly Trend Line Chart */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">📈</span> Monthly Trend ({selectedYear})
        </h2>
        {monthlyTrend.some(d => d.expenses > 0) ? (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorExpenses)"
                name="Expenses"
              />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorIncome)"
                name="Income"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[350px] flex items-center justify-center text-gray-500 dark:text-gray-400">
            No trend data available for {selectedYear}
          </div>
        )}
      </div>

      {/* Daily Spending Bar Chart */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">📊</span> Daily Spending - {months[selectedMonth]} {selectedYear}
        </h2>
        {dailyData.some(d => d.amount > 0) ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="day" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-75 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No spending data for {months[selectedMonth]} {selectedYear}
          </div>
        )}
      </div>

      {/* Category Breakdown Table */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <span className="mr-2">📋</span> Category Breakdown
        </h2>
        {categoryData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Percentage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {categoryData
                  .sort((a, b) => b.value - a.value)
                  .map((cat, index) => {
                    const percentage = ((cat.value / totalExpenses) * 100).toFixed(1);
                    return (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700/30">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {cat.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-bold text-red-600 dark:text-red-400">
                          ${cat.value.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right text-gray-600 dark:text-gray-400">
                          {percentage}%
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-linear-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No category data available
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
