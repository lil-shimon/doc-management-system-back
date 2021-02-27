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
import { getListJitan } from '../../../redux/selectors/product';
import {
  getJitans,
  getProducts,
  searchJitans,
} from '../../../redux/slicers/product';
import CreateButton from '../../molecules/CreateButton';
import UseStyles from './styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { JitanListTable } from '../../molecules/JitanListTable';
import { ProductPagenation } from '../../molecules/Pagination/monitor';

export default function JitanPage() {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const Jitans = useSelector(getListJitan, shallowEqual);
  const [searchWord, setSearchWord] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    dispatch(getJitans(1));
  }, []);

  useEffect(() => {
    const reload = async () => {
      await dispatch(getJitans(1));
      setRefresh(0);
      console.log('refresh');
    };
    reload();
  }, [refresh]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(searchJitans(searchWord));
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs>
          <Link href="/jitans/new">
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
            <JitanListTable jitans={Jitans} />
          </Table>
        </TableContainer>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} />
        <Grid item xs>
          <ProductPagenation getProduct={getJitans} />
        </Grid>
      </Grid>
    </>
  );
}
