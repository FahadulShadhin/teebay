import './assets/transactionsPage.style.css';
import cross from '../assets/cross.svg';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_MY_TRANSACTIONS } from '../gql/queries/userQueries';
import ProductCard from '../components/ProductCard.component';

const Bought = ({ boughtProducts }) => {
  return (
    <>
      {boughtProducts.map((transaction) => (
        <ProductCard key={transaction.id} product={transaction.product} path={'transaction-details'} />
      ))}
    </>
  );
};

const Sold = ({ soldProducts }) => {
  return (
    <>
      {soldProducts.map((transaction) => (
        <ProductCard key={transaction.id} product={transaction.product} path={'transaction-details'} />
      ))}
    </>
  );
};

const Borrowed = ({ borrowedProducts }) => {
  return (
    <>
      {borrowedProducts.map((transaction) => (
        <ProductCard key={transaction.id} product={transaction.product} path={'transaction-details'} />
      ))}
    </>
  );
};

const Lent = ({ lentProducts }) => {
  return (
    <>
      {lentProducts.map((transaction) => (
        <ProductCard key={transaction.id} product={transaction.product} path={'transaction-details'} />
      ))}
    </>
  );
};

const Transactions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') ? localStorage.getItem('activeTab') : 'bought');
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [soldProducts, setSoldProducts] = useState([]);
  const [borrowedProducts, setBorrowedProducts] = useState([]);
  const [lentProducts, setLentProducts] = useState([]);

  const { loading, error, data } = useQuery(GET_MY_TRANSACTIONS, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (data) {
      const boughtProducts = data.userTransactions.filter(
        (transaction) =>
          transaction.toUser.id === parseInt(localStorage.getItem('userId')) &&
          transaction.type === 'BUY'
      );

      const soldProducts = data.userTransactions.filter(
        (transaction) =>
          transaction.fromUser.id ===
            parseInt(localStorage.getItem('userId')) &&
          transaction.type === 'BUY'
      );

      const borrowedProducts = data.userTransactions.filter(
        (transaction) =>
          transaction.toUser.id === parseInt(localStorage.getItem('userId')) &&
          transaction.type === 'RENT'
      );

      const lentProducts = data.userTransactions.filter(
        (transaction) =>
          transaction.fromUser.id ===
            parseInt(localStorage.getItem('userId')) &&
          transaction.type === 'RENT'
      );

      console.log(boughtProducts);
      setBoughtProducts(boughtProducts);
      setSoldProducts(soldProducts);
      setBorrowedProducts(borrowedProducts);
      setLentProducts(lentProducts);
    }
  }, [data]);

  const renderComponent = () => {
    switch (activeTab) {
      case 'bought':
        return <Bought boughtProducts={boughtProducts} />;
      case 'sold':
        return <Sold soldProducts={soldProducts} />;
      case 'borrowed':
        return <Borrowed borrowedProducts={borrowedProducts} />;
      case 'lent':
        return <Lent lentProducts={lentProducts} />;
      default:
        return null;
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className="transactions-page-links-container">
        <div
          className={`button-wrapper ${
            activeTab === 'bought' ? 'active-tab' : ''
          }`}
        >
          <Button
            onClick={() => setActiveTab('bought')}
            sx={{
              flexGrow: '1',
              color: '#6559f4',
              fontSize: 20,
              textTransform: 'capitalize',
            }}
          >
            Bought
          </Button>
        </div>

        <div
          className={`button-wrapper ${
            activeTab === 'sold' ? 'active-tab' : ''
          }`}
        >
          <Button
            onClick={() => setActiveTab('sold')}
            sx={{
              flexGrow: '1',
              color: '#6559f4',
              fontSize: 20,
              textTransform: 'capitalize',
            }}
          >
            Sold
          </Button>
        </div>

        <div
          className={`button-wrapper ${
            activeTab === 'borrowed' ? 'active-tab' : ''
          }`}
        >
          <Button
            onClick={() => setActiveTab('borrowed')}
            sx={{
              flexGrow: '1',
              color: '#6559f4',
              fontSize: 20,
              textTransform: 'capitalize',
            }}
          >
            Borrowed
          </Button>
        </div>

        <div
          className={`button-wrapper ${
            activeTab === 'lent' ? 'active-tab' : ''
          }`}
        >
          <Button
            onClick={() => setActiveTab('lent')}
            sx={{
              flexGrow: '1',
              color: '#6559f4',
              fontSize: 20,
              textTransform: 'capitalize',
            }}
          >
            Lent
          </Button>
        </div>

        <img
          src={cross}
          alt="Icon Button"
          className="close-page-icon"
          onClick={() => navigate('/home')}
          style={{ margin: '1rem 2rem', width: '1.5rem' }}
        />
      </div>

      <div className="transactions-content">{renderComponent()}</div>
    </div>
  );
};

export default Transactions;
