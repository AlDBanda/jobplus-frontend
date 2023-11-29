import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';
import Alert from '../alert/alert';
import { useApi } from '../../hooks/useApi';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/AuthService';

export default function reset_password() {
  // State variables for password, password confirmation, and alert messages
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [alert, setAlert] = useState({});

  // React Router hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  // Custom hook for making API requests
  const { post } = useApi();

  const { resetPassword } = authService();

  // Extracting the 'code' parameter from the URL query string
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  // Function to handle a successful password reset
  const handleSuccess = () => {
    // Reset our state by clearing password and passwordConfirmation
    setPasswordConfirmation('');
    setPassword('');

    // Navigate to the login page
    navigate('/login');
  }

  const handleError = (err) => {
    setAlert(err);
  }
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default submission process when submitting the page

    await resetPassword(passwordConfirmation, password, code, handleSuccess, setAlert)
    
  
  };


  return (
    <>
      <Alert data={alert} />

      <form className="form form--page" onSubmit={handleSubmit}>
        {/* Using onSubmit to handle form submission */}
        <div className="form__group form__group--page">
          <label className="form__label">Password</label>
          <input
            className="form__field"
            type="password" // Change value to password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <label className="form__label">Password Confirmation</label>
          <input
            className="form__field"
            type="password" // Change value to password
            placeholder="Password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="form__group form__group--page">
          <button
            className="form__btn"
            type="submit"
          >
            Reset Password
          </button>
        </div>

        <footer>
          Remember Password? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
