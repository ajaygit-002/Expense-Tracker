import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useExpense } from '../context/ExpenseContext';
import { getCategoryWiseData } from '../utils/helpers';
import gsap from 'gsap';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
  const { expenses, categories } = useExpense();
  const chartRef = useRef(null);
  const categoryData = getCategoryWiseData(expenses);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    }
  }, []);

  const chartLabels = Object.keys(categoryData).map(catId => {
    const cat = categories.find(c => c.id === catId);
    return cat ? `${cat.icon} ${cat.name}` : catId;
  });

  const chartColors = Object.keys(categoryData).map(catId => {
    const cat = categories.find(c => c.id === catId);
    return cat?.color || '#9CA3AF';
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: chartColors.map(c => c + 'CC'),
        borderColor: chartColors,
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 11,
            weight: '600'
          },
          padding: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: '600'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  if (Object.keys(categoryData).length === 0) {
    return (
      <div ref={chartRef} className="chart-container card">
        <h3 className="chart-title">Category Breakdown</h3>
        <div className="empty-chart">
          <p>No expense data available</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={chartRef} className="chart-container card">
      <h3 className="chart-title">Category Breakdown</h3>
      <div className="chart-wrapper doughnut-wrapper">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default CategoryChart;
