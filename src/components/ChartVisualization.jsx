import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartVisualization = ({ transactions }) => {
  const incomeData = prepareChartData(transactions.filter(t => t.type === 'income'));
  const expenseData = prepareChartData(transactions.filter(t => t.type === 'expense'));

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h2 className="card-title">Visualizations</h2>
        <div className="row">
          <div className="col-md-6">
            <h3>Income</h3>
            {incomeData.datasets[0].data.length > 0 ? (
              <Pie data={incomeData} />
            ) : (
              <p>No income data for this period</p>
            )}
          </div>
          <div className="col-md-6">
            <h3>Expenses</h3>
            {expenseData.datasets[0].data.length > 0 ? (
              <Pie data={expenseData} />
            ) : (
              <p>No expense data for this period</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const prepareChartData = (transactions) => {
  const categoryTotals = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: generateColors(labels.length),
      },
    ],
  };
};

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${(i * 360) / count}, 70%, 50%)`);
  }
  return colors;
};

export default ChartVisualization;