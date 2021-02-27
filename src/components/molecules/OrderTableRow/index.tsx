import React, { FC, useRef, useState } from 'react';
import { TableRow, TableCell, Collapse, IconButton } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import useStyles from '../../organisms/OrderListsTable/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { showOrder } from '../../../redux/slicers/Order';
import { getOrderItems, showOrderItem } from '../../../redux/slicers/orderItem';
import { getAttachments } from '../../../redux/slicers/attachment';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { selectUsers } from '../../../redux/slicers/user';
import { getConditionsById } from '../../../redux/slicers/condition';
import moment from 'moment';
import { useDrag, useDrop } from 'react-dnd';

//invalid dateかを確認
export const checkInvalidDate = (date: Date | null) => {
  if (date === null) {
    return true;
  } else {
    return false;
  }
};

//invalid dateではないとき表示
export const dateComponent = (date: Date | null) => {
  //@ts-ignore
  if (date === 'null') {
    return <> - </>;
  } else if (date === null) {
    return <> - </>;
    //@ts-ignore
  } else if (date === '0000-00-00') {
    return <> - </>;
  } else {
    return moment(date).format('YYYY年MM月DD日');
  }
};

export const dataDisplay = (word: string | null) => {
  if (word === 'null') {
    return <> - </>;
  } else if (word === null) {
    return <> - </>;
  } else {
    return word;
  }
};

export const OrderTableRow: FC<{
  order: any;
  index: number;
  swapList?: (sourceIndex: number, targetIndex: number) => void;
}> = ({ order, index, swapList }) => {
  interface DragItem {
    type: string;
    index: number;
  }

  const DND_GROUP = 'list';
  const ref = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop({
    accept: DND_GROUP,
    drop(item: DragItem) {
      if (!ref.current || item.index === index) {
        return;
      }
      //@ts-ignore
      swapList(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type: DND_GROUP, index },
  });
  drag(drop(ref));

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    })
  )(TableRow);

  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    })
  )(TableCell);

  return (
    <>
      {/* @ts-ignore */}
      <TableRow ref={ref}>
        <StyledTableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <a
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ): void => {
              dispatch(showOrder(order.id));
              dispatch(getOrderItems(order.id));
              dispatch(getConditionsById(order.condition_id));
              dispatch(selectUsers(order.user_id));
              dispatch(getAttachments(order.id));
              router.push('/orders/show');
            }}
          >
            <DescriptionIcon color="primary" />
          </a>
        </StyledTableCell>
        <StyledTableCell align="right" className={classes.tableId}>
          {order.id}
        </StyledTableCell>
        <StyledTableCell className={classes.sticky}>
          {dataDisplay(order.company_name)}
        </StyledTableCell>
        <StyledTableCell className={classes.sticky}>
          {dataDisplay(order.site_name)}
        </StyledTableCell>
        <StyledTableCell className={classes.tableItem} align="right">
          {dataDisplay(order.condition_name)}
        </StyledTableCell>
        <StyledTableCell align="right">
          {dateComponent(order.start_date)}
        </StyledTableCell>
        <StyledTableCell align="right">
          {dateComponent(order.end_date)}
        </StyledTableCell>
        <StyledTableCell align="right">
          {dateComponent(order.expected_start_date)}
        </StyledTableCell>
        <StyledTableCell align="right">
          {dateComponent(order.expected_end_date)}
        </StyledTableCell>
        <StyledTableCell align="right">
          {dataDisplay(order.additional_invoice)}
        </StyledTableCell>
      </TableRow>
      <StyledTableRow>
        <StyledTableCell
          colSpan={13}
          style={{ paddingBottom: 0, paddingTop: 0 }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {dataDisplay(order.invoice_note)}
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
