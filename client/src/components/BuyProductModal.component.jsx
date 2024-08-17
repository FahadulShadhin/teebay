import { useNavigate } from 'react-router-dom';
import WarningModal from './WarningModal.component';
import { useMutation } from '@apollo/client';
import { CREATE_TRANSACTION } from '../gql/mutations/transactionMutations';

const BuyProductModal = ({ open, onClose, warningTitle, productId }) => {
  const navigate = useNavigate();
  const [createTransaction, { loading, error }] =
    useMutation(CREATE_TRANSACTION);

  if (error) return <p>Something went wrong...</p>;
  if (loading) return <p>Loading...</p>;

  const handleBuy = async (productId) => {
    try {
      const response = await createTransaction({
        variables: {
          type: 'BUY',
          productId,
        },
      });
      console.log(response);
      onClose();
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(productId);
  return (
    <WarningModal
      open={open}
      onClose={onClose}
      onConfirm={() => handleBuy(productId)}
      warningTitle={warningTitle}
    />
  );
};

export default BuyProductModal;
