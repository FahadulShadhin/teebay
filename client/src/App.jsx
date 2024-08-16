import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth.page';
import Index from './pages/Index.page';
import ProductDetails from './pages/ProductDetails.page';
import CreateProduct from './pages/CreateProduct.page';
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
              <Route path="/create-product" element={<CreateProduct />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
