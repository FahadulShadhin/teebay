import { useMutation } from '@apollo/client';
import { LOGIN } from '../gql/mutations/userMutations';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './assets/authComponent.style.css';
import { CustomTextField, CustomButton } from './CustomUIComponents';
import CircularProgress from '@mui/material/CircularProgress';

const Login = ({ onSwitch }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { loading, error }] = useMutation(LOGIN);

  const onSubmit = async (data) => {
    try {
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.data) {
        const token = response.data.login.token;
        const userId = response.data.login.user.id;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="title">Sign in</h2>
      <form
        className="form"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
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
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', {
            required: 'Password is required',
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <CustomButton
          className="button"
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </CustomButton>

        {error && <p className="error-msg">{error.message}</p>}

        <div className="auth-text-container">
          <span>Don't have an account? </span>
          <span className="link" onClick={onSwitch}>
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
