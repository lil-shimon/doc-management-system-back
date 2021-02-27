import { Button, CssBaseline, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';
import { OrderShowPage } from '../../components/organisms/OrderShowPage';
import { showOrder } from '../../redux/slicers/Order';
import { getOrderItems } from '../../redux/slicers/orderItem';
import { getAttachments } from '../../redux/slicers/attachment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../redux/selectors/order';
import { selectUsers } from '../../redux/slicers/user';
import { getConditionsById } from '../../redux/slicers/condition';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '75%',
    },
  })
);

export default function OrderShow() {
  //必要な定義
  const dispatch = useDispatch();
  const router = useRouter();

  //案件データを取得
  const orders = useSelector(getOrderById, shallowEqual);

  //ページ遷移関数
  const handleBack = () => {
    router.push('/orders/list');
  };

  //編集画面へ遷移する関数
  //@ts-ignore
  const handleEditPage = (id: number, conditionId: number, userId: number) => {
    dispatch(showOrder(id));
    dispatch(getOrderItems(id));
    dispatch(getAttachments(id));
    dispatch(getConditionsById(conditionId));
    dispatch(selectUsers(userId));
    router.push('/orders/edit');
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2>案件詳細</h2>
        </Grid>
        <Grid item xs>
          <Button variant="contained" onClick={handleBack}>
            戻る
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            variant="contained"
            color="primary"
            //@ts-ignore
            className={classes.button}
            onClick={() =>
              //@ts-ignore
              handleEditPage(orders.id, orders.condition_id, orders.user_id)
            }
          >
            編集
          </Button>
        </Grid>
      </Grid>
      {/* @ts-ignore */}
      <OrderShowPage orders={orders} id={orders.id} />
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
