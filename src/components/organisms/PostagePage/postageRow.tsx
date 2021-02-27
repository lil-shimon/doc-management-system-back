import React, { FC } from 'react';
import useStyles from './styles';
import { TableRow, TableCell, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import { addSeparator } from '../preview/preview';
import {
  selectPostages,
  copyPostages,
  postageDelete,
} from '../../../redux/slicers/postage';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export const PostageRow: FC<{
  postage: any;
}> = ({ postage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <TableRow key={postage.id}>
      <TableCell>{postage.sender_place}</TableCell>
      <TableCell>{postage.destination_place}</TableCell>
      <TableCell>{postage.size}</TableCell>
      <TableCell>{addSeparator(postage.postage_price)}</TableCell>
      <TableCell>
        <a
          onClick={(): void => {
            dispatch(selectPostages(postage.id));
            router.push('/postages/edit');
          }}
        >
          <Button color="primary" startIcon={<EditIcon />} />
        </a>
      </TableCell>
      <TableCell>
        <a
          onClick={(
            event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
          ): void => {
            dispatch(
              copyPostages(
                postage.id,
                postage.sender_place,
                postage.destination_place,
                postage.postage_price,
                postage.size,
                postage.tax
              )
            );
          }}
        >
          <Button color="primary" startIcon={<FileCopyIcon />} />
        </a>
      </TableCell>
      <TableCell>
        <a
          onClick={(): void => {
            dispatch(postageDelete(dispatch, [Number(postage.id)], postage.id));
          }}
        >
          <Button
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
          />
        </a>
      </TableCell>
    </TableRow>
  );
};
