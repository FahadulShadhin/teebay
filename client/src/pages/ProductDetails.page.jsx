import './assets/productPage.style.css';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_DETAILS } from '../gql/queries/productQueries';
import { useParams } from 'react-router-dom';
import { formatProductCategory } from '../utils';
import { CustomButton } from '../components/CustomUIComponents';
import RentProductModal from '../components/RentProductModal.component';
import BuyProductModal from '../components/BuyProductModal.component';

const isOwnProduct = (userId) =>
  parseInt(localStorage.getItem('userId')) === userId;

const ProductDetails = () => {
  const { id } = useParams();
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [rentModalOpen, setrentModalOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: parseInt(id) },
  });

  if (error) return <p>Something went wrong!</p>;
  if (loading) return <p>Loading...</p>;
  if (data) console.log(isOwnProduct(data.product.user.id));

  return (
    <div className="product-details-container">
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

      {!isOwnProduct(data.product.user.id) ? (
        <div className="product-details-buttons">
          <CustomButton
            variant="contained"
            sx={{ textTransform: 'Capitalize' }}
            onClick={() => setrentModalOpen(true)}
          >
            Rent
          </CustomButton>
          <CustomButton
            variant="contained"
            sx={{ textTransform: 'Capitalize' }}
            onClick={() => setBuyModalOpen(true)}
          >
            Buy
          </CustomButton>
        </div>
      ) : (
        <></>
      )}

      <BuyProductModal
        open={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        onConfirm={() => console.log(`BUY: ${data.product.title}`)}
        warningTitle={'Are you sure you want to buy this product?'}
        productId={data.product.id}
      />

      <RentProductModal
        open={rentModalOpen}
        onClose={() => setrentModalOpen(false)}
        onConfirm={() => console.log(`RENT: ${data.product.title}`)}
        productId={data.product.id}
      />
    </div>
  );
};

export default ProductDetails;
