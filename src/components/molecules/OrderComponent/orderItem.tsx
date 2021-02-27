import React, { FC, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from '../../organisms/OrderShowPage/style';
import Linkify from 'linkifyjs/react';
import { addSeparator } from '../../organisms/preview/preview';
import { dataDisplay, dateComponent } from '../OrderTableRow';
import Loading from '../Loading';

export const fileDisplay = (word: string | null) => {
  if (word === 'null') {
    return <> - </>;
  } else if (word === null) {
    return <> - </>;
  } else if (word === '') {
    return <> - </>;
  } else if (!word) {
    return <> - </>;
  } else {
    return <Linkify>'http://localhost/storage/' + `${word}`</Linkify>;
  }
};

export const OrderItem: FC<{
  orderItem: any;
  id: number;
}> = ({ orderItem, id }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs>
          <h4>受注日</h4>
          <p>{dateComponent(orderItem.order_date)}</p>
        </Grid>
        <Grid item xs={8}>
          <h4>商品内容サマリー</h4>
          <p>{dataDisplay(orderItem.note)}</p>
        </Grid>
        <Grid item xs>
          <h4>税抜金額</h4>
          <p>{addSeparator(orderItem.sub_total)}円</p>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs>
          <h4>見積書</h4>
          {fileDisplay(orderItem.quotation)}
        </Grid>
        <Grid item xs>
          <h4>注文書</h4>
          {fileDisplay(orderItem.invoice)}
        </Grid>
        <Grid item xs>
          <h4>請求</h4>
          <p>{dataDisplay(orderItem.claim)}</p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
