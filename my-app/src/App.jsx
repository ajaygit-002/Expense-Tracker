import { useState } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Analytics } from './components/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">💰 Expense Tracker</h1>
          <p className="text-blue-100 mt-1">Manage your finances with ease</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'transactions', label: 'Transactions', icon: '📝' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-4 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 border-b-4 border-transparent'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <Dashboard />
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Quick Add Transaction
              </h2>
              <TransactionForm />
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Transaction Management
            </h2>
            <TransactionForm />
            <TransactionList />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <Analytics />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
