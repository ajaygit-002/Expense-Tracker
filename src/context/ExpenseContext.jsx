import { createContext, useContext, useState, useEffect } from 'react';
import storageService from '../services/storageService';

const ExpenseContext = createContext();

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({ currency: 'USD', theme: 'light' });
  const [statistics, setStatistics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    totalTransactions: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    updateStatistics();
  }, [expenses]);

  const loadData = () => {
    const allExpenses = storageService.getAllExpenses();
    const allCategories = storageService.getAllCategories();
    const currentSettings = storageService.getSettings();
    
    setExpenses(allExpenses);
    setCategories(allCategories);
    setSettings(currentSettings);
  };

  const updateStatistics = () => {
    const stats = storageService.getStatistics();
    setStatistics(stats);
  };

  const addExpense = (expense) => {
    const newExpense = storageService.addExpense(expense);
    setExpenses(prev => [newExpense, ...prev]);
    return newExpense;
  };

  const updateExpense = (id, updatedData) => {
    const updated = storageService.updateExpense(id, updatedData);
    if (updated) {
      setExpenses(prev => prev.map(exp => exp.id === id ? updated : exp));
    }
    return updated;
  };

  const deleteExpense = (id) => {
    storageService.deleteExpense(id);
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const updateTheme = (theme) => {
    const updatedSettings = storageService.updateSettings({ theme });
    setSettings(updatedSettings);
  };

  const value = {
    expenses,
    categories,
    settings,
    statistics,
    addExpense,
    updateExpense,
    deleteExpense,
    updateTheme,
    loadData
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};
