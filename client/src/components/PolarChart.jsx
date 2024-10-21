import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { PolarArea } from 'react-chartjs-2';

const PolarChart = ({ serverData }) => {
  const chartRef = useRef(null);

  const uniqueSectors = [...new Set(serverData.map((i) => i.sector).filter(Boolean))];
  const sectorCount = uniqueSectors.map((item) => serverData.filter((i) => i.sector === item).length);

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '300px', paddingTop: '20px' }}> {/* Added paddingTop */}
      <PolarArea
        ref={chartRef}
        data={{
          labels: uniqueSectors,
          datasets: [
            {
              label: 'Sector Count',
              data: sectorCount,
              borderWidth: 1,
              hoverOffset: 5,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
        }}
        height={300}
      />
    </div>
  );
};

PolarChart.propTypes = {
  serverData: PropTypes.arrayOf(
    PropTypes.shape({
      sector: PropTypes.string,
    })
  ).isRequired,
};

export default PolarChart;
