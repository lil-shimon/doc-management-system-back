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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getUsers } from '../../../redux/slicers/user';
import moment from 'moment';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const OrderTop: FC<{
  start_date: null | string;
  end_date: null | string;
  expected_start_date: null | string;
  expected_end_date: null | string;
  condition_id: null | number;
  user_id: null | number;
  company_name: null | string;
  site_name: null | string;
  phone_number: null | string;
  site_representative: null | string;
  site_representative_phone: null | string;
  site_mail: null | string;
  site_address: null | string;
  created_at: Date | null;
  handleChangeOrderInfo: any;
  handleChangeDate: any;
}> = ({
  start_date,
  end_date,
  expected_start_date,
  expected_end_date,
  condition_id,
  user_id,
  company_name,
  site_name,
  phone_number,
  site_representative,
  site_representative_phone,
  site_mail,
  site_address,
  created_at,
  handleChangeOrderInfo,
  handleChangeDate,
}) => {
  //使う関数を定義
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const users = useSelector(getListUser, shallowEqual);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            value={moment(created_at).format('YYYY年MM月DD日')}
            fullWidth
            label="日付 自動入力"
          />
        </Grid>
        <Grid item xs>
          <FormControl required className={classes.width}>
            <InputLabel>担当</InputLabel>
            <Select
              required
              fullWidth
              value={user_id}
              onChange={e => handleChangeOrderInfo('user_id', e.target.value)}
              id="username"
              labelId="username"
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
              value={condition_id}
              onChange={e =>
                handleChangeOrderInfo('condition_id', e.target.value)
              }
            >
              <MenuItem value={1}>発送済み</MenuItem>
              <MenuItem value={2}>稼働中</MenuItem>
              <MenuItem value={3}>終了</MenuItem>
              <MenuItem value={4}>休止中</MenuItem>
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
              onChange={e =>
                handleChangeOrderInfo('company_name', e.target.value)
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              value={phone_number}
              label="電話番号 自動入力"
              variant="outlined"
              onChange={e =>
                handleChangeOrderInfo('phone_number', e.target.value)
              }
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
              format="yyyy/MM/dd"
              onChange={e => handleChangeDate('start_date', e)}
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
              format="yyyy/MM/dd"
              onChange={e => handleChangeDate('end_date', e)}
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
              format="yyyy/MM/dd"
              onChange={e => handleChangeDate('expected_start_date', e)}
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
              format="yyyy/MM/dd"
              onChange={e => handleChangeDate('expected_end_date', e)}
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
            label="納入先"
            onChange={e => handleChangeOrderInfo('site_name', e.target.value)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            value={site_representative_phone}
            onChange={e =>
              handleChangeOrderInfo('site_representative_phone', e.target.value)
            }
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
            onChange={e =>
              handleChangeOrderInfo('site_representative', e.target.value)
            }
            label="現場担当者 自動入力"
          />
        </Grid>
        <Grid item xs>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            value={site_mail}
            onChange={e => handleChangeOrderInfo('site_mail', e.target.value)}
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
        onChange={e => handleChangeOrderInfo('site_address', e.target.value)}
      />
    </React.Fragment>
  );
};
