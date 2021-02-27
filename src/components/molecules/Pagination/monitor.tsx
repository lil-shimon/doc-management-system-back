import React, { useState, useEffect, FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getLastPage } from '../../../redux/selectors/product';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const ProductPagenation: FC<{ getProduct: any }> = ({ getProduct }) => {
  const classes = useStyles();
  const lastPage = useSelector(getLastPage, shallowEqual);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useDispatch();
  const handleChangePage = (
    event: any,
    value: React.SetStateAction<number>
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(getProduct(currentPage));
  }, [currentPage]);

  return (
    <div className={classes.root}>
      <Pagination
        count={lastPage}
        page={currentPage}
        color="primary"
        onChange={handleChangePage}
      />
    </div>
  );
};
