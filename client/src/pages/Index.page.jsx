import './assets/indexPage.style.css';
import { useEffect, useState } from 'react';
import Logout from '../components/Logout.component';
import { Button } from '@mui/material';
import AllProducts from '../components/AllProducts.component';
import MyProducts from '../components/MyProducts.component';

const Index = () => {
  const [isAllProducts, setIsAllProducts] = useState(() => {
    const savedState = localStorage.getItem('isAllProducts');
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  useEffect(() => {
    localStorage.setItem('isAllProducts', JSON.stringify(isAllProducts));
  }, [isAllProducts]);

  return (
    <div className="main-page-container">
      <div className="main-page-navigator-container">
        <div className="main-page-button-group">
          <Button
            className="button"
            variant="outlined"
            // disableElevation
            disabled={isAllProducts}
            onClick={() => setIsAllProducts(true)}
          >
            All Products
          </Button>
          <Button
            className="button"
            disabled={!isAllProducts}
            variant="outlined"
            // disableElevation
            onClick={() => setIsAllProducts(false)}
          >
            My Products
          </Button>
        </div>
        <Logout />
      </div>
      <div>{isAllProducts ? <AllProducts /> : <MyProducts />}</div>
    </div>
  );
};

export default Index;
