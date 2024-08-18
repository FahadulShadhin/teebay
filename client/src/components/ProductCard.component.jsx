import './assets/productComponent.style.css';
import { useNavigate } from 'react-router-dom';
import {
  formatDateTime,
  formatProductCategory,
  truncateProductDescription,
} from '../utils';

const ProductCard = ({ product, path }) => {
  const navigate = useNavigate();

  return (  
    <div
      className="product-item"
      onClick={() => navigate(`/${path}/${product.id}`)}
    >
      <h2>{product.title}</h2>
      <div className="product-categories-container">
        <span className="product-category">Categories: </span>
        {product.categories.map((category, index) => (
          <span className="product-category" key={`category_${index}`}>
            {formatProductCategory(category)}
            {index < product.categories.length - 1 && ', '}
          </span>
        ))}
      </div>
      <span className="product-price">Price: ${product.purchasePrice}</span>
      <div>
        <span className="product-description">
          {truncateProductDescription(product.description, 300)}{' '}
        </span>
        <span
          className="link"
          onClick={() => navigate(`/${path}/${product.id}`)}
        >
          ... More details
        </span>
      </div>
      <span className="product-post-date">
        Date posted: {formatDateTime(product.createdAt)}
      </span>
    </div>
  );
};

export default ProductCard;
