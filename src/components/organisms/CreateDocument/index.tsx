import {
  Divider,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getListPostage } from '../../../redux/selectors/postage';
import { getListProduct } from '../../../redux/selectors/product';
import { newDocuments } from '../../../redux/slicers/document';
import { getPostages } from '../../../redux/slicers/postage';
import { getProducts } from '../../../redux/slicers/product';
import { AddButton, CreateButton } from '../../atoms/Buttons/index';
import DateFnsUtils from '@date-io/date-fns';
import { getListUser } from '../../../redux/selectors/user';
import { getUsers } from '../../../redux/slicers/user';
import moment from 'moment';
import { useRouter } from 'next/router';
import useStyles from './styles';
import { getListDocument } from '../../../redux/selectors/document';
import { addSeparator } from '../preview/preview';
import { getListCompanyLogo } from '../../../redux/selectors/companyLogo';
import { imgUrl } from '../CompanyLogoPage';
import { TermAndConditions } from '../../molecules/termAndConditions';
import { DurationOfService } from '../../molecules/DurationOfService';
import { CompanyLogoSelect } from '../../molecules/CompanyLogoSelect';
import { BusinessPartnerCompanyNameTextField } from '../../molecules/BusinessPartnerCompanyNameTextField';
import { DocumentTitleTextField } from '../../molecules/DocumentTitleTextField';
import { ProductRow } from '../../molecules/ProductRow';
import { PostageTable } from '../../molecules/PostageTable';
import { getCompanyLogos } from '../../../redux/slicers/companyLogo';
import Loading from '../../molecules/Loading';

