import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const CustomTextField = styled(TextField)({
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

export const CustomButton = styled(Button)(() => ({
  color: '#ffffff',
  backgroundColor: '#6c61f7',
  '&:hover': {
    backgroundColor: '#6c61f7',
  },
}));

export const WarningButton = styled(Button)(() => ({
  color: '#ffffff',
  backgroundColor: '#d2445b',
  '&:hover': {
    backgroundColor: '#d2445b',
  },
}));
