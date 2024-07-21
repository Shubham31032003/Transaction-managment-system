import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const FilterBar = ({ filters, setFilters, transactions }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const uniqueCategories = [...new Set(transactions.map(t => t.category))];
  const uniqueCurrencies = [...new Set(transactions.map(t => t.currency))];
  const years = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))].sort((a, b) => b - a);
  const months = [
    { value: '', label: 'All Months' },
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h2 className="card-title">
          <FontAwesomeIcon icon={faFilter} className="me-2" />
          Filters
        </h2>
        <form className="row g-3">
          <div className="col-md-2">
            <label htmlFor="type" className="form-label">Type</label>
            <select
              className="form-select"
              id="type"
              name="type"
              value={filters.type}
              onChange={handleInputChange}
            >
              <option value="">All Types</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="currency" className="form-label">Currency</label>
            <select
              className="form-select"
              id="currency"
              name="currency"
              value={filters.currency}
              onChange={handleInputChange}
            >
              <option value="">All Currencies</option>
              {uniqueCurrencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-select"
              id="category"
              name="category"
              value={filters.category}
              onChange={handleInputChange}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="year" className="form-label">Year</label>
            <select
              className="form-select"
              id="year"
              name="year"
              value={filters.year}
              onChange={handleInputChange}
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label htmlFor="month" className="form-label">Month</label>
            <select
              className="form-select"
              id="month"
              name="month"
              value={filters.month}
              onChange={handleInputChange}
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>{month.label}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterBar;