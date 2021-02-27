import DateFnsUtils from '@date-io/date-fns';
import {
  Container,
  Divider,
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AddButton, CreateButton } from '../../components/atoms/Buttons';
import { getListPostage } from '../../redux/selectors/postage';
import { getListProduct } from '../../redux/selectors/product';
import { getListUser } from '../../redux/selectors/user';
import {
  copyDocuments,
  documentDelete,
  editDocument,
  setPurchasedPostage,
  setPurchasedProduct,
} from '../../redux/slicers/document';
import { getPostages } from '../../redux/slicers/postage';
import { getProducts } from '../../redux/slicers/product';
import { getUsers } from '../../redux/slicers/user';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import {
  getDocumentByDid,
  getPurchasedPostage,
  getPurchasedProduct,
} from '../../redux/selectors/document';
import { getListCompanyLogo } from '../../redux/selectors/companyLogo';
import { useRouter } from 'next/router';
import useStyles from '../../components/organisms/CreateDocument/styles';
import { imgUrl } from '../../components/organisms/CompanyLogoPage';
import { ProductRow } from '../../components/molecules/ProductRow';
import { DurationOfService } from '../../components/molecules/DurationOfService';
import { PostageTable } from '../../components/molecules/PostageTable';
import { addSeparator } from '../../components/organisms/preview/preview';
import { getCompanyLogos } from '../../redux/slicers/companyLogo';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import Loading from '../../components/molecules/Loading';

const filter = createFilterOptions<any>();

