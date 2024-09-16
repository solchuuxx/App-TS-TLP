import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </Router>
);

export default App;
