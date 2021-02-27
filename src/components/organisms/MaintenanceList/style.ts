import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      minWidth: '105%',
    },
    address: {
      minWidth: '175%',
    },
    datePicker: {
      maxWidth: '55%',
    },
    workingHours: {
      maxWidth: '20%',
    },
    note: {
      minWidth: '100%',
    },
  })
);

export default useStyles;
