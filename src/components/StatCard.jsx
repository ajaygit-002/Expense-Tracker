import { useEffect, useRef } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/helpers';
import gsap from 'gsap';
import './StatCard.css';

const StatCard = ({ title, amount, type, icon, trend }) => {
  const { settings } = useExpense();
  const cardRef = useRef(null);
  const amountRef = useRef(null);

  useEffect(() => {
    // Animate card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }
    );
  }, []);

  useEffect(() => {
    // Animated counter
    const element = amountRef.current;
    if (!element) return;

    const targetValue = Math.abs(amount);
    const obj = { value: 0 };

    gsap.to(obj, {
      value: targetValue,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = formatCurrency(obj.value, settings.currency);
      }
    });
  }, [amount, settings.currency]);

  const getTypeClass = () => {
    if (type === 'income') return 'stat-card-income';
    if (type === 'expense') return 'stat-card-expense';
    return 'stat-card-balance';
  };

  return (
    <div ref={cardRef} className={`stat-card ${getTypeClass()}`}>
      <div className="stat-card-header">
        <span className="stat-icon">{icon}</span>
        <h3 className="stat-title">{title}</h3>
      </div>
      
      <div className="stat-amount-container">
        <p ref={amountRef} className="stat-amount">
          {formatCurrency(0, settings.currency)}
        </p>
        {trend && (
          <span className={`stat-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
