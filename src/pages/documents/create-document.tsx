import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CreateDocument from '../../components/organisms/CreateDocument/index';

export default function CreateDocumentPage() {
  const router = useRouter();

  //リストへ戻る関数
  const [listOpen, setListOpen] = useState(false);
  const handleListOpen = () => {
    setListOpen(true);
  };
  const handleListClose = () => {
    setListOpen(false);
  };
  const handleBackList = () => {
    setListOpen(false);
    router.push('/documents/mitsumori');
  };

  return (
    <div>
      <CssBaseline />
      <main>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <h2>見積作成</h2>
          </Grid>
          <Grid item xs>
            <Button variant="contained" onClick={handleListOpen}>
              一覧へ戻る
            </Button>
            <Dialog open={listOpen} onClose={handleListClose}>
              <DialogTitle>確認</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  保存しないで一覧へ戻リますか？
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleListClose}
                  variant="outlined"
                  color="primary"
                >
                  いいえ
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBackList}
                >
                  はい
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Typography paragraph>
          <CreateDocument />
        </Typography>
      </main>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
