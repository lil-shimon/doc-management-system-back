import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FlashState, setFlashSuccess } from '../../../redux/slicers/flash';
import { useDispatch } from 'react-redux';

const FlashMessage: React.FC<FlashState> = ({ type, message }) => {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const handleDeleteFlash = () => {
    dispatch(setFlashSuccess(''));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      onClick={handleDeleteFlash}
    >
      <Alert onClose={() => setOpen(false)} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default FlashMessage;
