import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectItem: {
      minWidth: 200,
    },
  })
);

export default useStyles;
