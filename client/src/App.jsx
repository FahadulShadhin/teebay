import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth.page';
import Index from './pages/Index.page';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import ProtectedRoute from './components/HOC/ProtectedRoute.component';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Index />} />
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
