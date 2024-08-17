import './assets/productComponent.style.css';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { CustomButton, WarningButton } from './CustomUIComponents';

const WarningModal = ({ open, onClose, onConfirm, warningTitle }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <h4 className="warning-title">{warningTitle}</h4>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <WarningButton
          onClick={onClose}
          variant="contained"
          sx={{ textTransform: 'Capitalize' }}
        >
          No
        </WarningButton>
        <CustomButton
          onClick={() => {
            onConfirm();
            onClose();
          }}
          variant="contained"
          sx={{ textTransform: 'Capitalize' }}
        >
          Yes
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
