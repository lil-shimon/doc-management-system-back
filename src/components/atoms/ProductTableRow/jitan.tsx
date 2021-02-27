import React, { FC, useState } from 'react';
import { TableRow, TableCell, TableBody } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DescriptionIcon from '@material-ui/icons/Description';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import useStyles from './styles';
import { selectProducts } from '../../../redux/slicers/product';
import { addSeparator } from '../../organisms/preview/preview';

export const JitanRow: FC<{
  products: any;
  p: any;
}> = ({ products, p }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <a
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ): void => {
              dispatch(selectProducts(p.id));
              router.push('/jitans/show');
            }}
          >
            <DescriptionIcon color="primary" />
          </a>
        </TableCell>
        <TableCell component="th" className={classes.bigger}>
          {p.name}
        </TableCell>
        <TableCell>{p.unit}</TableCell>
        <TableCell>{addSeparator(p.unit_price)}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={8} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {p.notes}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
