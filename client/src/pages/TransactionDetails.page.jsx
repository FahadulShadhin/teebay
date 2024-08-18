import './assets/productPage.style.css';
import cross from '../assets/cross.svg';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../gql/queries/productQueries';
import { useNavigate, useParams } from 'react-router-dom';
import { formatProductCategory } from '../utils';

const isOwnProduct = (userId) =>
  parseInt(localStorage.getItem('userId')) === userId;

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: parseInt(id) },
    fetchPolicy: 'network-only',
  });

  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>Loading...</p>;
  if (data) console.log(isOwnProduct(data.product.user.id));

  return (
    <div className="product-details-container">
      <img
        src={cross}
        alt="Icon Button"
        className="close-page-icon"
        onClick={() => navigate('/transactions')}
      />

      <h1 className="product-details-title">{data.product.title}</h1>
      <span className="product-owner">
        Owner: {data.product.user.firstName} {data.product.user.lastName}
      </span>
      <div className="product-details-categories-container">
        <span className="product-details-category">Categories: </span>
        {data.product.categories.map((category, index) => (
          <span key={`category-${index}`} className="product-details-category">
            {formatProductCategory(category)}{' '}
            {index < data.product.categories.length - 1 && ', '}
          </span>
        ))}
      </div>
      <span className="product-details-price">
        Price: ${data.product.purchasePrice}
      </span>
      <span className="product-details-description">
        {data.product.description}
      </span>
    </div>
  );
};

export default TransactionDetails;

