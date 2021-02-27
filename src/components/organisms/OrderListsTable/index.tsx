import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Grid,
} from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import UseStyles from './styles';
import { OrderTableRow } from '../../molecules/OrderTableRow/index';
import {
  getListOrder,
  getOrderPagination,
} from '../../../redux/selectors/order';
import { OrderPagination } from '../../molecules/Pagination';
import { getOrders } from '../../../redux/slicers/Order';
import Loading from '../../molecules/Loading';

export const OrderListsTable: FC<{ searchWord: string }> = ({ searchWord }) => {
  const dispatch = useDispatch();
  const classes = UseStyles();
  const orders = useSelector(getListOrder, shallowEqual);
  const pagination = useSelector(getOrderPagination, shallowEqual);
  const [Orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const swapList = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      //@ts-ignore
      [Orders[targetIndex], Orders[sourceIndex]] = [
        //@ts-ignore
        Orders[sourceIndex],
        //@ts-ignore
        Orders[targetIndex],
      ];
      //@ts-ignore
      setOrders(Orders.splice(0));
    },
    [Orders]
  );

  useEffect(() => {
    const func = async () => {
      await setLoading(true);
      await dispatch(getOrders(pagination.current_page));
      await setLoading(false);
    };
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      await setLoading(true);
      await dispatch(getOrders(currentPage));
      //@ts-ignore
      await setOrders(orders);
      await setLoading(false);
    };
    func();
  }, [currentPage]);

  const handleSearch = (searchWord: string, currentPage: number) => {
    setLoading(true);
    dispatch(getOrders(currentPage, 'query', searchWord));
    setLoading(false);
  };

  const handleChangeCurrentPage = (
    e: any,
    value: React.SetStateAction<number>
  ) => {
    setCurrentPage(value);
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableFile} />
                <TableCell className={classes.tableFile} />
                <TableCell className={classes.tableId}>No</TableCell>
                <TableCell className={classes.tableName}>会社名</TableCell>
                <TableCell className={classes.tableName}>
                  納入先/現場名
                </TableCell>
                <TableCell className={classes.tableItem}>現況</TableCell>
                <TableCell className={classes.tableDate}>稼働日</TableCell>
                <TableCell className={classes.tableDate}>終了日</TableCell>
                <TableCell className={classes.tableDate}>稼働予定日</TableCell>
                <TableCell className={classes.tableDate}>終了予定日</TableCell>
                <TableCell className={classes.tableItem}>追加請求</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* @ts-ignore */}
              {orders.map((order, index) => (
                <OrderTableRow
                  order={order}
                  index={index}
                  key={index}
                  swapList={swapList}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} />
        <Grid item xs>
          <OrderPagination
            handleChangeCurrentPage={handleChangeCurrentPage}
            current_page={pagination.current_page}
            last_page={pagination.last_page}
          />
        </Grid>
      </Grid>
    </>
  );
};
