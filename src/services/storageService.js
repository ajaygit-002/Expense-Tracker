// LocalStorage service with API-ready structure
const STORAGE_KEY = 'expenseTrackerData';

const defaultData = {
  expenses: [],
  categories: [
    { id: 'food', name: 'Food & Dining', color: '#FF6B6B', icon: '🍔' },
    { id: 'transport', name: 'Transportation', color: '#4ECDC4', icon: '🚗' },
    { id: 'entertainment', name: 'Entertainment', color: '#95E1D3', icon: '🎮' },
    { id: 'shopping', name: 'Shopping', color: '#F38181', icon: '🛍️' },
    { id: 'bills', name: 'Bills & Utilities', color: '#AA96DA', icon: '💡' },
    { id: 'health', name: 'Healthcare', color: '#FCBAD3', icon: '🏥' },
    { id: 'education', name: 'Education', color: '#A8D8EA', icon: '📚' },
    { id: 'income', name: 'Income', color: '#48BB78', icon: '💰' },
    { id: 'other', name: 'Other', color: '#A0AEC0', icon: '📦' }
  ],
  settings: {
    currency: 'USD',
    theme: 'light'
  }
};

class StorageService {
  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    }
  }

  getData() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultData;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultData;
    }
  }

  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // Expense CRUD operations
  getAllExpenses() {
    const data = this.getData();
    return data.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  getExpenseById(id) {
    const data = this.getData();
    return data.expenses.find(expense => expense.id === id);
  }

  addExpense(expense) {
    const data = this.getData();
    const newExpense = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...expense,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.expenses.push(newExpense);
    this.saveData(data);
    return newExpense;
  }

  updateExpense(id, updatedExpense) {
    const data = this.getData();
    const index = data.expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
      data.expenses[index] = {
        ...data.expenses[index],
        ...updatedExpense,
        updatedAt: new Date().toISOString()
      };
      this.saveData(data);
      return data.expenses[index];
    }
    return null;
  }

  deleteExpense(id) {
    const data = this.getData();
    data.expenses = data.expenses.filter(expense => expense.id !== id);
    this.saveData(data);
    return true;
  }

  // Category operations
  getAllCategories() {
    const data = this.getData();
    return data.categories;
  }

  getCategoryById(id) {
    const data = this.getData();
    return data.categories.find(cat => cat.id === id);
  }

  // Settings operations
  getSettings() {
    const data = this.getData();
    return data.settings;
  }

  updateSettings(settings) {
    const data = this.getData();
    data.settings = { ...data.settings, ...settings };
    this.saveData(data);
    return data.settings;
  }

  // Statistics
  getStatistics() {
    const expenses = this.getAllExpenses();
    const income = expenses
      .filter(e => e.type === 'income')
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const expenseTotal = expenses
      .filter(e => e.type === 'expense')
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    
    return {
      totalIncome: income,
      totalExpenses: expenseTotal,
      balance: income - expenseTotal,
      totalTransactions: expenses.length
    };
  }

  // Clear all data
  clearAllData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return true;
  }
}

export default new StorageService();
