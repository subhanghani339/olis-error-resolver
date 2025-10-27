import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import ErrorTrackerPage from './pages/ErrorTrackerPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/error" element={<ErrorTrackerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
