import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage/HomePage';
import MemPage from './components/Memberpage/MemPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/memPage" element={<MemPage />} />
      </Routes>
    </Router>
  )
}

export default App
