import React, { useCallback, useEffect, useState } from 'react';
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
  getListFifteen,
  getOrderPagination,
} from '../../../redux/selectors/order';
import { getOrders } from '../../../redux/slicers/Order';
import Loading from '../../molecules/Loading';

export default function OrderFifteenList() {
  const dispatch = useDispatch();
  const classes = UseStyles();
  const orders = useSelector(getListFifteen, shallowEqual);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = useSelector(getOrderPagination, shallowEqual);
  const pageQuery = '20日';

  //ソートのための初期ステート
  const [sort, setSort] = useState<string | null>(null);

  // id sortのためのhandle関数
  const handleChangeIdSort = async () => {
    await setLoading(true);
    if (sort !== 'id_asc') {
      setSort('id_asc');
      await dispatch(getOrders(1, 'query', pageQuery, 'order_by', 'id_asc'));
    } else if (sort === 'id_asc') {
      setSort('id_desc');
      await dispatch(getOrders(1, 'query', pageQuery, 'order_by', 'id_desc'));
    }
    await setLoading(false);
  };

  // company_name sortのためのhandle関数
  const handleChangeCompanyNameSort = async () => {
    await setLoading(true);
    if (sort !== 'company_name_desc') {
      setSort('company_name_desc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'company_name_desc')
      );
    } else if (sort === 'company_name_desc') {
      setSort('company_name_asc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'company_name_asc')
      );
    }
    await setLoading(false);
  };

  // site_name sortのためのhandle関数
  const handleChangeSiteNameSort = async () => {
    await setLoading(true);
    if (sort !== 'site_name_desc') {
      setSort('site_name_desc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'site_name_desc')
      );
    } else if (sort === 'site_name_desc') {
      setSort('site_name_asc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'site_name_asc')
      );
    }
    await setLoading(false);
  };

  // additional invoice sortのためのhandle関数
  const handleChangeAdditionalInvoiceSort = async () => {
    await setLoading(true);
    if (sort !== 'additional_invoice_desc') {
      setSort('additional_invoice_desc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'additional_invoice_desc')
      );
    } else if (sort === 'additional_invoice_desc') {
      setSort('additional_invoice_asc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'additional_invoice_asc')
      );
    }
    await setLoading(false);
  };

  // start_date sortのためのhandle関数
  const handleChangeStartDateSort = async () => {
    await setLoading(true);
    if (sort !== 'start_date_desc') {
      setSort('start_date_desc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'start_date_desc')
      );
    } else if (sort === 'start_date_desc') {
      setSort('start_date_asc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'start_date_asc')
      );
    }
    await setLoading(false);
  };

  // end_date sortのためのhandle関数
  const handleChangeEndDateSort = async () => {
    await setLoading(true);
    if (sort !== 'end_date_desc') {
      setSort('end_date_desc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'end_date_desc')
      );
    } else if (sort === 'end_date_desc') {
      setSort('end_date_asc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'end_date_asc')
      );
    }
    await setLoading(false);
  };

  // expected_start_date sortのためのhandle関数
  const handleChangeExpectedStartDateSort = async () => {
    await setLoading(true);
    if (sort !== 'expected_start_date_desc') {
      setSort('expected_start_date_desc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'expected_start_date_desc')
      );
    } else if (sort === 'expected_start_date_desc') {
      setSort('expected_start_date_asc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'expected_start_date_asc')
      );
    }
    await setLoading(false);
  };

  // expected_end_date sortのためのhandle関数
  const handleChangeExpectedEndDateSort = async () => {
    await setLoading(true);
    if (sort !== 'expected_end_date_desc') {
      setSort('expected_end_date_desc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'expected_end_date_desc')
      );
    } else if (sort === 'expected_end_date_desc') {
      setSort('expected_end_date_asc');
      await dispatch(
        getOrders(1, 'query', pageQuery, 'order_by', 'expected_end_date_asc')
      );
    }
    await setLoading(false);
  };

  useEffect(() => {
    const func = async () => {
      await setLoading(true);
      await dispatch(getOrders(pagination.current_page, 'query', pageQuery));
      await setLoading(false);
    };
    console.log('useEffect normal');
    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      await setLoading(true);
      await dispatch(getOrders(currentPage, 'query', pageQuery));
      //@ts-ignore
      await setLoading(false);
    };
    console.log('useEffect by current' + 'page');
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
                <TableCell
                  className={classes.tableId}
                  onClick={() => handleChangeIdSort()}
                >
                  No
                </TableCell>
                <TableCell
                  className={classes.tableName}
                  onClick={() => handleChangeCompanyNameSort()}
                >
                  会社名
                </TableCell>
                <TableCell
                  className={classes.tableName}
                  onClick={() => handleChangeSiteNameSort()}
                >
                  納入先/現場名
                </TableCell>
                <TableCell className={classes.tableItem}>現況</TableCell>
                <TableCell
                  className={classes.tableDate}
                  onClick={() => handleChangeStartDateSort()}
                >
                  稼働日
                </TableCell>
                <TableCell
                  className={classes.tableDate}
                  onClick={() => handleChangeEndDateSort()}
                >
                  終了日
                </TableCell>
                <TableCell
                  className={classes.tableDate}
                  onClick={() => handleChangeExpectedStartDateSort()}
                >
                  稼働予定日
                </TableCell>
                <TableCell
                  className={classes.tableDate}
                  onClick={() => handleChangeExpectedEndDateSort()}
                >
                  終了予定日
                </TableCell>
                <TableCell
                  className={classes.tableItem}
                  onClick={() => handleChangeAdditionalInvoiceSort()}
                >
                  追加請求
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* @ts-ignore */}
              {orders.map((order, index) => (
                <OrderTableRow order={order} index={index} key={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} />
        <Grid item xs>
          {/*<OrderPagination />*/}
        </Grid>
      </Grid>
    </>
  );
}import React, { useEffect } from 'react';
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
import { getListTwenty } from '../../../redux/selectors/order';

export default function OrderTwentyList() {
  const classes = UseStyles();
  const orders = useSelector(getListTwenty, shallowEqual);

  return (
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
              {orders.map((order, index) => (
                <OrderTableRow order={order} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} />
        <Grid item xs>
          {/*<OrderPagination />*/}
        </Grid>
      </Grid>
    </>
  );
}
import React, { useEffect } from 'react';
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
import { getListTwenty } from '../../../redux/selectors/order';

export default function OrderTwentyList() {
  const classes = UseStyles();
  const orders = useSelector(getListTwenty, shallowEqual);

  return (
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
              {orders.map((order, index) => (
                <OrderTableRow order={order} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} />
        <Grid item xs>
          {/*<OrderPagination />*/}
        </Grid>
      </Grid>
    </>
  );
}
