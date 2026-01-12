import { useState, useEffect } from 'react';
import { useExpense } from '../context/ExpenseContext';
import './Navbar.css';

const Navbar = () => {
  const { settings, updateTheme, updateCurrency } = useExpense();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateTheme(newTheme);
  };

  const currencyOptions = [
    'USD',
    'EUR',
    'GBP',
    'INR',
    'AUD',
    'CAD',
    'JPY',
    'CNY',
    'SGD',
    'CHF'
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-content">
        <div className="navbar-brand">
          <span className="logo-icon">💰</span>
          <h1 className="logo-text">ExpenseTracker</h1>
        </div>
        
        <div className="navbar-actions">
          <select
            className="currency-select"
            value={settings.currency}
            onChange={(e) => updateCurrency(e.target.value)}
            aria-label="Choose currency"
          >
            {currencyOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {settings.theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
