import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './style';

export const TotalPriceNew: FC<{
  total_price: null | number;
}> = ({ total_price }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.totalPrice}>
        <Typography>合計概算金額</Typography>
        <Typography align="right" className={classes.fontEight}>
          (税込)
        </Typography>
        <Typography className={classes.yen}>{total_price}円</Typography>
      </div>
    </React.Fragment>
  );
};
