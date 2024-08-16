import './assets/productComponent.style.css';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_MY_PRODUCTS } from '../gql/queries/productQueries';
import {
  formatProductCategory,
  truncateProductDescription,
  formatDateTime,
} from '../utils';
import DeleteButton from './deleteButton.component';
import { CustomButton } from './CustomUIComponents';
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_MY_PRODUCTS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error) return <p>Something went wrong!</p>;

  return (
    <div className="products-list-container">
      <h1 className="title">All Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-list">
          {data.userProducts.map((product) => (
            <div key={`all_products_${product.id}`} className="product-item">
              <div className="product-heading-group">
                <h2>{product.title}</h2>
                <DeleteButton />
              </div>
              <div className="product-categories-container">
                <span className="product-category">Categories: </span>
                {product.categories.map((category, index) => (
                  <span className="product-category" key={`category_${index}`}>
                    {formatProductCategory(category)}
                    {index < product.categories.length - 1 && ', '}
                  </span>
                ))}
              </div>
              <span className="product-price">
                Price: ${product.purchasePrice}
              </span>
              <div>
                <span className="product-description">
                  {truncateProductDescription(product.description, 300)}{' '}
                </span>
                <span
                  className="link"
                  onClick={() => navigate(`/product-details/${product.id}`)}
                >
                  ... More details
                </span>
              </div>
              <span className="product-post-date">
                Date posted: {formatDateTime(product.createdAt)}
              </span>
            </div>
          ))}

          <CustomButton className="button add-product-btn">
        Add product
      </CustomButton>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
