import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#c3cfd9',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#c3cfd9',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#c3cfd9',
    },
    '&:hover fieldset': {
      borderColor: '#c3cfd9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c3cfd9',
    },
  },
});

const CustomButton = styled(Button)(() => ({
  color: '#ffffff',
  backgroundColor: '#6c61f7',
  '&:hover': {
    backgroundColor: '#6c61f7',
  },
}));

export { CustomTextField, CustomButton };
