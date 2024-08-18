import './assets/productComponent.style.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CREATE_TRANSACTION } from '../gql/mutations/transactionMutations';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { CustomButton, WarningButton } from './CustomUIComponents';
import './assets/productComponent.style.css';
import { formatRentDateTimeFormData } from '../utils';

const isInvalidRentDates = (startDate, endDate) => {
  function parseDate(timestamp) {
    const date = new Date(timestamp);
    return date.getTime();
  }

  return parseDate(startDate) > parseDate(endDate);
};

const RentProductModal = ({ open, onClose, onConfirm, productId }) => {
  const navigate = useNavigate();
  const [rentError, setRentError] = useState(null);
  const [createTransaction, { loading, error }] =
    useMutation(CREATE_TRANSACTION);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  if (error) return <p>Something went wrong...</p>;
  if (loading) return <p>Loading...</p>;

  const onSubmit = async (data) => {
    const startDate = formatRentDateTimeFormData(data.startDate);
    const endDate = formatRentDateTimeFormData(data.endDate);

    if (isInvalidRentDates(startDate, endDate)) {
      setRentError('Please select appropriate Start date and End date.');
      return;
    }

    try {
      const response = await createTransaction({
        variables: {
          type: 'RENT',
          productId,
          rentStartDate: startDate,
          rentEndDate: endDate,
        },
      });
      console.log(response);
      onConfirm();
      onClose();
      localStorage.setItem('activeTab', 'borrowed')
      navigate('/transactions');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ overflow: 'visible' }}>
      <DialogContent sx={{ overflow: 'visible' }}>
        <h4 className="warning-title">Rental period</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="datepicker-outer-container">
            <div className="datepicker-inner-container">
              <span>From</span>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholderText="Select start date"
                    dateFormat="dd/MM/yyyy"
                  />
                )}
              />
            </div>

            <div className="datepicker-inner-container">
              <span>To</span>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    placeholderText="Select end date"
                    dateFormat="dd/MM/yyyy"
                  />
                )}
              />
            </div>
          </div>

          {rentError ? <span>{rentError}</span> : <></>}

          <DialogActions sx={{ p: 2, mt: 6 }}>
            <WarningButton
              onClick={onClose}
              variant="contained"
              sx={{ textTransform: 'Capitalize' }}
            >
              Go back
            </WarningButton>
            <CustomButton
              type="submit"
              variant="contained"
              sx={{ textTransform: 'Capitalize' }}
            >
              Confirm rent
            </CustomButton>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RentProductModal;
