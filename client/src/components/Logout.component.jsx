import { WarningButton } from '../components/CustomUIComponents';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAllProducts');
    navigate('/');
  };
  return (
    <div>
      <WarningButton
        className="button"
        variant="contained"
        onClick={handleLogout}
      >
        Logout
      </WarningButton>
    </div>
  );
};

export default Logout;
