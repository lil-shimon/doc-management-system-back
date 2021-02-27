import React, { FC, useState } from 'react';
import {
  TextField,
  Divider,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import useStyles from './style';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { InputFile } from '../../atoms/InputFile';

export const OrderItemEdit: FC<{
  order_date: any;
  note: any;
  sub_total: any;
  quotation: any;
  invoice: any;
  claim: any;
  handleChangeOrderDate: any;
  handleChangeNote: any;
  handleChangeSubTotal: any;
  handleChangeQuotation: any;
  handleChangeInvoice: any;
  handleChangeClaim: any;
}> = ({
  order_date,
  note,
  sub_total,
  quotation,
  invoice,
  claim,
  handleChangeOrderDate,
  handleChangeNote,
  handleChangeSubTotal,
  handleChangeQuotation,
  handleChangeInvoice,
  handleChangeClaim,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <h4>受注日</h4>
            <KeyboardDatePicker
              className={classes.tableNote}
              disableToolbar
              value={order_date}
              format="MM/dd/yyyy"
              variant="inline"
              onChange={e => handleChangeOrderDate(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <h4>商品内容サマリー</h4>
            <TextField
              className={classes.width}
              value={note}
              onChange={e => handleChangeNote(e)}
            />
          </Grid>
          <Grid item xs>
            <h4>税抜金額</h4>
            <TextField
              value={sub_total}
              type="number"
              onChange={e => handleChangeSubTotal(e)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs>
            <h4>見積書</h4>
            <InputFile
              file={quotation}
              handleChangeFile={handleChangeQuotation}
            />
          </Grid>
          <Grid item xs>
            <h4>請求書</h4>
            <InputFile file={invoice} handleChangeFile={handleChangeInvoice} />
          </Grid>
          <Grid item xs>
            <FormControl>
              <h4>請求</h4>
              <Select value={claim} onChange={e => handleChangeClaim(e)}>
                <MenuItem value={'済'}>済</MenuItem>
                <MenuItem value={'未'}>未</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" className={classes.divider} />
    </React.Fragment>
  );
};
