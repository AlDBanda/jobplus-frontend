import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import ApplyPage from './pages/ApplyPage';
import ListingsPage from './pages/ListingsPage';
import NotificationPage from './pages/NotificationPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SavedJobPage from './pages/SavedJobPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PrivateRoute from './components/private_route/private_route';

function App() {
  return (
    <Routes>
      <Route path="/*" element={
      <PrivateRoute>
        <Route path="/" element={<HomePage />} />
        <Route path="/applications" element={<ApplicationPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/saved-jobs" element={<SavedJobPage />} />
      </PrivateRoute>} 
      />

     
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
