import { useMutation } from '@apollo/client';
import { SIGNUP } from '../gql/mutations/userMutations';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './assets/authComponent.style.css';
import { CustomTextField, CustomButton } from './CustomUIComponents';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = ({ onSwitch }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [signup, { loading, error }] = useMutation(SIGNUP);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await signup({
        variables: {
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          address: data.address,
          phoneNumber: data.phone,
          password: data.password,
          confirmPassword: data.confirmpassword,
        },
      });

      if (response.data) {
        const token = response.data.signup.token;
        const userId = response.data.signup.user.id;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('authToken', token);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Sign up</h2>
      <form
        className="form"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <div className="form-row-inputs-container">
          <CustomTextField
            margin="normal"
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            {...register('firstname', { required: 'First Name is required' })}
            error={!!errors.firstname}
            helperText={errors.firstname ? errors.firstname.message : ''}
          />
          <CustomTextField
            margin="normal"
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            {...register('lastname', { required: 'Last Name is required' })}
            error={!!errors.lastname}
            helperText={errors.lastname ? errors.lastname.message : ''}
          />
        </div>
        <CustomTextField
          margin="normal"
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          {...register('address', { required: 'Address is required' })}
          error={!!errors.address}
          helperText={errors.address ? errors.address.message : ''}
        />
        <div className="form-row-inputs-container">
          <CustomTextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
          <CustomTextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            {...register('phone', {
              required: 'Phone Number is required',
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'Invalid phone number',
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ''}
          />
        </div>
        <CustomTextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          {...register('password', {
            required: 'Password is required',
            // minLength: {
            //   value: 6,
            //   message: 'Password must be at least 6 characters long',
            // },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <CustomTextField
          margin="normal"
          fullWidth
          name="confirmpassword"
          label="Confirm Password"
          type="password"
          id="confirmpassword"
          autoComplete="new-password"
          {...register('confirmpassword', {
            required: 'Confirm Password is required',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          })}
          error={!!errors.confirmpassword}
          helperText={
            errors.confirmpassword ? errors.confirmpassword.message : ''
          }
        />
        <CustomButton
          className="button"
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </CustomButton>

        {error && <p className="error-msg">{error.message}</p>}

        <div className="auth-text-container">
          <span>Already have an account? </span>
          <span className="link" onClick={onSwitch}>
            Sign in
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
