import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      firstName
      lastName
      email
      address
      phoneNumber
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>USERS</h1>
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                First Name
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Last Name
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Email
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Phone No.
              </th>
              <th style={{ border: '1px solid black', padding: '8px' }}>
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {user.firstName}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {user.lastName}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {user.email}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {user.phoneNumber}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {user.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
