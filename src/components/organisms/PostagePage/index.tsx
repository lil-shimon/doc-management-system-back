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
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getListPostage } from '../../../redux/selectors/postage';
import {
  getPostageIndexes,
  searchPostages,
} from '../../../redux/slicers/postage';
import CreateButton from '../../molecules/CreateButton';
import UseStyles from './styles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { PostageRow } from './postageRow';
import { PostagePagenation } from '../../molecules/Pagination/postage';

export default function PostageIndex() {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const postages = useSelector(getListPostage, shallowEqual);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    dispatch(getPostageIndexes(1));
  }, []);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(searchPostages(searchWord));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs>
          <Link href="/postages/new">
            <a className={classes.link}>
              <CreateButton />
            </a>
          </Link>
        </Grid>
        <Grid item xs>
          <Paper
            component="form"
            className={classes.form}
            onSubmit={handleSearch}
          >
            <InputBase
              className={classes.input}
              placeholder="送付先を検索"
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
                <TableCell>送付元</TableCell>
                <TableCell>送付先</TableCell>
                <TableCell>サイズ</TableCell>
                <TableCell className={classes.tableItem}>
                  <p className={classes.tableName}>送料</p>
                  <div className={classes.arrow}>
                    <ArrowDropUpIcon
                      fontSize="small"
                      color="action"
                      className={classes.iconSort}
                    />
                    <ArrowDropDownIcon
                      fontSize="small"
                      color="action"
                      className={classes.iconSort}
                    />
                  </div>
                </TableCell>
                <TableCell>編集</TableCell>
                <TableCell>コピー</TableCell>
                <TableCell>削除</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postages.map(postage => (
                <PostageRow postage={postage} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={7} />
        <Grid item xs>
          <PostagePagenation />
        </Grid>
      </Grid>
    </div>
  );
}
