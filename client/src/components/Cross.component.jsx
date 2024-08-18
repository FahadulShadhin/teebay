import './assets/productComponent.style.css';
import cross from '../assets/cross.svg';
import { useNavigate } from 'react-router-dom';

const Cross = () => {
  const navigate = useNavigate();

  return (
    <img
      src={cross}
      alt="Icon Button"
      className="close-page-icon"
      onClick={() => navigate('/home')}
    />
  );
};

export default Cross;
