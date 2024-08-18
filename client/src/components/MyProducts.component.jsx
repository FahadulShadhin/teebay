import './assets/productComponent.style.css';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_MY_PRODUCTS } from '../gql/queries/productQueries';
import { DELETE_PRODUCT } from '../gql/mutations/productMutations';
import {
  formatProductCategory,
  truncateProductDescription,
  formatDateTime,
} from '../utils';
import DeleteButton from './DeleteButton.component';
import { CustomButton } from './CustomUIComponents';
import WarningModal from './WarningModal.component';
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_MY_PRODUCTS, {
    fetchPolicy: 'network-only',
  });
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  if (error) return <p>Something went wrong!</p>;

  const handleDeleteButtonClick = (event, productId) => {
    event.stopPropagation();
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const handleProductDelete = async () => {
    try {
      const response = await deleteProduct({
        variables: {
          id: selectedProductId,
        },
        refetchQueries: [{ query: GET_MY_PRODUCTS }],
      });
      console.table(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="products-list-container">
      <h1 className="title">My Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="products-list">
          {data.userProducts.map((product) => (
            <div
              key={`all_products_${product.id}`}
              className="product-item"
              onClick={() => navigate(`/product-edit/${product.id}`)}
            >
              <div className="product-heading-group">
                <h2>{product.title}</h2>
                <DeleteButton
                  onClick={(event) =>
                    handleDeleteButtonClick(event, product.id)
                  }
                />
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
                  onClick={() => navigate(`/product-edit/${product.id}`)}
                >
                  ... More details
                </span>
              </div>
              <span className="product-post-date">
                Date posted: {formatDateTime(product.createdAt)}
              </span>
            </div>
          ))}

          <CustomButton
            className="button add-product-btn"
            onClick={() => navigate('/create-product')}
          >
            Add product
          </CustomButton>
        </div>
      )}

      <WarningModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleProductDelete}
        warningTitle={'Are you sure you want to delete this product?'}
      />
    </div>
  );
};

export default MyProducts;
