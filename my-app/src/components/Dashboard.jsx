import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import { useTheme } from '../context/ThemeContext';

export const Dashboard = () => {
  const { getTotalIncome, getTotalExpenses, getBalance } = useExpense();
  const { isDark } = useTheme();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();

  const StatCard = ({ title, amount, icon, gradient, darkGradient, delay }) => (
    <div
      className="animate-slideUp"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`transition-all duration-300 transform hover:scale-105 hover:shadow-2xl rounded-xl shadow-lg p-6 border h-full group cursor-pointer ${
        isDark
          ? `${darkGradient} border-opacity-30`
          : `${gradient} border-opacity-20`
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={`text-sm font-semibold mb-2 group-hover:font-bold transition-all ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {title}
            </p>
            <p className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${
              title === 'Total Income' 
                ? isDark ? 'text-green-400' : 'text-green-600'
                : title === 'Total Expenses'
                ? isDark ? 'text-red-400' : 'text-red-600'
                : balance >= 0
                ? isDark ? 'text-blue-400' : 'text-blue-600'
                : isDark ? 'text-orange-400' : 'text-orange-600'
            }`}>
              ${amount.toFixed(2)}
            </p>
          </div>
          <div className="text-3xl md:text-4xl transform group-hover:scale-125 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      <StatCard
        title="Total Income"
        amount={totalIncome}
        icon="📈"
        gradient="bg-linear-to-br from-green-50 to-green-100 border-green-200"
        darkGradient="bg-linear-to-br from-green-900/30 to-green-800/30 border-green-700"
        delay={0}
      />
      <StatCard
        title="Total Expenses"
        amount={totalExpenses}
        icon="📉"
        gradient="bg-linear-to-br from-red-50 to-red-100 border-red-200"
        darkGradient="bg-linear-to-br from-red-900/30 to-red-800/30 border-red-700"
        delay={0.1}
      />
      <StatCard
        title="Balance"
        amount={balance}
        icon={balance >= 0 ? '💰' : '⚠️'}
        gradient={balance >= 0 ? 'bg-linear-to-br from-blue-50 to-blue-100 border-blue-200' : 'bg-linear-to-br from-orange-50 to-orange-100 border-orange-200'}
        darkGradient={balance >= 0 ? 'bg-linear-to-br from-blue-900/30 to-blue-800/30 border-blue-700' : 'bg-linear-to-br from-orange-900/30 to-orange-800/30 border-orange-700'}
        delay={0.2}
      />
    </div>
  );
};
