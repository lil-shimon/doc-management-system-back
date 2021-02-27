import React, { FC } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import useStyles from './style';

export const OrderDown: FC<{
  invoice_note: null | string;
  sale_note: null | string;
  maintainance_note: null | string;
  signnage_id: null | string;
  additional_invoice: string | null;
  handleChangeInvoiceNote: any;
  handleChangeSaleNote: any;
  handleChangeMaintainanceNote: any;
  handleChangeSignnageId: any;
  handleChangeAdditionalInvoice: any;
}> = ({
  invoice_note,
  sale_note,
  maintainance_note,
  signnage_id,
  additional_invoice,
  handleChangeInvoiceNote,
  handleChangeSaleNote,
  handleChangeMaintainanceNote,
  handleChangeSignnageId,
  handleChangeAdditionalInvoice,
}) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl className={classes.width}>
            <InputLabel>追加請求</InputLabel>
            <Select
              value={additional_invoice}
              onChange={e => handleChangeAdditionalInvoice(e)}
            >
              <MenuItem value={'なし'}>なし</MenuItem>
              <MenuItem value={'あり'}>あり</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="遠隔サイネージID"
            value={signnage_id}
            onChange={e => handleChangeSignnageId(e)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="備考"
            value={maintainance_note}
            fullWidth
            variant="outlined"
            onChange={e => handleChangeMaintainanceNote(e)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs>
          <TextField
            rows={5}
            variant="outlined"
            label="営業メモ"
            value={sale_note}
            multiline
            fullWidth
            onChange={e => handleChangeSaleNote(e)}
          />
        </Grid>
        <Grid item xs>
          <TextField
            rows={5}
            fullWidth
            value={invoice_note}
            variant="outlined"
            label="請求メモ"
            multiline
            onChange={e => handleChangeInvoiceNote(e)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
