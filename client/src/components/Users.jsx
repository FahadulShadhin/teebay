import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../gql/mutations/userMutations';
import { GET_USERS } from '../gql/queries/userQueries';
import { GET_PRODUCTS } from '../gql/queries/productQueries';

const Users = () => {
  // const { loading, error, data } = useQuery(GET_USERS);
  // const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [login, { loading, error, data }] = useMutation(LOGIN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) console.log(data.users);

  const handleLogin = async () => {
    try {
      const response = await login({
        variables: {
          email: 'test@email.com',
          password: '123',
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleLogin} disabled={loading}>
      Login
    </button>
  );
};

export default Users;
