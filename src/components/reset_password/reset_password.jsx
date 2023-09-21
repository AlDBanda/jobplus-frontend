import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';
import Alert from '../alert/alert';
import { useApi } from '../../hooks/useApi';
import { useNavigate, useLocation } from 'react-router-dom';

export default function reset_password() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [alert, setAlert] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const { post } = useApi();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');

  const handleSuccess = () => {
    //reset our state
    setPasswordConfirmation('');
    setPassword('');
    //navigate to the login page
    navigate('/login');
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default submission process when submitting the page

   await post('auth/reset-password', {
    data: { passwordConfirmation, password, code},
    onSuccess: (res) => handleSuccess(),
    onFailure: (err) => setAlert(err)
   });
    // Checking if the function is being called correctly
    console.log('handleLogin called');

    // try {
    //   const response = await axios.post(
    //     'http://localhost:1337/api/auth/reset-password',
    //     data
    //   );

    //   // Reset our state
    //   setPasswordConfirmation('');
    //   setPassword('');

    //   // Navigate to the home page
    //   navigate('/login');
    // } catch (err) {
    //   setAlert(parseErrors(err));
    // }
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
