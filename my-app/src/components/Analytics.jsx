import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { useExpense } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';

const COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FF6384',
  '#C9CBCF'
];

export const Analytics = () => {
  const { getCategoryExpenses, getMonthlyExpenses, transactions } = useExpense();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('category');

  const categoryData = getCategoryExpenses();
  const monthlyData = getMonthlyExpenses();

  // Format category data for charts
  const categoryChartData = Object.entries(categoryData).map(
    ([category, amount]) => ({
      name: category,
      value: amount
    })
  );

  // Format monthly data for bar chart
  const monthlyChartData = Object.entries(monthlyData)
    .sort()
    .map(([month, amount]) => {
      const [year, monthNum] = month.split('-');
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      return {
        name: `${monthNames[parseInt(monthNum) - 1]} ${year}`,
        amount: parseFloat(amount.toFixed(2))
      };
    });

  const totalExpenses = Object.values(categoryData).reduce((a, b) => a + b, 0);

  return (
    <div className={`animate-slideUp rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300 border ${
      isDark
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-gray-100'
    }`}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-8 flex items-center gap-2 ${
        isDark ? 'text-white' : 'text-gray-800'
      }`}>
        📊 Analytics & Reports
      </h2>

      {transactions.filter((t) => t.type === 'expense').length === 0 ? (
        <div className="text-center py-12">
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            📭 No expense data available for analytics
          </p>
        </div>
      ) : (
        <>
          {/* Tab Navigation */}
          <div className={`flex gap-2 md:gap-4 mb-8 border-b transition-all ${
            isDark ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <button
              onClick={() => setActiveTab('category')}
              className={`px-4 md:px-6 py-3 font-semibold transition-all duration-300 relative ${
                activeTab === 'category'
                  ? isDark
                    ? 'text-purple-400'
                    : 'text-blue-600'
                  : isDark
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📈 Category Breakdown
              {activeTab === 'category' && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                  isDark ? 'bg-linear-to-r from-purple-500 to-indigo-500' : 'bg-linear-to-r from-blue-500 to-purple-500'
                } rounded-full animate-slideUp`}></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 md:px-6 py-3 font-semibold transition-all duration-300 relative ${
                activeTab === 'monthly'
                  ? isDark
                    ? 'text-purple-400'
                    : 'text-blue-600'
                  : isDark
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📅 Monthly Summary
              {activeTab === 'monthly' && (
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                  isDark ? 'bg-linear-to-r from-purple-500 to-indigo-500' : 'bg-linear-to-r from-blue-500 to-purple-500'
                } rounded-full animate-slideUp`}></div>
              )}
            </button>
          </div>

          {/* Category Breakdown */}
          {activeTab === 'category' && categoryChartData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {/* Pie Chart */}
              <div className={`flex flex-col items-center p-6 rounded-xl transition-all ${
                isDark ? 'bg-slate-700/50' : 'bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  💰 Expenses by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) =>
                        `${name}: $${value.toFixed(2)}`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={800}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `$${value.toFixed(2)}`}
                      contentStyle={isDark ? {
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px'
                      } : {}}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category List */}
              <div className={`flex flex-col p-6 rounded-xl transition-all ${
                isDark ? 'bg-slate-700/50' : 'bg-gray-50'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  📋 Category Summary
                </h3>
                <div className="space-y-4">
                  {categoryChartData.map((category, index) => (
                    <div key={category.name} className="flex items-center gap-3 group hover:scale-105 transition-transform">
                      <div
                        className="w-4 h-4 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {category.name}
                        </span>
                        <div className="text-right">
                          <p className={`font-bold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                            ${category.value.toFixed(2)}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {((category.value / totalExpenses) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className={`border-t pt-4 mt-4 flex justify-between items-center font-bold transition-all ${
                    isDark ? 'border-slate-600 text-gray-200' : 'border-gray-200 text-gray-800'
                  }`}>
                    <span>Total</span>
                    <span className="text-red-500">${totalExpenses.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Monthly Summary */}
          {activeTab === 'monthly' && monthlyChartData.length > 0 && (
            <div className={`p-6 rounded-xl transition-all ${
              isDark ? 'bg-slate-700/50' : 'bg-gray-50'
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                📈 Monthly Expense Trend
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#475569' : '#e5e7eb'} />
                  <XAxis dataKey="name" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    formatter={(value) => `$${value.toFixed(2)}`}
                    contentStyle={isDark ? {
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    } : {}}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="#ef4444" name="Expenses" radius={[8, 8, 0, 0]} animationDuration={800} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};
