import React from 'react';
import { useExpense } from '../context/ExpenseContext';

export const Dashboard = () => {
  const { getTotalIncome, getTotalExpenses, getBalance } = useExpense();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const balance = getBalance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-6 border border-green-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Income</h3>
        <p className="text-3xl font-bold text-green-600">
          ${totalIncome.toFixed(2)}
        </p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-6 border border-red-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-600">
          ${totalExpenses.toFixed(2)}
        </p>
      </div>

      <div
        className={`bg-gradient-to-br rounded-lg shadow-md p-6 border ${
          balance >= 0
            ? 'from-blue-50 to-blue-100 border-blue-200'
            : 'from-orange-50 to-orange-100 border-orange-200'
        }`}
      >
        <h3 className="text-sm font-semibold text-gray-600 mb-2">Balance</h3>
        <p
          className={`text-3xl font-bold ${
            balance >= 0 ? 'text-blue-600' : 'text-orange-600'
          }`}
        >
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
