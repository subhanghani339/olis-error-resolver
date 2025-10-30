import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import { PageRoutes } from './utils/page-routes';

import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ErrorTrackerPage from './pages/ErrorTrackerPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route 
              path={PageRoutes.LOGIN}
              element={<LoginPage />} 
            />
            
            <Route 
              path={PageRoutes.USERS}
              element={ 
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
              }
            />

            <Route 
              path={PageRoutes.ERROR_TRACKER} 
              element={
                <ProtectedRoute>
                  <ErrorTrackerPage />
                </ProtectedRoute>
            }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
