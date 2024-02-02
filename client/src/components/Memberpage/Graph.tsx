import { useState, useEffect } from 'react';
import WeightChart from './WeightChart';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface WeightData {
  weight: number;
  created_at: string;
}

const YourApp: React.FC = () => {
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.error('Token not found in sessionStorage.');
          return;
        }

        const response = await fetch('/api/user-weights', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: WeightData[] = await response.json();
          setWeightData(data);
        } else {
          console.error('Error fetching weight data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching weight data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeightData();
  }, []);

  const last7DaysData = weightData.slice(-7);

  return (
    <div className="justify-content-center d-flex">
      {loading ? (
        <p>Loading weight data...</p>
      ) : (
        <WeightChart data={last7DaysData} />
      )}
    </div>
  );
};

export default YourApp;
