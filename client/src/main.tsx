import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
