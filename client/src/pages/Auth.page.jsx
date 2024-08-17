import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login.component';
import Signup from '../components/Signup.component';
import './assets/authPage.style.css';

const Auth = () => {
  const [isLoginComponent, setIsLoginComponent] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) navigate('/home')
  }, [navigate])

  return (
    <div className="auth-page-container">
      {isLoginComponent ? (
        <h2 className="title">Sign in</h2>
      ) : (
        <h2 className="title">Sign up</h2>
      )}

      {isLoginComponent ? (
        <Login onSwitch={() => setIsLoginComponent(false)} />
      ) : (
        <Signup onSwitch={() => setIsLoginComponent(true)} />
      )}
    </div>
  );
};

export default Auth;
