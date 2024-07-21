import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const TransactionForm = ({ addTransaction, editTransaction, transactionToEdit }) => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    type: 'expense',
    currency: 'USD',
    title: '',
    note: ''
  });

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    }
  }, [transactionToEdit]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString().split('T')[0] // Ensure consistent date format
    };
    if (transactionToEdit) {
      editTransaction(newTransaction);
    } else {
      addTransaction(newTransaction);
    }
    setFormData({
      date: '',
      amount: '',
      category: '',
      type: 'expense',
      currency: 'USD',
      title: '',
      note: ''
    });
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h2 className="card-title">{transactionToEdit ? 'Edit' : 'Add'} Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input type="number" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type</label>
            <select className="form-select" id="type" name="type" value={formData.type} onChange={handleInputChange}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="currency" className="form-label">Currency</label>
            <select className="form-select" id="currency" name="currency" value={formData.currency} onChange={handleInputChange} required>
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="note" className="form-label">Note</label>
            <textarea className="form-control" id="note" name="note" value={formData.note} onChange={handleInputChange}></textarea>
          </div>
          <button type="submit" className="btn btn-danger">
            <FontAwesomeIcon icon={faSave} className="me-2" />
            {transactionToEdit ? 'Update' : 'Add'} Transaction
          </button>
          {transactionToEdit && (
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setFormData({})}>
              <FontAwesomeIcon icon={faTimes} className="me-2" />
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;