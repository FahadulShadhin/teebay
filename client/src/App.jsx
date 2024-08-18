import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth.page';
import Index from './pages/Index.page';
import ProductDetails from './pages/ProductDetails.page';
import TransactionDetails from './pages/TransactionDetails.page';
import EditProduct from './pages/EditProduct.page';
import CreateProduct from './pages/CreateProduct.page';
import Transactions from './pages/Transactions.page';
import { ApolloProvider } from '@apollo/client';
import ProtectedRoute from './components/HOC/ProtectedRoute.component';
import { client } from './gql/apolloClient';

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Index />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/transaction-details/:id" element={<TransactionDetails />} />
              <Route path="/product-edit/:id" element={<EditProduct />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
