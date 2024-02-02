import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useCheckinContext } from './CheckinContext';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Cal() {
  const [value, onChange] = useState<Value>(new Date());
  const [checkedInDates, setCheckedInDates] = useState<Date[]>([]);
  const { refreshTrigger } = useCheckinContext();

  const fetchCheckedInDates = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found in sessionStorage.');
        return;
      }

      const response = await fetch('/api/user/checkins', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setCheckedInDates(
          data.map((item: { created_at: string }) => new Date(item.created_at))
        );
      } else {
        console.error('Failed to fetch check-in dates:', data.error);
      }
    } catch (error) {
      console.error('Error fetching check-in dates:', error);
    }
  };

  useEffect(() => {
    fetchCheckedInDates();
  }, [refreshTrigger]);

  const tileContent = ({ date }: { date: Date }) => {
    return checkedInDates.some(
      (checkedDate) => checkedDate.toDateString() === date.toDateString()
    ) ? (
      <span style={{ fontSize: '0.8em' }}>✅</span>
    ) : null;
  };

  return (
    <div className="justify-content-center d-flex">
      <Calendar onChange={onChange} value={value} tileContent={tileContent} />
    </div>
  );
}

export default Cal;
