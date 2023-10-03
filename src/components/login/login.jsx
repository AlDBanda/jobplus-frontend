import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/form.scss';
import Alert from '../alert/alert';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import cookie from 'js-cookie';
import { useAuth } from '../../contexts/AuthContext';

export default function login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});

  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();
  const { post } = useApi();

  const handleSuccess = (res) => {
    //set the jwt token in a cookie
    cookie.set('jobplus-token', res.data.jwt, {expires: 4 / 24 }); //expires in 4 hours
    

    //reset our state
    setIdentifier('');
    setPassword('');
    //set authenticated state to true
    setIsAuthenticated(true);
    //navigate to homepage
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default submission process when submitting the page


    // Checking if the function is being called correctly
    console.log('handleLogin called');
     
    await post ('auth/local', {
      data: { identifier, password },
      onSuccess: (res) => handleSuccess(res),
      onFailure: (err) => setAlert(err)
    });
  };
   
    // const res = await post('auth/local', {data: data});
    // console.log(res);

    // try {
    //   const response = await axios.post(
    //     'http://localhost:1337/api/auth/local', 
    //     data
    //   );
      
    //   //reset our state
    //   setIdentifier('');
    //   setPassword('');

    //   //navigate to home page
    //   navigate('/');
    // } catch (err) {
    //   setAlert(parseErrors(err));
    // }
  


  return (
    <>
    <Alert data={alert} />

    <form className="form form--page" onSubmit={handleSubmit}> {/* Using onSubmit to handle form submission */}
      <div className="form__group form__group--page">
        <label className="form__label">Email</label>
        <input
          className="form__field"
          type="text"
          placeholder="Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
      </div>

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
        <button
          className="form__btn" // Change input type to button
          type="submit" // Specify the button type as "submit" to trigger submission
        >
          Login
        </button>
      </div>

      <footer>
        Don't have an account? <Link to="/register">Register</Link>
        or  <Link to="/forgot-password">Forgot Password</Link>
      </footer>
    </form>
    </>
  );
  }