import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const categories = [
    'Food',
    'Transport',
    'Shopping',
    'Rent',
    'Bills',
    'Entertainment',
    'Salary',
    'Other'
  ];

  const addTransaction = (transaction) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      date: new Date(transaction.date).toISOString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updatedTransaction,
              date: new Date(updatedTransaction.date).toISOString()
            }
          : t
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const getTotalIncome = () => {
    return transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const getBalance = () => {
    return getTotalIncome() - getTotalExpenses();
  };

  const getTransactionsByCategory = (category) => {
    return transactions.filter((t) => t.category === category);
  };

  const getTransactionsByType = (type) => {
    return transactions.filter((t) => t.type === type);
  };

  const getMonthlyExpenses = () => {
    const monthlyData = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const date = new Date(t.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(t.amount);
      });
    return monthlyData;
  };

  const getCategoryExpenses = () => {
    const categoryData = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryData[t.category] = (categoryData[t.category] || 0) + parseFloat(t.amount);
      });
    return categoryData;
  };

  const searchTransactions = (query) => {
    return transactions.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const sortTransactions = (sortBy = 'date', order = 'desc') => {
    const sorted = [...transactions];
    if (sortBy === 'date') {
      sorted.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return order === 'desc' ? dateB - dateA : dateA - dateB;
      });
    } else if (sortBy === 'amount') {
      sorted.sort((a, b) => {
        const amountA = parseFloat(a.amount);
        const amountB = parseFloat(b.amount);
        return order === 'desc' ? amountB - amountA : amountA - amountB;
      });
    }
    return sorted;
  };

  const value = {
    transactions,
    categories,
    addTransaction,
    editTransaction,
    deleteTransaction,
    getTotalIncome,
    getTotalExpenses,
    getBalance,
    getTransactionsByCategory,
    getTransactionsByType,
    getMonthlyExpenses,
    getCategoryExpenses,
    searchTransactions,
    sortTransactions
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
};
