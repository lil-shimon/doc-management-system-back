import {
  CssBaseline,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import React, { useState } from 'react';
import { newProducts } from '../../redux/slicers/product';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getListProduct } from '../../redux/selectors/product';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    unitprice: {
      marginTop: '25px',
      marginBottom: '25px',
    },
    btn: {
      textAlign: 'right',
      marginTop: '25px',
    },
    formControl: {
      margin: theme.spacing(1),
      nimWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    link: {
      textDecoration: 'none',
    },
  })
);

export default function OtherNewPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [unit_price, setUnitPrice] = useState(0);
  const [tax, setTax] = useState('0.1');
  const [id, setId] = useState(0);
  const products = useSelector(getListProduct, shallowEqual);
  const router = useRouter();
  const [notes, setNotes] = useState('');
  const [product_types_id, setProductTypesId] = useState(4);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      newProducts(id, name, unit, unit_price, tax, notes, product_types_id)
    );
    router.push('/others/list');
  };

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setUnit(event.target.value as string);
  };

  const handleChangeProductTypesId = (e: React.ChangeEvent<{ value: any }>) => {
    setProductTypesId(e.target.value);
  };

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
    router.push('/others/list');
  };

  //作成時の処理関数
  const [saveOpen, setSaveOpen] = useState(false);
  const handleSaveClose = () => {
    setSaveOpen(false);
  };
  const handleSaveOpen = () => {
    setSaveOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <h2>その他商品登録</h2>
        <Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="名前"
              name="name"
              onChange={e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="notes"
              label="メモ"
              name="notes"
              onChange={e => setNotes(e.target.value)}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="product_types_id">カテゴリー</InputLabel>
              <Select
                id="product_types_id"
                value={product_types_id}
                onChange={handleChangeProductTypesId}
              >
                <MenuItem value={1}>モニター</MenuItem>
                <MenuItem value={2}>計測器</MenuItem>
                <MenuItem value={3}>JITAN</MenuItem>
                <MenuItem value={4}>その他</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="unit">単位</InputLabel>
              <Select
                labelId="unit"
                id="unit"
                value={unit}
                onChange={handleChange}
              >
                <MenuItem value={'式'}>式</MenuItem>
                <MenuItem value={'ヶ月'}>ヶ月</MenuItem>
                <MenuItem value={'個'}>個</MenuItem>
                <MenuItem value={'枚'}>枚</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.unitprice}>
              <TextField
                required
                name="単価"
                variant="outlined"
                fullWidth
                label="単価"
                type="number"
                value={unit_price}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                  setUnitPrice((e.target.value as unknown) as number)
                }
              />
            </div>
            <div className={classes.btn}>
              <Grid container spacing={1}>
                <Grid item xs={6} />
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
                <Grid item xs>
                  <Button
                    onClick={handleSaveOpen}
                    variant="contained"
                    color="primary"
                  >
                    作成
                  </Button>
                  <Dialog open={saveOpen} onClose={handleSaveClose}>
                    <DialogTitle>確認</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        商品を作成しますか？
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleSaveClose}
                        variant="outlined"
                        color="primary"
                      >
                        いいえ
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        onClick={handleSubmit}
                      >
                        はい
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </div>
          </form>
        </Typography>
      </div>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
