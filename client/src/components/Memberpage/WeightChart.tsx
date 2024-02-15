import { Bar } from 'react-chartjs-2';
// import type { ChartOptions, } from 'chart.js';

interface WeightChartProps {
  data: { weight: number; created_at: string }[];
}

const WeightChart: React.FC<WeightChartProps> = ({ data }) => {
  const labels = data.map((entry) => entry.created_at);
  const weights = data.map((entry) => entry.weight);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Weight',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: weights,
      },
    ],
  };

  const chartOptions: any = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Weight',
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ maxWidth: '500px', height: '400px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default WeightChart;
