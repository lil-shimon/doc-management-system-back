import React, { FC } from 'react';
import {
  Button,
  TableRow,
  TableCell,
  TextField,
} from '@material-ui/core';
import Autocomplete
 from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import { unitPrice } from '../../organisms/preview/preview';
import useStyles from './styles';

export const PostageRow: FC<{
  handleChangeSenderPlace: any;
  handleChangeDestinationPlace: any;
  handleChangeSize: any;
  handleChangePostagePrice: any;
  handleChangeQuantity: any;
  p: any;
  postages: any;
  removeRow: any;
}> = ({
  handleChangeSenderPlace,
  handleChangeDestinationPlace,
  handleChangeSize,
  handleChangePostagePrice,
  handleChangeQuantity,
  p,
  postages,
  removeRow,
}) => {
  const classes = useStyles();
  const newSenderPlaceArray = postages.map((p: any) => {
    return p.sender_place;
  });
  const newSenderPlace = [...newSenderPlaceArray];
  let uniqueSenderPlace = [...new Set(newSenderPlace)];

  const newDestinationPlaceArray = postages.map((p: any) => {
    return p.destination_place;
  });
  const newDestinationPlace = [...newDestinationPlaceArray];
  let uniqueDestinationPlace = [...new Set(newDestinationPlace)];

  const newSizeArray = postages.map((p: any) => {
    return p.size;
  });
  const newSize = [...newSizeArray];
  let uniqueSize = [...new Set(newSize)];

  const newPostagePriceArray = postages.map((p: any) => {
    return p.postage_price;
  });
  const newPostagePrice = [...newPostagePriceArray];
  let uniquePostagePrice = [...new Set(newPostagePrice)];

  const newQuantityArray = postages.map((p: any) => {
    return p.quantity;
  });
  const newQuantity = [...newQuantityArray];
  let uniqueQuantity = [...new Set(newQuantity)];

  return (
    <React.Fragment>
      <TableRow>
        <TableCell component="th" className={classes.bigger}>
          <Autocomplete
            id="postage-sender_place"
            value={p.sender_place}
            options={uniqueSenderPlace}
            onInputChange={(e: any, newInputValue: any) =>
              handleChangeSenderPlace('sender_place', newInputValue, p.id)
            }
            freeSolo
            disableClearable
            renderInput={params => (
              <TextField
                {...params}
                value={p.sender_place}
                inputProps={{
                  ...params.inputProps,
                  type: 'search',
                }}
                onChange={e =>
                  handleChangeSenderPlace('sender_place', e.target.value, p.id)
                }
              />
            )}
          />
        </TableCell>
        <TableCell className={classes.bigger}>
          <Autocomplete
            id="postage-destination_place"
            value={p.destination_place}
            options={uniqueDestinationPlace}
            onInputChange={(e: any, newInputValue: any) =>
              handleChangeDestinationPlace(
                'destination_place',
                newInputValue,
                p.id
              )
            }
            freeSolo
            disableClearable
            renderInput={params => (
              <TextField
                {...params}
                value={p.destination_place}
                inputProps={{
                  ...params.inputProps,
                  type: 'search',
                }}
                onChange={e =>
                  handleChangeDestinationPlace(
                    'destination_place',
                    e.target.value,
                    p.id
                  )
                }
              />
            )}
          />
        </TableCell>
        <TableCell className={classes.bigger}>
          <Autocomplete
            id="postage-size"
            value={p.size}
            options={uniqueSize}
            onInputChange={(e: any, newInputValue: any) =>
              handleChangeSize('size', newInputValue, p.id)
            }
            freeSolo
            disableClearable
            renderInput={params => (
              <TextField
                {...params}
                value={p.size}
                inputProps={{
                  ...params.inputProps,
                  type: 'search',
                }}
                onChange={e => handleChangeSize('size', e.target.value, p.id)}
              />
            )}
          />
        </TableCell>
        <TableCell>
          <TextField
            value={p.postage_price}
            type="number"
            className={classes.normal}
            onChange={(e: { target: { value: unknown } }) =>
              handleChangePostagePrice('postage_price', e.target.value, p.id)
            }
          />
        </TableCell>
        <TableCell>
          <TextField
            value={p.quantity}
            type="number"
            className={classes.smaller}
            onChange={e =>
              handleChangeQuantity('quantity', e.target.value, p.id)
            }
          />
        </TableCell>
        <TableCell>{unitPrice(p.quantity, p.postage_price)}</TableCell>
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
    </React.Fragment>
  );
};
