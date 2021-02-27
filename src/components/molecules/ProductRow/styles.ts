import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bigger: {
      minWidth: 300,
    },
    smaller: {
      maxWidth: 40,
    },
    normal: {
      maxWidth: 80,
    },
    memo: {
      minWidth: 900,
    },
  })
);

export default useStyles;
