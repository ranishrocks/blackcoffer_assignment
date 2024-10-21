// src/components/BarChart.jsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>; // Handle no data case
  }

  // Aggregate data by sector
  const sectorMap = {};

  data.forEach(entry => {
    const sector = entry.sector;
    const value = entry.value ?? 0; // Use 0 if value is undefined

    if (sectorMap[sector]) {
      sectorMap[sector] += value; // Sum up values for existing sector
    } else {
      sectorMap[sector] = value; // Initialize value for new sector
    }
  });

  // Prepare the data for the chart
  const sectors = Object.keys(sectorMap);
  const values = Object.values(sectorMap);

  const chartData = {
    labels: sectors,
    datasets: [
      {
        label: 'Intensity', // You can change this label
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize colors as needed
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};
BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      sector: PropTypes.string.isRequired,
      value: PropTypes.number,
    })
  ).isRequired,
};

export default BarChart;

