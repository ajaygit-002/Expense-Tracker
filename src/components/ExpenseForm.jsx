import { useState, useEffect, useRef } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { validateExpenseForm } from '../utils/helpers';
import gsap from 'gsap';
import './ExpenseForm.css';

const ExpenseForm = ({ onClose, editingExpense = null }) => {
  const { addExpense, updateExpense, categories } = useExpense();
  const modalRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    notes: ''
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        type: editingExpense.type,
        notes: editingExpense.notes || ''
      });
    }
  }, [editingExpense]);

  useEffect(() => {
    // Modal entrance animation
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateExpenseForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingExpense) {
      updateExpense(editingExpense.id, formData);
    } else {
      addExpense(formData);
    }

    // Exit animation
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -50,
      duration: 0.3,
      ease: 'back.in(1.7)',
      onComplete: onClose
    });
  };

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -50,
      duration: 0.3,
      ease: 'back.in(1.7)',
      onComplete: onClose
    });
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        ref={modalRef}
        className="modal-content expense-form-modal" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{editingExpense ? 'Edit Transaction' : 'Add New Transaction'}</h2>
          <button className="close-btn" onClick={handleClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="type">Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="select"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              placeholder="e.g., Grocery Shopping"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="amount">Amount *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="input"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.amount && <span className="error-message">{errors.amount}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input"
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select"
            >
              <option value="">Select a category</option>
              {categories
                .filter(cat => formData.type === 'income' ? cat.id === 'income' : cat.id !== 'income')
                .map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="textarea"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingExpense ? 'Update' : 'Add'} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
