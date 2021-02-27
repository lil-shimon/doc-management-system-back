import { Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getListProduct } from '../../../redux/selectors/product';
import useStyles from './styles';

export const ProductShow: FC<{}> = ({}) => {
  //必要な定数を定義
  const classes = useStyles();

  //必要なデータを取得
  const products = useSelector(getListProduct, shallowEqual);

  return (
    <React.Fragment>
      {products.map(p => (
        <Paper className={classes.padding}>
          <h4>商品名</h4>
          <p>{p.name}</p>
          <h4>単位</h4>
          <p>{p.unit}</p>
          <h4>単価</h4>
          <p>{p.unit_price}</p>
          <h4>商品メモ</h4>
          <p>{p.notes}</p>
        </Paper>
      ))}
    </React.Fragment>
  );
};
