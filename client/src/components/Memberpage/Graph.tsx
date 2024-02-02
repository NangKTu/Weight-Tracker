import React, { useState } from 'react';
import WeightChart from './WeightChart';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface WeightData {
  weight: number;
  created_at: string;
}

const YourApp: React.FC = () => {
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  const [showChart, setShowChart] = useState<boolean>(false);

  const fetchDataAndToggleChart = async () => {
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
        setShowChart((prevShowChart) => !prevShowChart); // Toggle the value
      } else {
        console.error('Error fetching weight data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching weight data:', error);
    }
  };

  const last7DaysData = weightData.slice(-7);

  return (
    <div className="justify-content-center d-flex">
      <div>
        <button onClick={fetchDataAndToggleChart}>
          {showChart ? 'Hide Chart' : 'Show Chart'}
        </button>
      </div>
      <div>{showChart && <WeightChart data={last7DaysData} />}</div>
    </div>
  );
};

export default YourApp;
