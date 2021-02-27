import React, { FC, useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TextField,
  Checkbox,
  Divider,
  Grid,
  MenuItem,
  Select,
} from '@material-ui/core';
import useStyles from './style';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { KeyboardDatePicker } from '@material-ui/pickers';

export const OrderItemNew: FC<{
  handleChangeFile: any;
  handleChangeFil: any;
  handleChangeOrderDate: any;
  handleChangeNote: any;
  handleChangeRemarks: any;
  handleChangeSubtotal: any;
  handleChangeOrderItemDate: any;
  order_date: Date | null;
  note: string;
  sub_total: number;
}> = ({
  handleChangeFile,
  handleChangeFil,
  handleChangeOrderDate,
  handleChangeNote,
  handleChangeRemarks,
  handleChangeSubtotal,
  handleChangeOrderItemDate,
  order_date,
  note,
  sub_total,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {/*<TableCell className={classes.tableItem} />*/}
              {/*<TableCell>枝番号</TableCell>*/}
              <TableCell className={classes.tableItem}>受注日</TableCell>
              <TableCell className={classes.tableNote}>
                商品内容サマリー
              </TableCell>
              <TableCell className={classes.totalPrice}>
                <Typography>税抜金額</Typography>
              </TableCell>
              <TableCell className={classes.fileUp}>見積書</TableCell>
              <TableCell className={classes.fileUp}>注文書</TableCell>
              <TableCell>請求</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <KeyboardDatePicker
                  disableToolbar
                  format="yyyy/MM/dd"
                  onChange={e => handleChangeOrderItemDate('order_date', e)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  variant="inline"
                  value={order_date}
                />
              </TableCell>
              <TableCell>
                <TextField value={note} onChange={e => handleChangeNote(e)} />
              </TableCell>
              <TableCell>
                <TextField
                  type="number"
                  value={sub_total}
                  onChange={e => handleChangeSubtotal(e)}
                />
              </TableCell>
              <TableCell>
                {/* <Button component="label" variant="outlined" color="primary"> */}
                <input type="file" onChange={e => handleChangeFile(e)} />
                {/* </Button> */}
              </TableCell>
              <TableCell>
                <input type="file" onChange={e => handleChangeFil(e)} />
              </TableCell>
              <TableCell>
                <Select>
                  <MenuItem value={1}>済</MenuItem>
                  <MenuItem value={2}>未</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/*<AddCircleOutlineIcon onClick={addRow} />*/}
      </Paper>
      <Divider variant="middle" className={classes.divider} />
    </React.Fragment>
  );
};
