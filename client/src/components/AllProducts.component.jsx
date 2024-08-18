import './assets/productComponent.style.css';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../gql/queries/productQueries';
import { useEffect } from 'react';
import ProductCard from './ProductCard.component';

const AllProducts = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
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
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
