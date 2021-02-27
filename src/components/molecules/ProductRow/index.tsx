import React, { FC, useState } from 'react';
import {
  Button,
  MenuItem,
  InputLabel,
  Select,
  TableRow,
  TableCell,
  TextField,
  FormControl,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import Autocomplete
 from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import { unitPrice } from '../../organisms/preview/preview';
import useStyles from './styles';

export const ProductRow: FC<{
  handleChangeName: any;
  handleChangeProduct: any
  p: any;
  products: any;
  removeRow: any;
}> = ({
  handleChangeName,
  handleChangeProduct,
  p,
  products,
  removeRow,
}) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const newProductNameArray = products.map((p: any) => {
    return p.name;
  });
  const productNameArray = [...newProductNameArray];
  let uniqueProductName = [...new Set(productNameArray)];

  const newUnitArray = products.map((p: any) => {
    return p.unit;
  });
  const newProduct = [...newUnitArray];
  let uniqueUnit = [...new Set(newProduct)];

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" className={classes.bigger}>
           <Autocomplete
            id="product-name"
            value={p.name}
            options={uniqueProductName}
            onChange={(e: any, newInputValue: any) =>
              handleChangeName('name', newInputValue, p.id)
            }
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              return option;
            }}
            freeSolo
            disableClearable
            clearOnBlur
            renderInput={(params) => (
              <TextField
                {...params}
              />
            )}
          /> 
        </TableCell>
        <TableCell>
          <TextField
            className={classes.smaller}
            required
            value={p.number}
            type="number"
            onChange={(e) => handleChangeProduct('number', e.target.value, p.id)}
          />
        </TableCell>
        <TableCell>
          <FormControl>
            <Select
              value={p.unit}
              onChange={(e) => handleChangeProduct('unit', e.target.value, p.id)}
            >
              {uniqueUnit.map((u) => (
                <MenuItem value={u}>{u}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl>
            <TextField
              required
              className={classes.normal}
              value={p.unit_price}
              type="number"
              onChange={(e: { target: { value: unknown } }) =>
                handleChangeProduct('unit_price', e.target.value, p.id)
              }
            />
          </FormControl>
        </TableCell>

        <TableCell>{unitPrice(p.unit_price, p.number)}</TableCell>
        <TableCell>
          <Button
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => {
              removeRow(p.id);
            }}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <FormControl>
              <TextField
                label="メモ"
                className={classes.memo}
                value={p.notes}
                onChange={(e) =>
                  handleChangeProduct('notes', e.target.value, p.id)
                }
              />
            </FormControl>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
