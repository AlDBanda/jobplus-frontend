import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';
import Alert from '../alert/alert';
import authService from '../../services/AuthService';

export default function forgot_password() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({});

  const { forgotPassword } = authService();

  const handleSuccess = () => {
    //reset our state
    setEmail('');
    // set success alert
    setAlert({
      type: 'success',
      message: 'Please check your email for further instructions.',
    });
  };

  const handleError = (err) => {
    console.error('Error during password reset:', err); // Log the error for debugging
    setAlert(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default submission process when submitting the page

    console.log('Submitting forgot password request with email:', email); // Log the email for debugging

    await forgotPassword(email, handleSuccess, handleError);
  };

  return (
    <>
      <Alert data={alert} />

      <form className="form form--page" onSubmit={handleSubmit}>
        <div className="form__group form__group--page">
          <label className="form__label">Email</label>
          <input
            className="form__field"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          Have an account already? <Link to="/login">Login</Link>
        </footer>
      </form>
    </>
  );
}
