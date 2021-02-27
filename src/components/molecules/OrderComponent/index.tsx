import React, { FC } from 'react';
import { Divider, Grid, Paper } from '@material-ui/core';
import useStyles from '../../organisms/OrderShowPage/style';
import moment from 'moment';
import { getListUser } from '../../../redux/selectors/user';
import { useSelector, shallowEqual } from 'react-redux';
import { getConditionsById } from '../../../redux/selectors/condition';
import { dataDisplay, dateComponent } from '../OrderTableRow';

export const OrderComponent: FC<{
  order: any;
}> = ({ order }) => {
  const classes = useStyles();
  const users = useSelector(getListUser, shallowEqual);
  const conditions = useSelector(getConditionsById, shallowEqual);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs>
          <h4>日付</h4>
          <p>{moment(order.created_at).format('YYYY年MM月DD日')}</p>
        </Grid>
        <Grid item xs>
          <h4>担当者</h4>
          {users.map(u => (
            <p>{u.name}</p>
          ))}
        </Grid>
        <Grid item xs>
          <h4>現況</h4>
          <p>{dataDisplay(order.condition_name)}</p>
        </Grid>
        <Grid item xs>
          <h4>請求日</h4>
          <p>{dataDisplay(order.payment)}</p>
        </Grid>
      </Grid>
      {/* @ts-ignore */}
      <Divider variant="middle" className={classes.divider} />
      {/* @ts-ignore */}
      <div className={classes.unitprice}>
        <Grid container spacing={2}>
          <Grid item xs>
            <h4>会社名</h4>
            <p>{dataDisplay(order.company_name)}</p>
          </Grid>
          <Grid item xs>
            <h4>電話番号</h4>
            <p>{dataDisplay(order.phone_number)}</p>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" className={classes.divider} />
      <div>
        <Grid container spacing={4}>
          <Grid item xs>
            <h4>稼働日</h4>
            <p>{dateComponent(order.start_date)}</p>
          </Grid>
          <Grid item xs>
            <h4>終了日</h4>
            <p>{dateComponent(order.end_date)}</p>
          </Grid>
          <Grid item xs>
            <h4>稼働予定日</h4>
            <p>{dateComponent(order.expected_start_date)}</p>
          </Grid>
          <Grid item xs>
            <h4>終了予定日</h4>
            <p>{dateComponent(order.expected_end_date)}</p>
          </Grid>
        </Grid>
        <Divider variant="middle" className={classes.divider} />
        <Grid container spacing={2}>
          <Grid item xs>
            <h4>納入先/現場名</h4>
            <p>{dataDisplay(order.site_name)}</p>
          </Grid>
          <Grid item xs>
            <h4>納入先電話番号</h4>
            <p>{dataDisplay(order.site_representative_phone)}</p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs>
            <h4>現場担当者</h4>
            <p>{dataDisplay(order.site_representative)}</p>
          </Grid>
          <Grid item xs>
            <h4>メールアドレス</h4>
            <p>{dataDisplay(order.site_mail)}</p>
          </Grid>
        </Grid>
        <h4>現場住所</h4>
        <p>{dataDisplay(order.site_address)}</p>
      </div>
    </React.Fragment>
  );
};
