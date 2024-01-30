import { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Cal() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="justisfy-content-center">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default Cal;