export default function EditDocumentPage() {
  const [loading, setLoading] = useState(true);
  const tax = '0.1';

  const document = useSelector(getDocumentByDid, shallowEqual);
  const [documents, setDocument] = useState([document]);
  //@ts-ignore
  const [id, setId] = useState<number>(document.id);
  const [
    business_partner_company_name,
    setBusinessPartnerCompanyName,
    //@ts-ignore
  ] = useState<string>(document.business_partner_company_name);
  const [document_title, setDocumentTitle] = useState<string | null>(
    //@ts-ignore
    document.document_title
  );
  const [document_type_id] = useState<number>(1);
  const [count, setCount] = useState(20);
  const [honorific_title, setHonorificTitle] = useState<string>(
    //@ts-ignore
    document.honorific_title
  );
  const [logo_img_path, setLogoImgPath] = useState<string>(
    //@ts-ignore
    document.logo_img_path
  );
  const [payment_terms, setPaymentTerms] = useState<string | null>(
    //@ts-ignore
    document.payment_terms
  );
  const [term_and_conditions, setTermAndConditions] = useState<string | null>(
    ''
  );
  const [duration_of_service, setDurationOfService] = useState<string | null>(
    //@ts-ignore
    document.duration_of_service
  );
  //@ts-ignore
  const [user_id, setUserId] = useState<number>(document.user_id);
  const [number, setNumber] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [unit_price, setUnitPrice] = useState(0);
  const [postage_price, setPostagePrice] = useState(0);
  //@ts-ignore
  const [remarks, setRemarks] = useState<string | null>(document.remarks);
  const [usage_period, setUsagePeriod] = useState('');
  const [usage_period_start, setUsagePeriodStart] = React.useState<Date | null>(
    null
  );
  const [usage_period_end, setUsagePeriodEnd] = React.useState<Date | null>(
    null
  );

  useEffect(() => {
    //@ts-ignore
    setId(document.id),
      //@ts-ignore
      setBusinessPartnerCompanyName(document.business_partner_company_name),
      //@ts-ignore
      setDocumentTitle(document.document_title),
      //@ts-ignore
      setHonorificTitle(document.honorific_title),
      //@ts-ignore
      setPaymentTerms(document.payment_terms),
      //@ts-ignore
      setTermAndConditions(document.term_and_conditions),
      //@ts-ignore
      setDurationOfService(document.duration_of_service),
      //@ts-ignore
      setUserId(document.user_id),
      //@ts-ignore
      setRemarks(document.remarks),
      //@ts-ignore
      setLogoImgPath(document.logo_img_path),
      setLoading(false);
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const see_part_id = 1;
  const sell_part_id = 1;
  const customer_part_id = 1;
  const quotation_expiration_date = '60日';

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await dispatch(
      editDocument(
        id,
        business_partner_company_name,
        document_title,
        document_type_id,
        honorific_title,
        logo_img_path,
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
        customer_part_id,
        see_part_id,
        sell_part_id,
        purchasedProduct,
        purchasedPostage,
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

  // for setting the document data
  const purchasedProducts = useSelector(getPurchasedProduct, shallowEqual);
  const purchasedPostages = useSelector(getPurchasedPostage, shallowEqual);
  const companyLogos = useSelector(getListCompanyLogo, shallowEqual);
  const [purchasedProduct, setPurchasedProducts] = useState(purchasedProducts);
  const [purchasedPostage, setPurchasedPostages] = useState(purchasedPostages);

  const partnerList = documents.map(
    //@ts-ignore
    (d: { business_partner_company_name: string }) => {
      return d.business_partner_company_name;
    }
  );
  const partnerLists = [...partnerList];
  let uniquePartnerList = [...new Set(partnerLists)];

  const newTermAndConditions = documents.map(d => {
    //@ts-ignore
    return d.term_and_conditions;
  });
  const newDocuments = [...newTermAndConditions];
  let uniqueTermAndConditions = [...new Set(newDocuments)];

  const documentTitleList = documents.map(
    //@ts-ignore
    (d: { document_title: string | null }) => {
      //@ts-ignore
      return d.document_title;
    }
  );

  const documentTitleLists = [...documentTitleList];
  let uniqueDocumentTitleList = [...new Set(documentTitleLists)];

  const handleChangeDurationOfService = (duration_of_service: any) => {
    setDurationOfService(duration_of_service);
  };

  //for product table
  const products = useSelector(getListProduct, shallowEqual);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleChangeName = (key: string, value: unknown, id: number) => {
    let filteredPurchasedProduct = products.filter(
      (item: { name: unknown }) => {
        return item.name === value;
      }
    );
    let temp:
      | any[]
      | ((
          prevState: {
            name: string;
            unit: string;
            unit_price: 0;
            number: number;
            id: number;
            tax: string;
            productPrice: number;
            notes: string;
          }[]
        ) => {
          name: string;
          unit: string;
          unit_price: 0;
          number: number;
          id: number;
          tax: string;
          productPrice: number;
          notes: string;
        }[]) = [];

    temp = temp.concat(purchasedProduct);
    temp.forEach((a, i) => {
      if (a.id === id) {
        if (!filteredPurchasedProduct.length) {
          //@ts-ignore
          temp.splice(i, 1, { ...a, [key]: value });
        } else {
          //@ts-ignore
          temp.splice(i, 1, {
            ...a,
            [key]: value,
            ['unit_price']: filteredPurchasedProduct[unit_price].unit_price,
            ['notes']: filteredPurchasedProduct[unit_price].notes,
            ['unit']: filteredPurchasedProduct[unit_price].unit,
          });
        }
      } else {
      }
    });
    setPurchasedProducts(temp);
  };

  const handleChangeProduct = (key: string, value: string, id: number) => {
    let temp:
      | any[]
      | ((
          prevState: {
            name: string;
            unit: string;
            unit_price: 0;
            number: number;
            id: number;
            tax: string;
            productPrice: number;
            notes: string;
          }[]
        ) => {
          name: string;
          unit: string;
          unit_price: 0;
          number: number;
          id: number;
          tax: string;
          productPrice: number;
          notes: string;
        }[]) = [];
    temp = temp.concat(purchasedProduct);
    temp.forEach((a, i) => {
      if (a.id === id) {
        //@ts-ignore
        temp.splice(i, 1, { ...a, [key]: value });
      }
    });
    setPurchasedProducts(temp);
  };

  const addRow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const microtime = Date.now();
    setCount(microtime);
    const newRow = {
      name: '',
      unit: '式',
      unit_price: null,
      number: 1,
      id: count,
      tax: '0.1',
      productPrice: number * unit_price,
      notes: null,
    };
    const newProduct = [...purchasedProduct, newRow];
    //@ts-ignore
    setPurchasedProducts(newProduct);
  };

  const removeRow = (id: number) => {
    const list = purchasedProduct.filter(item => item.id !== id);
    setPurchasedProducts(list);
  };

  const newUnitArray = products.map(p => {
    return p.unit;
  });
  const newUnit = [...newUnitArray];
  let uniqueUnit = [...new Set(newUnit)];

  const newProductNameArray = products.map(p => {
    return p.name;
  });
  const productNameArray = [...newProductNameArray];
  let uniqueProductName = [...new Set(productNameArray)];

  //for postage table
  const postages = useSelector(getListPostage, shallowEqual);

  useEffect(() => {
    dispatch(getPostages());
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
    setPurchasedPostages(temp);
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
    setPurchasedPostages(temp);
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
    setPurchasedPostages(temp);
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
    setPurchasedPostages(temp);
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
    setPurchasedPostages(temp);
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
    //@ts-ignore
    setPurchasedPostages(newPostage);
  };

  const removePostageRow = (id: number) => {
    const list = purchasedPostage.filter(item => item.id !== id);
    setPurchasedPostages(list);
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
    console.log(usage_period);
  }, [usage_period_end, usage_period_start]);

  // for price
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

  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);

  //モーダルopen and close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListOpen = () => {
    setListOpen(true);
  };

  const handleListClose = () => {
    setListOpen(false);
  };

  const handleShowOpen = () => {
    setShowOpen(true);
  };

  const handleShowClose = () => {
    setShowOpen(false);
  };

  const handleSaveOpen = () => {
    setSaveOpen(true);
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
  };

  const handleCopyClose = () => {
    setCopyOpen(false);
  };

  const handleCopyOpen = () => {
    setCopyOpen(true);
  };

  //ページ遷移関数
  const handleBackList = () => {
    setListOpen(false);
    router.push('/documents/mitsumori');
  };

  const handleBackPreview = () => {
    setShowOpen(false);
    router.push('/documents/preview');
  };

  const handleCopy = () => {
    dispatch(
      copyDocuments(
        id,
        business_partner_company_name,
        //@ts-ignore
        document_title,
        document_type_id,
        honorific_title,
        logo_img_path,
        payment_terms,
        quotation_expiration_date,
        tax,
        term_and_conditions,
        usage_period,
        //@ts-ignore
        usage_period_start,
        usage_period_end,
        duration_of_service,
        user_id,
        remarks,
        customer_part_id,
        see_part_id,
        sell_part_id,
        //@ts-ignore
        purchasedProducts,
        //@ts-ignore
        purchasedPostages,
        sub_total,
        total_price
      )
    );
    // location.reload();
    router.push('/documents/mitsumori');
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <h2>見積編集</h2>
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
        {/* <Grid item xs>
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
        </Grid> */}
        <Grid item xs>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FileCopyIcon />}
            onClick={handleCopyOpen}
          >
            コピー
          </Button>
          <Dialog open={copyOpen} onClose={handleCopyClose}>
            <DialogTitle>確認</DialogTitle>
            <DialogContent>
              <DialogContentText>見積もりをコピーしますか？</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCopyClose}
                variant="outlined"
                color="primary"
              >
                いいえ
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCopy}>
                はい
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs>
          <Button
            color="secondary"
            variant="contained"
            //@ts-ignore
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={handleClickOpen}
          >
            削除
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>確認</DialogTitle>
            <DialogContent>
              <DialogContentText>
                本当に見積もりを削除しますか？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="primary">
                いいえ
              </Button>
              <a
                onClick={(
                  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ): void => {
                  dispatch(documentDelete([Number(id)], id));
                  setOpen(false);
                  router.push('/documents/mitsumori');
                }}
              >
                <Button variant="outlined" color="secondary">
                  はい
                </Button>
              </a>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper>
          <Container fixed>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    value={business_partner_company_name}
                    onChange={(e, newValue: string | null) => {
                      if (typeof newValue === 'string') {
                        setBusinessPartnerCompanyName(newValue);
                      } else if (
                        newValue &&
                        //@ts-ignore
                        newValue.inputValue
                      ) {
                        setBusinessPartnerCompanyName(
                          //@ts-ignore
                          newValue.inputValue
                        );
                      } else {
                        setBusinessPartnerCompanyName(
                          //@ts-ignore
                          newValue
                        );
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      if (params.inputValue !== '') {
                        filtered.push(params.inputValue);
                      }
                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={uniquePartnerList}
                    getOptionLabel={option => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      return option;
                    }}
                    freeSolo
                    renderInput={params => (
                      <TextField {...params} label="取引先名" />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl>
                    <InputLabel>敬称</InputLabel>
                    <Select
                      label="敬称"
                      value={honorific_title}
                      onChange={e =>
                        setHonorificTitle(e.target.value as string)
                      }
                    >
                      <MenuItem value={'御中'}>御中</MenuItem>
                      <MenuItem value={'様'}>様</MenuItem>
                      <MenuItem value={'殿'}>殿</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <p>No.{id}</p>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs>
                  <p>平素は格別のお引き立てを賜り厚く御礼申し上げます。</p>
                  <p>下記の通りお見積もり申し上げます。</p>
                  <p>何卒宜しくお願い申し上げます。</p>
                </Grid>
                <Grid item xs>
                  <img
                    src={imgUrl(logo_img_path)}
                    alt="company logo"
                    width="350px"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Autocomplete
                    value={document_title}
                    onChange={(e, newValue: string | null) => {
                      if (typeof newValue === 'string') {
                        setDocumentTitle(newValue);
                        //@ts-ignore
                      } else if (newValue && newValue.inputValue) {
                        //@ts-ignore
                        setDocumentTitle(newValue.inputValue);
                      } else {
                        setDocumentTitle(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      if (params.inputValue !== '') {
                        filtered.push(params.inputValue);
                      }
                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={uniqueDocumentTitleList}
                    //@ts-ignore
                    getOptionLabel={option => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      return option;
                    }}
                    freeSolo
                    renderInput={params => (
                      <TextField {...params} label="件名" />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl required className={classes.width}>
                    <InputLabel>ユーザー名</InputLabel>
                    <Select
                      value={user_id}
                      onChange={e => setUserId(e.target.value as number)}
                    >
                      {users.map(user => (
                        <MenuItem value={user.id}>{user.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl className={classes.width}>
                    <InputLabel>
                      会社ロゴ(上記の画像のものが選択されています)
                    </InputLabel>
                    <Select
                      value={logo_img_path}
                      onChange={e => setLogoImgPath(e.target.value as string)}
                      id="company-logo"
                      required
                    >
                      {companyLogos.map(
                        (c: {
                          img_path:
                            | string
                            | number
                            | readonly string[]
                            | undefined;
                          name: React.ReactNode;
                        }) => (
                          <MenuItem value={c.img_path}>{c.name}</MenuItem>
                        )
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="有効期限"
                    value={payment_terms}
                    onChange={e => setPaymentTerms(e.target.value)}
                  />
                </Grid>
                <Grid item xs>
                  <Autocomplete
                    value={term_and_conditions}
                    onChange={(e, newValue: string | null) => {
                      if (typeof newValue === 'string') {
                        setTermAndConditions(newValue);
                        //@ts-ignore
                      } else if (newValue && newValue.inputValue) {
                        //@ts-ignore
                        setTermAndConditions(newValue.inputValue);
                      } else {
                        setTermAndConditions(newValue);
                      }
                    }}
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      if (params.inputValue !== '') {
                        filtered.push(params.inputValue);
                      }
                      return filtered;
                    }}
                    selectOnFocus
                    handleHomeEndKeys
                    clearOnBlur
                    options={uniqueTermAndConditions}
                    //@ts-ignore
                    getOptionLabel={option => {
                      if (typeof option === 'string') {
                        return option;
                      }
                      return option;
                    }}
                    freeSolo
                    renderInput={params => (
                      <TextField {...params} label="契約条件" />
                    )}
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
                    label="利用開始日"
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
                  <Table>
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
                className={classes.option}
                inputProps={{ maxLength: 500 }}
                value={remarks}
                placeholder="テキストを入力"
                variant="outlined"
                onChange={e => setRemarks(e.target.value)}
              />
              <div className={classes.btn}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveOpen}
                >
                  保存
                </Button>
                <Dialog open={saveOpen} onClose={handleSaveClose}>
                  <DialogTitle>確認</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      見積もりを保存しますか？
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
        </Paper>
      </MuiPickersUtilsProvider>
    </>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
