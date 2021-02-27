import { Paper, Table, TableHead, TableRow } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import React, { FC } from 'react';
import { PostageRow } from './postageRow';
import { AddButton } from '../../atoms/Buttons';
import useStyles from '../../styles/documentsedit';

export const PostageTable: FC<{
  handleChangeSenderPlace: any;
  handleChangeDestinationPlace: any;
  handleChangeSize: any;
  handleChangePostagePrice: any;
  handleChangeQuantity: any;
  purchasedPostage: any;
  postages: any;
  removeRow: any;
  addRow: any;
}> = ({
  handleChangeSenderPlace,
  handleChangeDestinationPlace,
  handleChangeSize,
  handleChangePostagePrice,
  handleChangeQuantity,
  purchasedPostage,
  postages,
  removeRow,
  addRow,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>送付元</TableCell>
                <TableCell>送付先</TableCell>
                <TableCell>サイズ</TableCell>
                <TableCell>送料 /￥</TableCell>
                <TableCell>送付個数</TableCell>
                <TableCell>金額 /￥</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {purchasedPostage.map((p: any) => (
                <PostageRow
                  handleChangeSenderPlace={handleChangeSenderPlace}
                  handleChangeDestinationPlace={handleChangeDestinationPlace}
                  handleChangePostagePrice={handleChangePostagePrice}
                  handleChangeSize={handleChangeSize}
                  handleChangeQuantity={handleChangeQuantity}
                  p={p}
                  postages={postages}
                  removeRow={removeRow}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div className={classes.btn}>
        <AddButton onClick={addRow} />
      </div>
    </React.Fragment>
  );
};
