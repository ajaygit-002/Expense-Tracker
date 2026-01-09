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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics & Reports</h2>

      {transactions.filter((t) => t.type === 'expense').length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No expense data available for analytics
        </p>
      ) : (
        <>
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('category')}
              className={`px-4 py-2 font-semibold transition ${
                activeTab === 'category'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Category Breakdown
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-4 py-2 font-semibold transition ${
                activeTab === 'monthly'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Monthly Summary
            </button>
          </div>

          {/* Category Breakdown */}
          {activeTab === 'category' && categoryChartData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Expenses by Category
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
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Category List */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Category Summary
                </h3>
                <div className="space-y-3">
                  {categoryChartData.map((category, index) => (
                    <div key={category.name} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index % COLORS.length]
                        }}
                      ></div>
                      <div className="flex-1 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          {category.name}
                        </span>
                        <div className="text-right">
                          <p className="text-gray-700 font-bold">
                            ${category.value.toFixed(2)}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {((category.value / totalExpenses) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center font-bold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-red-600">${totalExpenses.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Monthly Summary */}
          {activeTab === 'monthly' && monthlyChartData.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Monthly Expense Trend
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="amount" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};
