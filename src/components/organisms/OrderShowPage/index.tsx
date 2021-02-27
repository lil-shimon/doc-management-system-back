import React, { FC, useEffect, useState } from 'react';
import useStyles from './style';
import { Divider, Paper, Typography, Grid } from '@material-ui/core';
import { OrderComponent } from '../../molecules/OrderComponent';
import { OrderDownComponent } from '../../molecules/OrderComponent/orderDownConponent';
import { OrderItem } from '../../molecules/OrderComponent/orderItem';
import { useSelector, shallowEqual } from 'react-redux';
import { getListOrderItem } from '../../../redux/selectors/orderItem';
import { getListAttachment } from '../../../redux/selectors/attachment';
import { AttachmentShow } from '../../molecules/OrderComponent/attachmentShow';
import { TotalPriceShow } from '../../molecules/OrderComponent/totalPriceShow';

export const OrderShowPage: FC<{ orders: any; id: number }> = ({
  orders,
  id,
}) => {
  //必要な定数を定義
  const classes = useStyles();
  const orderItems = useSelector(getListOrderItem, shallowEqual);
  const attachments = useSelector(getListAttachment, shallowEqual);
  const [order_info, setOrderInfo] = useState([orders]);

  console.log('attachment', attachments);

  return (
    <Typography>
      <Paper className={classes.page}>
        {order_info.map(o => (
          <OrderComponent order={orders} />
        ))}
        <Divider variant="middle" className={classes.divider} />
        {orderItems.map(orderItem => (
          <OrderItem orderItem={orderItem} id={id} />
        ))}
        <Divider variant="middle" className={classes.divider} />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TotalPriceShow total_price={orders.total_price} />
          </Grid>
          <Grid item xs={8}>
            <AttachmentShow attachment={attachments} id={id} />
          </Grid>
        </Grid>
        <Divider variant="middle" className={classes.divider} />
        <OrderDownComponent order={orders} />
      </Paper>
    </Typography>
  );
};
