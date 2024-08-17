import './assets/productPage.style.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import {
  TextField,
  Box,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { CustomButton } from '../components/CustomUIComponents';
import { CREATE_PRODUCT } from '../gql/mutations/productMutations';
import {
  formatProductCategoryFormData,
  formatRentTypeFormData,
} from '../utils';

const categories = [
  'Electronics',
  'Furniture',
  'Home appliances',
  'Sporting goods',
  'Outdoor',
  'Toys',
];
const rentTypes = ['per day', 'per week', 'per month'];

const CreateProduct = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      title: '',
      categories: [],
      description: '',
      price: '',
      rentPrice: '',
      rentType: '',
    },
  });
  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const onNext = () => {
    setStage(stage + 1);
  };

  const onBack = () => {
    setStage(stage - 1);
  };

  const onSubmit = async (data) => {
    try {
      const response = await createProduct({
        variables: {
          title: data.title,
          categories: formatProductCategoryFormData(data.categories),
          description: data.description,
          purchasePrice: parseFloat(data.price),
          rentPrice: parseFloat(data.rentPrice),
          rentPriceType: formatRentTypeFormData(data.rentType),
        },
      });
      console.table(response.data);
    } catch (error) {
      console.log(error);
    }

    navigate('/home');
  };

  return (
    <div className="outer-container">
      <div className="multistage-form-container">
        {stage === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}
          >
            <h2 className="title multistage-form-title">
              Select a title for your product
            </h2>
            <Controller
              name="title"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
            <div className="buttons-container-first">
              <CustomButton
                className="btn"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
              >
                Next
              </CustomButton>
            </div>
          </form>
        )}

        {stage === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}
          >
            <h2 className="title multistage-form-title">Select Categories</h2>
            <Controller
              rules={{ required: true }}
              name="categories"
              control={control}
              render={({ field }) => (
                <Select
                  label="Categories"
                  multiple
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {selected.length === 0 ? (
                        <Typography color="textSecondary">
                          Select Categories
                        </Typography>
                      ) : (
                        selected.map((value) => (
                          <Box key={value} sx={{ m: 0.5 }}>
                            {value}
                          </Box>
                        ))
                      )}
                    </Box>
                  )}
                  displayEmpty
                  variant="outlined"
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={field.value.indexOf(category) > -1} />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <div className="buttons-container">
              <CustomButton
                className="btn"
                onClick={onBack}
                variant="contained"
                color="secondary"
              >
                Back
              </CustomButton>
              <CustomButton
                className="btn"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
                sx={{ ml: 2 }}
              >
                Next
              </CustomButton>
            </div>
          </form>
        )}

        {stage === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}
          >
            <h2 className="title multistage-form-title">Select Description</h2>
            <Controller
              rules={{ required: true }}
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  {...field}
                />
              )}
            />
            <div className="buttons-container">
              <CustomButton
                className="btn"
                onClick={onBack}
                variant="contained"
                color="secondary"
              >
                Back
              </CustomButton>
              <CustomButton
                className="btn"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
                sx={{ ml: 2 }}
              >
                Next
              </CustomButton>
            </div>
          </form>
        )}

        {stage === 4 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onNext();
            }}
          >
            <h2 className="title multistage-form-title">Select Price</h2>
            <Controller
              rules={{ required: true }}
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />

            <span className="sub-title">Rent</span>
            <div className="input-group-container">
              <Controller
                rules={{ required: true }}
                name="rentPrice"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Rent Price"
                    type="number"
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                    {...field}
                  />
                )}
              />
              <Controller
                rules={{ required: true }}
                name="rentType"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Rent Type"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    {rentTypes.map((rentType) => (
                      <MenuItem key={rentType} value={rentType}>
                        {rentType}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className="buttons-container">
              <CustomButton
                className="btn"
                onClick={onBack}
                variant="contained"
                color="secondary"
              >
                Back
              </CustomButton>
              <CustomButton
                className="btn"
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
                sx={{ ml: 2 }}
              >
                Next
              </CustomButton>
            </div>
          </form>
        )}

        {stage === 5 && (
          <form onSubmit={handleSubmit(onSubmit)} className="multistage-form">
            <h2 className="title multistage-form-title summary-title">
              Summary
            </h2>
            <div mb={2} className="summary-container">
              <span>
                <strong>Title:</strong> {watch('title')}
              </span>
              <span>
                <strong>Categories:</strong> {watch('categories').join(', ')}
              </span>
              <span>
                <strong>Description:</strong> {watch('description')}
              </span>
              <span>
                Price: ${watch('price')}, To rent: ${watch('rentPrice')}{' '}
                {watch('rentType')}
              </span>
            </div>
            <div className="buttons-container">
              <CustomButton
                className="btn"
                onClick={onBack}
                variant="contained"
                color="secondary"
              >
                Back
              </CustomButton>
              <CustomButton
                className="btn"
                type="submit"
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Submit'
                )}
              </CustomButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
