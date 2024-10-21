// src/components/DoughnutChart.jsx
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
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
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '300px', paddingTop: '-50px' }}> {/* Added paddingTop */}
      <h2>Doughnut Chart</h2>
      <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};
DoughnutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sector: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DoughnutChart;
