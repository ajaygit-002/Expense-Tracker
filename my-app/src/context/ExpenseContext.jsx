import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();
const ThemeContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [income, setIncome] = useState(() => {
    const saved = localStorage.getItem('income');
    return saved ? parseFloat(saved) : 5000;
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('income', income.toString());
  }, [income]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map((exp) => (exp.id === id ? { ...exp, ...updatedExpense } : exp)));
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const clearAllExpenses = () => {
    setExpenses([]);
  };

  const expenseValue = {
    expenses,
    income,
    setIncome,
    addExpense,
    updateExpense,
    deleteExpense,
    clearAllExpenses,
  };

  const themeValue = {
    theme,
    toggleTheme,
  };

  return (
    <ExpenseContext.Provider value={expenseValue}>
      <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within ExpenseProvider');
  }
  return context;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ExpenseProvider');
  }
  return context;
};
