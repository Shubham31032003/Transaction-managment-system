import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPrint } from '@fortawesome/free-solid-svg-icons';

const TransactionList = ({ transactions, editTransaction, deleteTransaction }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setEditFormData(transaction);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTransaction(editFormData);
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const printTransactionSlip = (transaction) => {
    const slip = `
      Transaction Slip
      ----------------
      Date: ${transaction.date}
      Title: ${transaction.title}
      Amount: ${transaction.amount} ${transaction.currency}
      Category: ${transaction.category}
      Type: ${transaction.type}
      Note: ${transaction.note}
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<pre>${slip}</pre>`);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-body">
        <h2 className="card-title">Transactions</h2>
        {transactions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    {editingId === transaction.id ? (
                      <td colSpan="7">
                        <form onSubmit={handleEditSubmit}>
                          <div className="row g-3">
                            <div className="col-md-2">
                              <input type="date" className="form-control" name="date" value={editFormData.date} onChange={handleEditFormChange} required />
                            </div>
                            <div className="col-md-2">
                              <input type="text" className="form-control" name="title" value={editFormData.title} onChange={handleEditFormChange} required />
                            </div>
                            <div className="col-md-2">
                              <input type="number" className="form-control" name="amount" value={editFormData.amount} onChange={handleEditFormChange} required />
                            </div>
                            <div className="col-md-1">
                              <input type="text" className="form-control" name="currency" value={editFormData.currency} onChange={handleEditFormChange} required />
                            </div>
                            <div className="col-md-2">
                              <input type="text" className="form-control" name="category" value={editFormData.category} onChange={handleEditFormChange} required />
                            </div>
                            <div className="col-md-2">
                              <select className="form-select" name="type" value={editFormData.type} onChange={handleEditFormChange} required>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                              </select>
                            </div>
                            <div className="col-md-1">
                              <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                          </div>
                        </form>
                      </td>
                    ) : (
                      <>
                        <td>{transaction.date}</td>
                        <td>{transaction.title}</td>
                        <td className={transaction.type === 'income' ? 'text-success' : 'text-danger'}>
                          {transaction.type === 'income' ? '+' : '-'}
                          {transaction.amount}
                        </td>
                        <td>{transaction.currency}</td>
                        <td>{transaction.category}</td>
                        <td>
                          <span className={`badge ${transaction.type === 'income' ? 'bg-success' : 'bg-danger'}`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-1"
                            onClick={() => handleEditClick(transaction)}
                            aria-label="Edit transaction"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-sm btn-danger me-1"
                            onClick={() => handleDeleteClick(transaction.id)}
                            aria-label="Delete transaction"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => printTransactionSlip(transaction)}
                            aria-label="Print transaction slip"
                          >
                            <FontAwesomeIcon icon={faPrint} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center my-4">No transactions found for this period.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionList;