import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, DarkModeProvider, useDarkMode } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Chat from './pages/Chat.jsx';
import PrivateRoute from './utils/PrivateRoute.jsx';

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      onClick={toggleDarkMode}
      className="ml-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<PrivateRoute><Chat headerRight={<DarkModeToggle />} /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/chat" />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </AuthProvider>
      </Router>
    </DarkModeProvider>
  );
}

export default App;