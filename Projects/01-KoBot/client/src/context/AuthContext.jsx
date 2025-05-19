import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();
const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode !== null ? savedMode === 'true' : true; // Default to true if not set
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally decode token for user info
      setUser({ token });
    }
  }, []);

  const register = async (username, password) => {
    try {
      const res = await api.post('/auth/register', { username, password });
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token });
      toast.success('Registration successful!');
      navigate('/chat');
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', { username });
      const res = await api.post('/auth/login', { username, password });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
        toast.success('Login successful!');
        navigate('/chat');
      } else {
        toast.error('Invalid response from server');
        console.error('No token in response:', res.data);
      }
    } catch (err) {
      console.error('Login error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}