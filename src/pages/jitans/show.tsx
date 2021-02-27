import { Grid, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React from 'react';
import { ProductShow } from '../../components/organisms/ProductShow';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  width: {
    width: '70%',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  body: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: '240px',
  },
  btn: {
    marginTop: '25px',
  },
}));

export default function JitanShowPage() {
  //必要な定数を定義
  const classes = useStyles();
  const router = useRouter();

  // 必要なデータを定義

  //必要な関数を定義
  const handleBackList = () => {
    router.push('/jitans/list');
  };

  //編集画面へ遷移
  const handleMoveEditPage = () => {
    router.push('/jitans/edit');
  };

  return (
    <div className={classes.width}>
      <div className={classes.root}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <h2>JITAN詳細</h2>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleBackList}>
              戻る
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              color="primary"
              onClick={handleMoveEditPage}
            >
              編集
            </Button>
          </Grid>
        </Grid>
      </div>
      <ProductShow />
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
