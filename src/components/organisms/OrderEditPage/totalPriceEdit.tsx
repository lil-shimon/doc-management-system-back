import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './style';
import { addSeparator } from '../preview/preview';

export const TotalPriceEdit: FC<{
  total_price: null | number;
}> = ({ total_price }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.totalPrice}>
        <h4>税込金額</h4>
        <p className={classes.yen}>
          {addSeparator(total_price)}円
        </p>
      </div>
    </React.Fragment>
  );
};
