import { useEffect, useRef } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency, formatDate } from '../utils/helpers';
import gsap from 'gsap';
import './ExpenseCard.css';

const ExpenseCard = ({ expense, onEdit, onDelete, index }) => {
  const { categories } = useExpense();
  const cardRef = useRef(null);
  
  const category = categories.find(cat => cat.id === expense.category);

  useEffect(() => {
    // Staggered entrance animation
    gsap.fromTo(
      cardRef.current,
      { 
        opacity: 0, 
        x: -50,
        scale: 0.95 
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.5,
        delay: index * 0.05,
        ease: 'power2.out'
      }
    );
  }, [index]);

  const handleDelete = () => {
    // Exit animation before delete
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 50,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => onDelete(expense.id)
    });
  };

  return (
    <div 
      ref={cardRef}
      className={`expense-card ${expense.type === 'income' ? 'income-card' : 'expense-card-default'}`}
    >
      <div className="expense-card-left">
        <div 
          className="category-icon"
          style={{ background: category?.color || '#9CA3AF' }}
        >
          {category?.icon || '📦'}
        </div>
        
        <div className="expense-info">
          <h4 className="expense-title">{expense.title}</h4>
          <div className="expense-meta">
            <span className="expense-category">{category?.name || 'Other'}</span>
            <span className="expense-date">{formatDate(expense.date)}</span>
          </div>
          {expense.notes && (
            <p className="expense-notes">{expense.notes}</p>
          )}
        </div>
      </div>

      <div className="expense-card-right">
        <div className={`expense-amount ${expense.type}`}>
          {expense.type === 'income' ? '+' : '-'}
          {formatCurrency(expense.amount)}
        </div>
        
        <div className="expense-actions">
          <button 
            onClick={() => onEdit(expense)}
            className="action-btn edit-btn"
            title="Edit"
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete}
            className="action-btn delete-btn"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
