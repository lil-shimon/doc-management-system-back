import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreateButton } from '../../components/atoms/Buttons';
import DocumentLists from '../../components/organisms/DocumentLists';
import { searchDocuments } from '../../redux/slicers/document';
import { Paper, InputBase, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UseStyles from '../../components/styles/mitsumori';
import FlashMessageSystem from '../../components/molecules/FlashSystem';
import ErrorMessage from '../../components/organisms/ErrorMessage';

export default function Mitsumori() {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(searchDocuments(searchWord));
  };

  return (
    <div>
      <CssBaseline />
      <FlashMessageSystem />
      <ErrorMessage />
      <main>
        <div>
          <h2>見積一覧</h2>
          <Typography paragraph>
            <Grid container spacing={2}>
              <Grid item xs>
                <div className={classes.btn}>
                  <Link href="/documents/create-document">
                    <CreateButton />
                  </Link>
                </div>
              </Grid>
              <Grid item xs>
                <Paper
                  component="form"
                  className={classes.root}
                  onSubmit={handleSearch}
                >
                  <InputBase
                    className={classes.input}
                    placeholder="見積もりを検索する"
                    onChange={e => setSearchWord(e.target.value)}
                  />
                  <IconButton type="submit" className={classes.iconButton}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
            <DocumentLists />
          </Typography>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
