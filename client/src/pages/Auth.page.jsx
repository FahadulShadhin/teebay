import { useState } from 'react';
import Login from '../components/Login.component';
import Signup from '../components/Signup.component';
import './assets/authPage.style.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page-container">
      {isLogin ? (
        <h2 className="title">Sign in</h2>
      ) : (
        <h2 className="title">Sign up</h2>
      )}

      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Auth;
