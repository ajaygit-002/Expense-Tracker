import { format, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';

const currencyLocales = {
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  INR: 'en-IN',
  AUD: 'en-AU',
  CAD: 'en-CA',
  JPY: 'ja-JP',
  CNY: 'zh-CN',
  SGD: 'en-SG',
  CHF: 'de-CH'
};

export const formatCurrency = (amount, currency = 'USD') => {
  const locale = currencyLocales[currency] || 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(Number(amount) || 0);
};

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  return format(new Date(date), formatStr);
};

export const filterExpensesByDateRange = (expenses, startDate, endDate) => {
  if (!startDate || !endDate) return expenses;
  
  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, { start: new Date(startDate), end: new Date(endDate) });
  });
};

export const filterExpensesByCategory = (expenses, categoryId) => {
  if (!categoryId || categoryId === 'all') return expenses;
  return expenses.filter(expense => expense.category === categoryId);
};

export const getMonthlyData = (expenses, monthsCount = 6) => {
  const months = [];
  const now = new Date();
  
  for (let i = monthsCount - 1; i >= 0; i--) {
    const monthDate = subMonths(now, i);
    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);
    
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
    });
    
    const income = monthExpenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
    const expenseTotal = monthExpenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
    months.push({
      month: format(monthDate, 'MMM yyyy'),
      income,
      expenses: expenseTotal
    });
  }
  
  return months;
};

export const getCategoryWiseData = (expenses) => {
  const categoryMap = {};
  
  expenses
    .filter(e => e.type === 'expense')
    .forEach(expense => {
      if (!categoryMap[expense.category]) {
        categoryMap[expense.category] = 0;
      }
      categoryMap[expense.category] += parseFloat(expense.amount);
    });
  
  return categoryMap;
};

export const getRecentExpenses = (expenses, count = 5) => {
  return expenses.slice(0, count);
};

export const validateExpenseForm = (formData) => {
  const errors = {};
  
  if (!formData.title || formData.title.trim() === '') {
    errors.title = 'Title is required';
  }
  
  if (!formData.amount || parseFloat(formData.amount) <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  
  if (!formData.category) {
    errors.category = 'Category is required';
  }
  
  if (!formData.date) {
    errors.date = 'Date is required';
  }
  
  if (!formData.type) {
    errors.type = 'Type is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
