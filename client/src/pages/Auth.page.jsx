import { useState } from 'react';
import Login from '../components/Login.component';
import Signup from '../components/Signup.component';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Auth;
