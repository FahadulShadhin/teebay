import { WarningButton } from '../components/CustomUIComponents';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/');
  };
  return (
    <div>
      <WarningButton variant="contained" onClick={handleLogout}>
        Logout
      </WarningButton>
    </div>
  );
};

export default Logout;
