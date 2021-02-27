import {
  Paper,
  Table,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  InputBase,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getMonitors, searchMonitors } from '../../../redux/slicers/product';
import CreateButton from '../../molecules/CreateButton';
import UseStyles from './styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { MonitorListTable } from '../../molecules/MonitorListTable';
import { getListMonitor } from '../../../redux/selectors/product';
import { ProductPagenation } from '../../molecules/Pagination/monitor';

export default function MonitorPage() {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const monitors = useSelector(getListMonitor, shallowEqual);
  const [searchWord, setSearchWord] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    dispatch(getMonitors(1));
  }, []);

  useEffect(() => {
    dispatch(getMonitors(1));
  }, [refresh]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setRefresh(refresh + 1);
    dispatch(searchMonitors(searchWord));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs>
          <Link href="/monitors/new">
            <a className={classes.link}>
              <CreateButton />
            </a>
          </Link>
        </Grid>
        <Grid item xs />
        <Grid item xs>
          <Paper
            component="form"
            className={classes.form}
            onSubmit={handleSearch}
          >
            <InputBase
              className={classes.input}
              placeholder="商品名で検索"
              onChange={e => setSearchWord(e.target.value)}
            />
            <IconButton type="submit" className={classes.iconButton}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky tabel">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell>名前</TableCell>
                <TableCell className={classes.productItem}>単位</TableCell>
                <TableCell className={classes.productItem}>
                  単価
                  {/* <ArrowDownwardIcon
                    fontSize="small"
                    color="action"
                    className={classes.iconSort}
                  />
                  <ArrowUpwardIcon
                    fontSize="small"
                    color="action"
                    className={classes.iconSort}
                  /> */}
                </TableCell>
              </TableRow>
            </TableHead>
            <MonitorListTable monitors={monitors} />
          </Table>
        </TableContainer>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} />
        <Grid item xs>
          <ProductPagenation getProduct={getMonitors} />
        </Grid>
      </Grid>
    </div>
  );
}
