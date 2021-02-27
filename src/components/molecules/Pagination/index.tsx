import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const OrderPagination: FC<{
  handleChangeCurrentPage: any;
  last_page: number;
  current_page: number;
}> = ({ handleChangeCurrentPage, last_page, current_page }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={last_page}
        page={current_page}
        onChange={handleChangeCurrentPage}
        color="primary"
      />
    </div>
  );
};
