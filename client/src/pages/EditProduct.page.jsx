import './assets/productPage.style.css';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import {
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import { CustomButton } from '../components/CustomUIComponents';
import { UPDATE_PRODUCT } from '../gql/mutations/productMutations';
import { GET_PRODUCT_DETAILS } from '../gql/queries/productQueries';
import {
  formatProductCategoryFormData,
  formatRentTypeFormData,
  formatProductCategory,
  formatRentType,
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

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    reset,
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
  const {
    data: productData,
    loading: productLoading,
    error: productError
  } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { id: parseInt(id) },
  });
  const [createProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    variables: { id: parseInt(id) }, 
  });

  useEffect(() => {
    if (productData) {
      const formattedProductData = productData.product.categories.map(
        (product) => formatProductCategory(product)
      );
      console.log(formattedProductData)
      reset({
        title: productData.product.title,
        categories: formattedProductData,
        description: productData.product.description,
        price: productData.product.purchasePrice,
        rentPrice: productData.product.rentPrice,
        rentType: formatRentType(productData.product.rentPriceType),
      });
    }
  }, [productData, reset]);

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
      <div className="form-container edit-product-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="single-stage-form">
          <h3 className="subtitle">Title</h3>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />

          <h3 className="subtitle">Categories</h3>
          <Controller
            rules={{ required: true }}
            name="categories"
            control={control}
            render={({ field }) => (
              <Select
                multiple
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                renderValue={(selected) => selected.join(', ')}
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

          <h3 className="subtitle">Description</h3>
          <Controller
            rules={{ required: true }}
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={8}
                {...field}
              />
            )}
          />

          <div className="input-group-container">
            <div>
              <h3 className="subtitle grouped">Price</h3>
              <Controller
                rules={{ required: true }}
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    type="number"
                    variant="outlined"
                    fullWidth
                    sx={{ width: '250px' }}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="input-inner-group-container">
              <div>
                <h3 className="subtitle grouped">Rent</h3>
                <Controller
                  rules={{ required: true }}
                  name="rentPrice"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="number"
                      variant="outlined"
                      fullWidth
                      {...field}
                    />
                  )}
                />
              </div>

              <Controller
                rules={{ required: true }}
                name="rentType"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 6.1 }}
                    renderValue={(selected) => selected}
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
          </div>

          <div className="buttons-container edit-button">
            <CustomButton
              className="btn"
              type="submit"
              variant="contained"
              color="primary"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Edit product'
              )}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
