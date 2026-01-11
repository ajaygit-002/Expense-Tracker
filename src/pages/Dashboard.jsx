import { useState, useMemo } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { filterExpensesByDateRange, filterExpensesByCategory } from '../utils/helpers';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatCard from '../components/StatCard';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseCard from '../components/ExpenseCard';
import FilterBar from '../components/FilterBar';
import MonthlyChart from '../components/MonthlyChart';
import CategoryChart from '../components/CategoryChart';
import ThreeBackground from '../components/ThreeBackground';
import './Dashboard.css';

const Dashboard = () => {
  const { expenses, statistics, deleteExpense } = useExpense();
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    startDate: '',
    endDate: '',
    searchTerm: ''
  });

  const filteredExpenses = useMemo(() => {
    let filtered = [...expenses];

    // Filter by category
    filtered = filterExpensesByCategory(filtered, filters.category);

    // Filter by date range
    if (filters.startDate && filters.endDate) {
      filtered = filterExpensesByDateRange(filtered, filters.startDate, filters.endDate);
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(expense =>
        expense.title.toLowerCase().includes(searchLower) ||
        (expense.notes && expense.notes.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [expenses, filters]);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <ThreeBackground />
      <Navbar />
      
      <div className="dashboard">
        <div className="container">
          <Hero />

          {/* Statistics Cards */}
          <section className="stats-section">
            <div className="grid grid-cols-3">
              <StatCard
                title="Total Balance"
                amount={statistics.balance}
                type="balance"
                icon="💰"
              />
              <StatCard
                title="Total Income"
                amount={statistics.totalIncome}
                type="income"
                icon="📈"
              />
              <StatCard
                title="Total Expenses"
                amount={statistics.totalExpenses}
                type="expense"
                icon="📉"
              />
            </div>
          </section>

          {/* Add Transaction Button */}
          <section className="action-section">
            <button onClick={handleAddExpense} className="btn btn-primary add-transaction-btn">
              <span className="btn-icon">➕</span>
              Add Transaction
            </button>
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="grid grid-cols-2">
              <MonthlyChart />
              <CategoryChart />
            </div>
          </section>

          {/* Transactions Section */}
          <section className="transactions-section">
            <div className="section-header">
              <h2 className="section-title">Recent Transactions</h2>
              <span className="transaction-count">
                {filteredExpenses.length} {filteredExpenses.length === 1 ? 'transaction' : 'transactions'}
              </span>
            </div>

            <FilterBar onFilterChange={handleFilterChange} />

            <div className="transactions-list">
              {filteredExpenses.length === 0 ? (
                <div className="empty-state card">
                  <img 
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80"
                    alt="No transactions"
                    className="empty-state-image"
                  />
                  <h3>No transactions found</h3>
                  <p>Start by adding your first transaction to track your finances</p>
                  <button onClick={handleAddExpense} className="btn btn-primary">
                    Add Transaction
                  </button>
                </div>
              ) : (
                filteredExpenses.map((expense, index) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onEdit={handleEditExpense}
                    onDelete={deleteExpense}
                    index={index}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {showForm && (
        <ExpenseForm
          onClose={handleCloseForm}
          editingExpense={editingExpense}
        />
      )}
    </>
  );
};

export default Dashboard;
