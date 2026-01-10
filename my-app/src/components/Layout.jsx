import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ExpenseContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Add Expense', href: '/add-expense', icon: '➕' },
    { name: 'Expense List', href: '/expenses', icon: '📝' },
    { name: 'Analytics', href: '/analytics', icon: '📈' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 relative">
        {/* Decorative Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/5 dark:bg-pink-600/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-lg">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-lg">💰</span>
                </div>
                <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ExpenseTracker
                </span>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors active:scale-95"
              aria-label="Toggle theme"
            >
              <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>

        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 shadow-2xl`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            {/* Logo */}
            <div className="flex items-center justify-between mb-8 px-3 pt-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ExpenseTracker
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Finance Manager</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="hidden lg:block p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Navigation */}
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-200 group relative ${
                      isActive(item.href)
                        ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <span className="font-semibold">{item.name}</span>
                    {isActive(item.href) && (
                      <span className="ml-auto">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Profile Section */}
            <div className="absolute bottom-4 left-3 right-3 p-4 rounded-2xl bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-purple-800/30 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    User Account
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    Premium Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:ml-64 pt-20 lg:pt-0">
          <main className="p-4 sm:p-6 lg:p-8 min-h-screen relative z-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
