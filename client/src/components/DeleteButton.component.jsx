import './assets/productComponent.style.css';
import trashcan from '../assets/trashcan.svg';

const DeleteButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="delete-icon-button">
      <img src={trashcan} alt="Icon Button" className="delete-icon-image" />
    </button>
  );
};

export default DeleteButton;
