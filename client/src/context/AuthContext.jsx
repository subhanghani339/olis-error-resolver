import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authService.getProfile();
        setUser(res.data);
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    
    const { accessToken, refreshToken } = res.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    setUser(res.data);
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    setUser(res.data);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.log('Logout failed:', e);
    }

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
