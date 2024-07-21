import React, { useState, useMemo } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import FilterBar from './components/FilterBar';
import ChartVisualization from './components/ChartVisualization';
import useTransactions from './hooks/useTransactions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
  } = useTransactions();

  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    currency: '',
    category: '',
    year: '',
    month: '',
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        (filters.type === '' || transaction.type === filters.type) &&
        (filters.currency === '' || transaction.currency === filters.currency) &&
        (filters.category === '' || transaction.category === filters.category) &&
        (filters.year === '' || transactionDate.getFullYear().toString() === filters.year) &&
        (filters.month === '' || transactionDate.getMonth().toString() === filters.month)
      );
    });
  }, [transactions, filters]);

  const totalsByCurrency = useMemo(() => {
    return filteredTransactions.reduce((totals, transaction) => {
      if (!totals[transaction.currency]) {
        totals[transaction.currency] = { income: 0, expenses: 0 };
      }
      if (transaction.type === 'income') {
        totals[transaction.currency].income += transaction.amount;
      } else {
        totals[transaction.currency].expenses += transaction.amount;
      }
      return totals;
    }, {});
  }, [filteredTransactions]);

  return (
    <div className={`container-fluid mt-5 ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="text-center mb-4">Transaction Management Application</h1>
      <div className="row mb-3">
        <div className="col-12 text-end">
          <button onClick={toggleDarkMode} className="btn btn-outline-primary">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            {darkMode ? ' Light Mode' : ' Dark Mode'}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-5 mb-4">
          <TransactionForm
            addTransaction={addTransaction}
          />
        </div>
        <div className="col-lg-8 col-md-7">
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            transactions={transactions}
          />
          <ChartVisualization transactions={filteredTransactions} />
          <div className="card shadow mb-4">
            <div className="card-body">
              <h3 className="card-title">Summary</h3>
              {Object.entries(totalsByCurrency).map(([currency, totals]) => (
                <div key={currency} className="mb-3">
                  <h4>{currency}</h4>
                  <div className="row">
                    <div className="col-6">
                      <h5 className="text-success">
                        <FontAwesomeIcon icon={faArrowUp} className="me-2" />
                        Income
                      </h5>
                      <p className="h4">{totals.income.toFixed(2)}</p>
                    </div>
                    <div className="col-6">
                      <h5 className="text-danger">
                        <FontAwesomeIcon icon={faArrowDown} className="me-2" />
                        Expenses
                      </h5>
                      <p className="h4">{totals.expenses.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <TransactionList
            transactions={filteredTransactions}
            editTransaction={editTransaction}
            deleteTransaction={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default App;