export default function CreateDocument() {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const documents = useSelector(getListDocument, shallowEqual);
  const companyLogos = useSelector(getListCompanyLogo, shallowEqual);
  const see_part_id = 1;
  const sell_part_id = 1;
  const customer_part_id = 1;
  const tax = '0.1';
  const document_type_id = 1;

  const [
    business_partner_company_name,
    setBusinessPartnerCompanyName,
  ] = useState<string>('');
  const [document_title, setDocumentTitle] = useState('');
  const [honorific_title, setHonorificTitle] = useState('御中');
  const [image_path, setImagePath] = useState('company-logo.png');
  const [payment_terms, setPaymentTerms] = useState('60日');
  const [quotation_expiration_date] = useState('60日');
  const [term_and_conditions, setTermAndConditions] = useState('打合せの上');
  const [user_id, setUserId] = useState(0);
  const [created_at] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit_price, setUnitPrice] = useState(0);
  const [remarks, setRemarks] = useState(
    '※上記の金額は、あくまで基本価格になりますので、詳細はお打ち合わせ後に調整する可能性がございます。'
  );
  const [usage_period, setUsagePeriod] = useState('');
  const [status] = useState(0);
  const [usage_period_start, setUsagePeriodStart] = React.useState<Date | null>(
    null
  );
  const [usage_period_end, setUsagePeriodEnd] = React.useState<Date | null>(
    null
  );
  const [number, setNumber] = useState<number>(1);
  const [duration_of_service, setDurationOfService] = useState<string | null>(
    null
  );
  const dispatch = useDispatch();
  const [count, setCount] = useState(3);
  const router = useRouter();
  const [purchasedProduct, setPurchasedProduct] = useState([
    {
      name: '',
      unit: '式',
      unit_price: 0,
      number: 1,
      id: 1,
      tax: '0.1',
      productPrice: number * unit_price,
      notes: '',
    },
    {
      name: '',
      unit: '式',
      unit_price: 0,
      number: 1,
      id: 2,
      tax: '0.1',
      productPrice: number * unit_price,
      notes: '',
    },
    {
      name: '',
      unit: '式',
      unit_price: 0,
      number: 1,
      id: 3,
      tax: '0.1',
      productPrice: number * unit_price,
      notes: '',
    },
  ]);

  const [purchasedPostage, setPurchasedPostage] = useState([
    {
      sender_place: '埼玉県',
      destination_place: '',
      size: '',
      id: 0,
      tax: 0.1,
      postage_price: 0,
      quantity: 1,
    },
  ]);

  const [topPurchasedProduct, setTopPurchasedProduct] = useState([
    {
      name: '',
      unit: null,
      unit_price: null,
      number: null,
      id: 0,
      tax: null,
      productPrice: null,
      notes: null,
    },
  ]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await dispatch(
      newDocuments(
        //@ts-ignore
        business_partner_company_name,
        document_title,
        document_type_id,
        honorific_title,
        image_path,
        payment_terms,
        quotation_expiration_date,
        tax,
        term_and_conditions,
        usage_period,
        usage_period_start,
        usage_period_end,
        duration_of_service,
        user_id,
        remarks,
        purchasedPostage,
        purchasedProduct,
        customer_part_id,
        see_part_id,
        sell_part_id,
        topPurchasedProduct,
        sub_total,
        total_price
      )
    );
    setLoading(true);
    await router.push('/documents/mitsumori');
  };

  const handleStartDate = (date: Date | null) => {
    setUsagePeriodStart(date);
  };

  const handleEndDate = (date: Date | null) => {
    setUsagePeriodEnd(date);
  };

  const handleChangeTermAndConditions = (term_and_conditions: string) => {
    setTermAndConditions(term_and_conditions);
  };

  const handleChangeDurationOfService = (duration_of_service: string) => {
    setDurationOfService(duration_of_service);
  };

  //for product table
  const products = useSelector(getListProduct, shallowEqual);

  useEffect(() => {
    setLoading(true);
    dispatch(getProducts());
    setLoading(false);
  }, []);

  const handleChangeName = (key: string, newValue: any, id: number) => {
    // 既存のデータベースから製品名で配列を生成
    //@ts-ignore
    let filteredPurchasedProduct = products.filter((item: { name: string }) => {
      if (item.name === newValue) {
        return item.name === newValue;
      } else {
        return;
      }
    });
    console.log('filteredPurchasedProduct', filteredPurchasedProduct);
    // newValueの型がstringだった場合
    if (typeof newValue === 'string') {
      //@ts-ignore
      setPurchasedProduct(prev => {
        return prev.map(item => {
          // 既存のidと編集するもののidが一致したときの処理
          if (item.id === id) {
            //　既存のデータベースに一致するものがないとき
            if (!filteredPurchasedProduct[unit_price]) {
              console.log(
                '既存のidと編集するもののidが一致したときの処理, 既存のデータベースに一致するものがないとき'
              );
              return {
                ...item,
                [key]: newValue,
              };
              return item;
              //　既存のデータベースに一致するものがあるとき
            } else {
              console.log(
                '既存のidと編集するもののidが一致したときの処理, 既存のデータベースに一致するものがあるとき'
              );
              return {
                ...item,
                [key]: newValue,
                ['unit_price']: filteredPurchasedProduct[unit_price].unit_price,
                ['notes']: filteredPurchasedProduct[unit_price].notes,
                ['unit']: filteredPurchasedProduct[unit_price].unit,
              };
              return item;
            }
            //　既存のidと編集するもののidが一致しないとき
          } else {
            console.log('既存のidと編集するもののidが一致しないとき');
            return item;
          }
        });
      });
      // 新しいinputがある場合
    } else if (newValue && newValue.inputValue) {
      setPurchasedProduct(prev => {
        return prev.map(item => {
          console.log('新しいinputがある場合');
          return {
            ...item,
            [key]: newValue,
          };
          return item;
        });
      });
    } else {
      console.log('その他');
      return;
    }
  };

  //商品の他の情報を変える関数
  const handleChangeProduct = (key: string, value: string, id: number) => {
    setPurchasedProduct(prev => {
      return prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      });
    });
  };

  const addRow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const microtime = Date.now();
    setCount(microtime);
    console.log('count', count);
    const newRow = {
      name: '',
      unit: '式',
      unit_price: 0,
      number: 1,
      id: count,
      tax: '0.1',
      productPrice: number * unit_price,
      notes: '',
    };
    const newProduct = [...purchasedProduct, newRow];
    setPurchasedProduct(newProduct);
  };

  const removeRow = (id: number) => {
    const list = purchasedProduct.filter(item => item.id !== id);
    setPurchasedProduct(list);
  };

  //for postage table
  const postages = useSelector(getListPostage, shallowEqual);

  useEffect(() => {
    setLoading(true);
    dispatch(getPostages());
    setLoading(false);
  }, []);

  const handleChangeSenderPlace = (key: string, value: unknown, id: number) => {
    let filteredPurchasedPostage = postages.filter(
      (item: { sender_place: unknown }) => {
        return item.sender_place === value;
      }
    );

    let temp:
      | any[]
      | ((
          prevState: {
            sender_place: string;
            destination_place: string;
            size: string;
            postage_price: number;
            quantity: number;
          }[]
        ) => {
          sender_place: string;
          destination_place: string;
          size: string;
          postage_price: number;
          quantity: number;
        }[]) = [];

    temp = temp.concat(purchasedPostage);
    temp.forEach((a, i) => {
      if (a.id === id) {
        if (!filteredPurchasedPostage.length) {
          //@ts-ignore
          temp.splice(i, 1, { ...a, [key]: value });
        } else {
          //@ts-ignore
          temp.splice(i, 1, {
            ...a,
            [key]: value,
          });
        }
      } else {
      }
    });
    setPurchasedPostage(temp);
  };

  const handleChangeDestinationPlace = (
    key: string,
    value: unknown,
    id: number
  ) => {
    let filteredPurchasedPostage = postages.filter(
      (item: { destination_place: unknown }) => {
        return item.destination_place === value;
      }
    );

    let temp:
      | any[]
      | ((
          prevState: {
            sender_place: string;
            destination_place: string;
            size: string;
            postage_price: number;
            quantity: number;
          }[]
        ) => {
          sender_place: string;
          destination_place: string;
          size: string;
          postage_price: number;
          quantity: number;
        }[]) = [];

    temp = temp.concat(purchasedPostage);
    temp.forEach((a, i) => {
      if (a.id === id) {
        if (!filteredPurchasedPostage.length) {
          //@ts-ignore
          temp.splice(i, 1, { ...a, [key]: value });
        } else {
          //@ts-ignore
          temp.splice(i, 1, {
            ...a,
            [key]: value,
          });
        }
      } else {
      }
    });
    setPurchasedPostage(temp);
  };

  const handleChangeSize = (key: string, value: unknown, id: number) => {
    let filteredPurchasedPostage = postages.filter(
      (item: { size: unknown }) => {
        return item.size === value;
      }
    );

    let temp:
      | any[]
      | ((
          prevState: {
            sender_place: string;
            destination_place: string;
            size: string;
            postage_price: number;
            quantity: number;
          }[]
        ) => {
          sender_place: string;
          destination_place: string;
          size: string;
          postage_price: number;
          quantity: number;
        }[]) = [];

    temp = temp.concat(purchasedPostage);
    temp.forEach((a, i) => {
      if (a.id === id) {
        if (!filteredPurchasedPostage.length) {
          //@ts-ignore
          temp.splice(i, 1, { ...a, [key]: value });
        } else {
          //@ts-ignore
          temp.splice(i, 1, {
            ...a,
            [key]: value,
          });
        }
      } else {
      }
    });
    setPurchasedPostage(temp);
  };

  const handleChangePostagePrice = (
    key: string,
    value: unknown,
    id: number
  ) => {
    let filteredPurchasedPostage = postages.filter(
      (item: { postage_price: unknown }) => {
        return item.postage_price === value;
      }
    );

    let temp:
      | any[]
      | ((
          prevState: {
            sender_place: string;
            destination_place: string;
            size: string;
            postage_price: 0;
            quantity: number;
          }[]
        ) => {
          sender_place: string;
          destination_place: string;
          size: string;
          postage_price: 0;
          quantity: number;
        }[]) = [];

    temp = temp.concat(purchasedPostage);
    temp.forEach((a, i) => {
      if (a.id === id) {
        if (!filteredPurchasedPostage.length) {
          //@ts-ignore
          temp.splice(i, 1, { ...a, [key]: value });
        } else {
          //@ts-ignore
          temp.splice(i, 1, {
            ...a,
            [key]: value,
          });
        }
      } else {
      }
    });
    setPurchasedPostage(temp);
  };

  const handleChangeQuantity = (key: string, value: unknown, id: number) => {
    let filteredPurchasedPostage = postages.filter(
      //@ts-ignore
      (item: { quantity: unknown }) => {
        return item.quantity === value;
      }
    );

    let temp:
      | any[]
      | ((
          prevState: {
            sender_place: string;
            destination_place: string;
            size: string;
            postage_price: number;
            quantity: number;
          }[]
        ) => {
          sender_place: string;
          destination_place: string;
          size: string;
          postage_price: number;
          quantity: number;
        }[]) = [];

    temp = temp.concat(purchasedPostage);
    temp.forEach((a, i) => {
      if (a.id === id) {
        if (!filteredPurchasedPostage.length) {
          //@ts-ignore
          temp.splice(i, 1, { ...a, [key]: value });
        } else {
          //@ts-ignore
          temp.splice(i, 1, {
            ...a,
            [key]: value,
          });
        }
      } else {
      }
    });
    setPurchasedPostage(temp);
  };

  const addPostageRow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const microtime = Date.now();
    setCount(microtime);
    const newRow = {
      sender_place: '埼玉県',
      destination_place: '',
      size: '',
      id: count,
      tax: 0.1,
      postage_price: 0,
      quantity: 1,
    };
    const newPostage = [...purchasedPostage, newRow];
    setPurchasedPostage(newPostage);
  };

  const removePostageRow = (id: number) => {
    const list = purchasedPostage.filter(item => item.id !== id);
    setPurchasedPostage(list);
  };

  //for selecting user
  const users = useSelector(getListUser, shallowEqual);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  // for selecting company-logo
  useEffect(() => {
    dispatch(getCompanyLogos());
  }, []);

  useEffect(() => {
    setUsagePeriod(
      moment(usage_period_start).format('YYYY年MM月DD日') +
        '~' +
        moment(usage_period_end).format('YYYY年MM月DD日')
    );
  }, [usage_period_end, usage_period_start]);

  const titleList = documents.map(d => {
    return d.document_title;
  });
  const titleLists = [...titleList];
  let uniqueTitleList = [...new Set(titleLists)];
  console.log('purchasedProduct', purchasedProduct);

  const productPriceList: number[] = purchasedProduct.map<number>(p => {
    const calc: number = Math.floor(p.unit_price * p.number);
    return calc;
  });

  const productPrice: number = productPriceList.reduce<number>(function(
    a: number,
    b: number
  ) {
    return a + b;
  },
  0);

  const postagePriceList: number[] = purchasedPostage.map<number>(p => {
    const calc: number = Math.floor(p.postage_price * p.quantity);
    return calc;
  });

  const postagePrice: number = postagePriceList.reduce<number>(function(
    a: number,
    b: number
  ) {
    return a + b;
  },
  0);

  const [sub_total, setSubTotal] = useState(0);
  const [total_price, setTotalPrice] = useState(0);
  useEffect(() => {
    setSubTotal(productPrice + postagePrice);
  }, [productPrice, postagePrice]);

  useEffect(() => {
    setTotalPrice(Math.floor(sub_total * 1.1));
  }, [sub_total]);

  const handleSelectCompanyLogo = (companyLogo: any) => {
    setImagePath(companyLogo);
  };

  const handleChangeBusinessPartnerCompanyName = (
    business_partner_company_name: any
  ) => {
    setBusinessPartnerCompanyName(business_partner_company_name);
  };

  const handleChangeDocumentTitle = (document_title: any) => {
    setDocumentTitle(document_title);
  };

  const [saveOpen, setSaveOpen] = useState(false);

  // モーダル
  const handleSaveOpen = () => {
    setSaveOpen(true);
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper>
        <CssBaseline>
          <Container fixed>
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <h2>{created_at}</h2>
                </div>
                <div>
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <BusinessPartnerCompanyNameTextField
                          documents={documents}
                          //@ts-ignore
                          business_partner_company_name={
                            business_partner_company_name
                          }
                          handleChangeBusinessPartnerCompanyName={
                            handleChangeBusinessPartnerCompanyName
                          }
                        />
                      </Grid>
                      <Grid item xs>
                        <FormControl>
                          <InputLabel>敬称</InputLabel>
                          <Select
                            labelId="敬称"
                            required
                            value={honorific_title}
                            onChange={e =>
                              setHonorificTitle((e.target
                                .value as unknown) as string)
                            }
                          >
                            <MenuItem value={'御中'}>御中</MenuItem>
                            <MenuItem value={'様'}>様</MenuItem>
                            <MenuItem value={'殿'}>殿</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs>
                        <p>
                          平素は格別のお引き立てを賜り厚く御礼申し上げます。
                        </p>
                        <p>下記の通りお見積もり申し上げます。</p>
                        <p>何卒宜しくお願い申し上げます。</p>
                      </Grid>
                      <Grid item xs>
                        <img
                          src={imgUrl(image_path)}
                          alt="company logo"
                          width="350px"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <DocumentTitleTextField
                          documents={documents}
                          documentTitle={document_title}
                          handleChangeDocumentTitle={handleChangeDocumentTitle}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl required className={classes.width}>
                          <InputLabel>担当</InputLabel>
                          <Select
                            required
                            value={user_id}
                            onChange={e =>
                              setUserId((e.target.value as unknown) as number)
                            }
                            id="username"
                            labelId="username"
                            className={classes.width}
                          >
                            {users.map(user => (
                              <MenuItem value={user.id}>{user.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <CompanyLogoSelect
                          handleSelectCompanyLogo={handleSelectCompanyLogo}
                          img_path={image_path}
                          companyLogos={companyLogos}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <TextField
                      fullWidth
                      label="有効期限"
                      value={payment_terms}
                      onChange={e => setPaymentTerms(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs>
                    <TermAndConditions
                      documents={documents}
                      term_and_conditions={term_and_conditions}
                      handleChangeTermAndConditions={
                        handleChangeTermAndConditions
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <DurationOfService
                      documents={documents}
                      duration_of_service={duration_of_service}
                      label="利用期間"
                      handleChangeDurationOfService={
                        handleChangeDurationOfService
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <KeyboardDatePicker
                      fullWidth
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="start-date"
                      label="利用開始日"
                      value={usage_period_start}
                      onChange={handleStartDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <KeyboardDatePicker
                      fullWidth
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="end-date"
                      label="利用終了日"
                      value={usage_period_end}
                      onChange={handleEndDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </Grid>
                <Divider variant="middle" className={classes.divider} />
                <Paper>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell>製品</TableCell>
                          <TableCell>数量</TableCell>
                          <TableCell>単位</TableCell>
                          <TableCell>単価 /￥</TableCell>
                          <TableCell>金額 /￥</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {purchasedProduct.map(p => (
                          <ProductRow
                            handleChangeName={handleChangeName}
                            handleChangeProduct={handleChangeProduct}
                            p={p}
                            products={products}
                            removeRow={removeRow}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <div className={classes.btn}>
                  <AddButton onClick={addRow} />
                </div>
                <Divider variant="middle" className={classes.divider} />
                <PostageTable
                  handleChangeSenderPlace={handleChangeSenderPlace}
                  handleChangeDestinationPlace={handleChangeDestinationPlace}
                  handleChangeSize={handleChangeSize}
                  handleChangePostagePrice={handleChangePostagePrice}
                  handleChangeQuantity={handleChangeQuantity}
                  purchasedPostage={purchasedPostage}
                  postages={postages}
                  addRow={addPostageRow}
                  removeRow={removePostageRow}
                />
                <Divider variant="middle" className={classes.divider} />
                <Paper>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>小計</TableCell>
                          <TableCell>消費税</TableCell>
                          <TableCell>合計</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{addSeparator(sub_total)}</TableCell>
                          <TableCell>10%</TableCell>
                          <TableCell>￥{addSeparator(total_price)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Divider variant="middle" className={classes.divider} />
                <TextField
                  id="remarks"
                  label="備考"
                  multiline
                  rows={8}
                  inputProps={{ maxLength: 500 }}
                  value={remarks}
                  variant="outlined"
                  onChange={e => setRemarks(e.target.value)}
                  className={classes.option}
                />
                <div className={classes.btn}>
                  <CreateButton onClick={handleSaveOpen} />
                </div>
                <Dialog open={saveOpen} onClose={handleSaveClose}>
                  <DialogTitle>確認</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      見積もりを作成しますか？
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
              </div>
            </form>
          </Container>
        </CssBaseline>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}
