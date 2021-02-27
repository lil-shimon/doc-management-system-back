import {
  CssBaseline,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/molecules/Loading';
import { getListProduct } from '../../redux/selectors/product';
import {
  copyProducts,
  editProduct,
  productDelete,
} from '../../redux/slicers/product';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    unitprice: {
      marginTop: '25px',
      marginBottom: '25px',
    },
    body: {
      width: `calc(100% - 240px)`,
      marginLeft: '240px',
      marginTop: '75px',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
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
    width: {
      width: '70%',
    },
  })
);

export default function ProductNewPage() {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState<string | number>('');
  const [unit, setUnit] = useState('');
  const [unit_price, setUnitPrice] = useState(0);
  const [tax, setTax] = useState('0.1');
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState<string | null>('');
  const [product_types_id, setProductTypesId] = useState(1);
  const products = useSelector(getListProduct, shallowEqual);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      editProduct(id, name, unit, unit_price, tax, notes, product_types_id)
    );
    router.push('/monitors/list');
  };

  const handleCopy = () => {
    dispatch(
      copyProducts(
        id,
        name,
        unit,
        unit_price,
        tax,
        notes,
        products,
        product_types_id
      )
    );
    router.push('/monitors/list');
  };

  console.log('notes', notes);

  useEffect(() => {
    products.map(
      product => (
        setName(product.name),
        setUnit(product.unit),
        setUnitPrice(product.unit_price),
        setId(product.id),
        setProductTypesId(product.product_types_id),
        setNotes(product.notes)
      )
    );
    setLoading(false);
  }, []);

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
    router.push('/monitors/list');
  };

  //詳細へ戻る関数
  const [showOpen, setShowOpen] = useState(false);
  const handleShowOpen = () => {
    setShowOpen(true);
  };
  const handleShowClose = () => {
    setShowOpen(false);
  };
  const handleBackPreview = () => {
    setListOpen(false);
    router.push('/monitors/show');
  };

  //  コピー関数
  const [copyOpen, setCopyOpen] = useState(false);
  const handleCopyOpen = () => {
    setCopyOpen(true);
  };
  const handleCopyClose = () => {
    setCopyOpen(false);
  };

  //保存時の処理関数
  const [saveOpen, setSaveOpen] = useState(false);
  const handleSaveClose = () => {
    setSaveOpen(false);
  };
  const handleSaveOpen = () => {
    setSaveOpen(true);
  };

  //削除
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };
  const deleteProduct = () => {
    dispatch(productDelete(dispatch, [Number(id)], id));
    router.push('/monitors/list');
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.width}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <h2>商品編集</h2>
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
          <Grid item xs>
            <Button variant="contained" onClick={handleShowOpen}>
              詳細へ戻る
            </Button>
            <Dialog open={showOpen} onClose={handleShowClose}>
              <DialogTitle>確認</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  保存しないで詳細へ戻リますか？
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleShowClose}
                  variant="outlined"
                  color="primary"
                >
                  いいえ
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBackPreview}
                >
                  はい
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
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
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="notes"
              label="メモ"
              name="notes"
              value={notes}
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
                  <Button variant="contained" onClick={handleCopyOpen}>
                    コピー
                  </Button>
                  <Dialog open={copyOpen} onClose={handleCopyClose}>
                    <DialogTitle>確認</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        商品をコピーしますか？
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleCopyClose}
                        variant="outlined"
                        color="primary"
                      >
                        いいえ
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        type="submit"
                        onClick={handleCopy}
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
                    保存
                  </Button>
                  <Dialog open={saveOpen} onClose={handleSaveClose}>
                    <DialogTitle>確認</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        商品を保存しますか？
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
                <Grid item xs>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleDeleteOpen}
                  >
                    削除
                  </Button>
                  <Dialog open={deleteOpen} onClose={handleDeleteClose}>
                    <DialogTitle>確認</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        商品を削除しますか？
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleDeleteClose}
                        variant="outlined"
                        color="primary"
                      >
                        いいえ
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={deleteProduct}
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

