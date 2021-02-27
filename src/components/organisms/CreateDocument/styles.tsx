import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      marginTop: '25px',
    },
    divider: {
      margin: theme.spacing(2),
    },
    width: {
      width: '100%',
    },
    option: {
      width: '100%',
    },
    bigger: {
      minWidth: 150,
    },
    smaller: {
      maxWidth: 40,
    },
  })
);

export default useStyles;
