import { Grid, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Preview } from '../../components/organisms/preview/preview';
import {
  getDocumentById,
  setPurchasedPostage,
  setPurchasedProduct,
} from '../../redux/slicers/document';
import { getDocumentByDid } from '../../redux/selectors/document';
import Loading from '../../components/molecules/Loading';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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

export default function PreviewDocumentPage() {
  //必要な定数を定義
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // 必要なデータを定義
  const documents = useSelector(getDocumentByDid, shallowEqual);
  const doc_info = useState([documents]);
  //@ts-ignore
  const id = documents.id;

  //一覧画面へ戻る
  const handleBack = () => {
    setLoading(true);
    router.push('/documents/mitsumori');
  };

  //編集画面へ遷移
  const handleMoveEditPage = (id: number) => {
    setLoading(true);
    dispatch(getDocumentById(id));
    dispatch(setPurchasedPostage(id));
    dispatch(setPurchasedProduct(id));
    router.push('/documents/edit');
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <main>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <h2>プレビュー</h2>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={handleBack}>
                戻る
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleMoveEditPage(id);
                }}
              >
                編集
              </Button>
            </Grid>
          </Grid>
          <Typography paragraph>
            <Preview documents={documents} />
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
