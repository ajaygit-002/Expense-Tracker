import { useState } from 'react';
import './App.css';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Analytics } from './components/Analytics';
import { useTheme } from './context/ThemeContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isDark, toggleTheme } = useTheme();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '📝' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100'
    }`}>
      {/* Header */}
      <header className={`transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 shadow-2xl' 
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex justify-between items-center">
            <div className="animate-slideIn">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">💰 Expense Tracker</h1>
              <p className={`mt-1 md:mt-2 ${isDark ? 'text-purple-200' : 'text-blue-100'}`}>
                Manage your finances with ease
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDark
                  ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/50'
                  : 'bg-slate-800 text-yellow-300 shadow-lg shadow-slate-800/50'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={`transition-all duration-300 ${
        isDark
          ? 'bg-slate-800 shadow-lg border-b border-slate-700'
          : 'bg-white shadow border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 md:gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 md:py-4 font-semibold transition-all duration-300 relative group whitespace-nowrap ${
                  activeTab === tab.id
                    ? isDark
                      ? 'text-purple-400'
                      : 'text-blue-600'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                </span>
                {activeTab === tab.id && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                    isDark ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  } rounded-full animate-slideUp`}></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="animate-fadeIn">
          {activeTab === 'dashboard' && (
            <div>
              <Dashboard />
              <div className="mt-8 md:mt-12 animate-slideUp">
                <h2 className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  Quick Add Transaction
                </h2>
                <TransactionForm />
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                Transaction Management
              </h2>
              <div className="space-y-6">
                <div className="animate-slideUp" style={{ animationDelay: '0s' }}>
                  <TransactionForm />
                </div>
                <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
                  <TransactionList />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="animate-slideUp">
              <Analytics />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`transition-all duration-300 mt-12 md:mt-16 border-t ${
        isDark
          ? 'bg-slate-900 border-slate-700 text-gray-400'
          : 'bg-gray-50 border-gray-200 text-gray-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p>&copy; 2026 Expense Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
