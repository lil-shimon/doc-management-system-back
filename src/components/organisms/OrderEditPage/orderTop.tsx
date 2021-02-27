import React, { FC, useEffect, useState } from 'react';
import {
  Grid,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Divider,
} from '@material-ui/core';
import useStyles from './style';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getListUser } from '../../../redux/selectors/user';
import { getUsers } from '../../../redux/slicers/user';
import moment from 'moment';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const OrderTop: FC<{
  start_date: null | Date;
  end_date: null | Date;
  expected_start_date: null | Date;
  expected_end_date: null | Date;
  invoice_note: string | null;
  sale_note: string | null;
  maintainance_note: string | null;
  sim_number: string | null;
  signnage_id: string | null;
  total_price: number | null;
  user_id: null | number;
  company_name: null | string;
  site_name: null | string;
  phone_number: null | string;
  site_representative: null | string;
  site_representative_phone: null | string;
  site_mail: null | string;
  site_address: null | string;
  condition_name: string;
  additional_invoice: string;
  created_at: Date | null;
  payment: string | null;
  handleChangeStartDate: any;
  handleChangeEndDate: any;
  handleChangeExpectedStartDate: any;
  handleChangeExpectedEndDate: any;
  handleChangeInvoiceNote: any;
  handleChangeSaleNote: any;
  handleChangeMaintainanceNote: any;
  handleChangeSimNumber: any;
  handleChangeSignnageId: any;
  handleChangeTotalPrice: any;
  handleChangeCompanyName: any;
  handleChangeSiteName: any;
  handleChangePhoneNumber: any;
  handleChangeSiteRepresentative: any;
  handleChangeSiteRepresentativePhone: any;
  handleChangeSiteMail: any;
  handleChangeSiteAddress: any;
  handleChangeConditionName: any;
  handleChangeAdditionalInvoice: any;
  handleChangeUserId: any;
  handleChangePayment: any;
}> = ({
  start_date,
  end_date,
  expected_start_date,
  expected_end_date,
  user_id,
  company_name,
  site_name,
  phone_number,
  site_representative,
  site_representative_phone,
  site_mail,
  site_address,
  condition_name,
  created_at,
  payment,
  handleChangeStartDate,
  handleChangeEndDate,
  handleChangeExpectedStartDate,
  handleChangeExpectedEndDate,
  handleChangeCompanyName,
  handleChangeSiteName,
  handleChangePhoneNumber,
  handleChangeSiteRepresentative,
  handleChangeSiteRepresentativePhone,
  handleChangeSiteMail,
  handleChangeSiteAddress,
  handleChangeConditionName,
  handleChangeUserId,
  handleChangePayment,
}) => {
  //使う関数を定義
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(getListUser, shallowEqual);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            value={moment(created_at).format('YYYY年MM月DD日')}
            fullWidth
            label="日付"
          />
        </Grid>
        <Grid item xs>
          <FormControl required className={classes.width}>
            <InputLabel>担当</InputLabel>
            <Select
              required
              value={user_id}
              onChange={e => handleChangeUserId(e)}
              id="username"
            >
              {users.map(user => (
                <MenuItem value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl className={classes.width}>
            <InputLabel>現況</InputLabel>
            <Select
              value={condition_name}
              onChange={e => handleChangeConditionName(e)}
            >
              <MenuItem value={'発送済み'}>発送済み</MenuItem>
              <MenuItem value={'稼働中'}>稼働中</MenuItem>
              <MenuItem value={'終了'}>終了</MenuItem>
              <MenuItem value={'休止中'}>休止中</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl className={classes.width}>
            <InputLabel>請求日</InputLabel>
            <Select value={payment} onChange={e => handleChangePayment(e)}>
              <MenuItem value={'15日'}>15日</MenuItem>
              <MenuItem value={'20日'}>20日</MenuItem>
              <MenuItem value={'25日'}>25日</MenuItem>
              <MenuItem value={'月末'}>月末</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div className={classes.unitprice}>
        <Grid container spacing={2}>
          <Grid item xs>
            <TextField
              value={company_name}
              fullWidth
              variant="outlined"
              label="会社名"
              onChange={e => handleChangeCompanyName(e)}
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              value={phone_number}
              label="電話番号 自動入力"
              variant="outlined"
              onChange={e => handleChangePhoneNumber(e)}
            />
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" className={classes.divider} />
      <div>
        <Grid container spacing={4}>
          <Grid item xs>
            <KeyboardDatePicker
              disableToolbar
              label="稼働日"
              format="MM/dd/yyyy"
              onChange={e => handleChangeStartDate(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              value={start_date}
              variant="inline"
            />
          </Grid>
          <Grid item xs>
            <KeyboardDatePicker
              disableToolbar
              label="終了日"
              format="MM/dd/yyyy"
              onChange={e => handleChangeEndDate(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              value={end_date}
              variant="inline"
            />
          </Grid>
          <Grid item xs>
            <KeyboardDatePicker
              disableToolbar
              label="稼働予定日"
              format="MM/dd/yyyy"
              onChange={e => handleChangeExpectedStartDate(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              value={expected_start_date}
              variant="inline"
            />
          </Grid>
          <Grid item xs>
            <KeyboardDatePicker
              disableToolbar
              label="終了予定日"
              format="MM/dd/yyyy"
              onChange={e => handleChangeExpectedEndDate(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              value={expected_end_date}
              variant="inline"
            />
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" className={classes.divider} />
      <Grid container spacing={2}>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={site_name}
            label="納入先/現場名"
            onChange={e => handleChangeSiteName(e)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={site_representative_phone}
            onChange={e => handleChangeSiteRepresentativePhone(e)}
            fullWidth
            label="納入先電話番号"
            variant="outlined"
            margin="normal"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={site_representative}
            onChange={e => handleChangeSiteRepresentative(e)}
            label="現場担当者 自動入力"
          />
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={site_mail}
            onChange={e => handleChangeSiteMail(e)}
            label="メールアドレス 自動入力"
          />
        </Grid>
      </Grid>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        value={site_address}
        label="現場住所 自動入力"
        onChange={e => handleChangeSiteAddress(e)}
      />
    </React.Fragment>
  );
};
