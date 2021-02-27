import React, { FC } from 'react';
import {
  Grid,
  TextField,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { dataDisplay } from '../OrderTableRow';

export const OrderDownComponent: FC<{
  order: any;
}> = ({ order }) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <h4>追加請求</h4>
          <p>{dataDisplay(order.additional_invoice)}</p>
        </Grid>
        <Grid item xs={3}>
          <h4>遠隔サイネージID</h4>
          <p>{dataDisplay(order.signnage_id)}</p>
        </Grid>
        <Grid item xs>
          <h4>備考</h4>
          <p>{dataDisplay(order.maintainance_note)}</p>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <h4>営業メモ</h4>
          <p>{dataDisplay(order.sale_note)}</p>
        </Grid>
        <Grid item xs>
          <h4>請求メモ</h4>
          <p>{dataDisplay(order.invoice_note)}</p>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
