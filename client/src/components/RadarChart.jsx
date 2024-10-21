// src/components/RadarChart.jsx
import { Radar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const RadarChart = ({ serverData }) => {
    const uniquePestle = [...new Set(serverData.map(item => item.pestle).filter(pestle => pestle !== ""))];

    const pestleCount = uniquePestle.map(item => ({
        pestle: item,
        count: serverData.filter(i => i.pestle === item).length,
    }));

    return (
        <div style={{ height: '50vh', width: '45vw' }}>
            <Radar
                data={{
                    labels: uniquePestle,
                    datasets: [
                        {
                            label: "Projects",
                            data: pestleCount.map(i => i.count),
                            borderWidth: 1,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Optional: for better visibility
                            borderColor: 'rgba(75, 192, 192, 1)', // Optional: for better visibility
                        },
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            type: 'linear',
                            beginAtZero: true,
                        },
                    },
                }}
                height={300}
            />
        </div>
    );
};

RadarChart.propTypes = {
    serverData: PropTypes.array.isRequired,
};

// Corrected export statement
export default RadarChart;
