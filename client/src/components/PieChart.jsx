// src/components/PieChart.jsx
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>; // Handle no data case
  }

  const sectorCounts = data.reduce((acc, entry) => {
    acc[entry.sector] = (acc[entry.sector] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(sectorCounts),
    datasets: [
      {
        label: 'Sector Distribution',
        data: Object.values(sectorCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',   // Red
          'rgba(54, 162, 235, 0.6)',   // Blue
          'rgba(255, 206, 86, 0.6)',   // Yellow
          'rgba(75, 192, 192, 0.6)',   // Green
          'rgba(153, 102, 255, 0.6)',  // Purple
          'rgba(255, 159, 64, 0.6)',   // Orange
          'rgba(255, 193, 7, 0.6)',    // Amber
          'rgba(105, 240, 174, 0.6)',  // Mint
          'rgba(255, 87, 51, 0.6)',    // Bright Red
          'rgba(76, 175, 80, 0.6)',    // Dark Green
          'rgba(0, 188, 212, 0.6)',    // Cyan
          'rgba(63, 81, 181, 0.6)',    // Indigo
          'rgba(156, 39, 176, 0.6)',   // Deep Purple
          'rgba(244, 67, 54, 0.6)',    // Bright Pink
          'rgba(33, 150, 243, 0.6)',   // Light Blue
        ],
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '300px', paddingTop: '20px' }}> {/* Added paddingTop */}
      <h2>Pie Chart</h2>
      <Pie data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sector: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PieChart;
