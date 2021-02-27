import {
  Button,
  Paper,
  TableHead,
  TableRow,
  Table,
  Grid,
  Box,
  Divider,
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PrintIcon from '@material-ui/icons/Print';
import React, { FC, useEffect, useState } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  getListDocument,
  getPurchasedProduct,
  getPurchasedPostage,
} from '../../../redux/selectors/document';
import moment from 'moment';
import useStyles from './styles';
import clsx from 'clsx';
import Head from 'next/head';
import { getListCompanyLogo } from '../../../redux/selectors/companyLogo';
import { imgUrl } from '../CompanyLogoPage';
import { getListUser } from '../../../redux/selectors/user';
import Loading from '../../molecules/Loading';

export const Price = (num1: number, num2: number) => {
  let price = Math.floor(num1 + num2);
  return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const priceIncludeTax = (num1: number, num2: number) => {
  let price = Math.floor(num1 * 1.1 + num2 * 1.1);
  return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

// 金額にカンマを付ける
export const addSeparator = (num: number | null | string) => {
  if (num !== null) {
    return String(num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  } else {
    return '-';
  }
};

export const unitPrice = (num1: number, num2: number) => {
  let Price = Math.floor(num1 * num2);
  if (num1 !== null) {
    return String(Price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  } else {
    return '-';
  }
};

export const Preview: FC<{ documents: any }> = ({ documents }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // for setting the document data
  const purchasedProducts = useSelector(getPurchasedProduct, shallowEqual);
  const purchasedPostages = useSelector(getPurchasedPostage, shallowEqual);
  const users = useSelector(getListUser, shallowEqual);

  const handlePdf = () => {
    const input = document.getElementById('page');
    //@ts-ignore
    html2canvas(input, {
      scale: 2,
      dpi: 192,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg', 1);
      //@ts-ignore
      const pdf = new jsPDF('p', 'pt', 'a4', true);
      const imgProps = pdf.getImageProperties(imgData);
      const width = pdf.internal.pageSize.getWidth();
      const height = (imgProps.height * width) / imgProps.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      pdf.save(`${documents.document_title}${documents.id}.pdf`);
    });
  };

  const printPdf = () => {
    const input = document.getElementById('page');
    //@ts-ignore
    html2canvas(input, {
      scale: 10,
      dpi: 192,
    }).then(canvas => {
      var htmlDoc = document.body.innerHTML; // bodyのhtmlを退避
      //@ts-ignore
      document.body.innerHTML = input.innerHTML; // 該当idのhtmlをdobyにつっこむ
      window.print(); // 印刷
      document.body.innerHTML = htmlDoc;
    });
  };

  // for price
  const productPriceList: number[] = purchasedProducts.map<number>(p => {
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

  const postagePriceList = purchasedPostages.map(p => {
    const calc = Math.floor(p.quantity * p.postage_price);
    return calc;
  });
  const postagePrice = postagePriceList.reduce(function(a, b) {
    return a + b;
  }, 0);

  const tax = (n1: number, n2: number) => {
    let price = Math.floor(n1 * 0.1 + n2 * 0.1);
    return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
  };

  const companyLogos = useSelector(getListCompanyLogo, shallowEqual);

  const addEnter = (word: string) => {
    return word.replace(/\n|\r\n|\r/g, '<br>');
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Head>
        <title>{documents.id}.pdf</title>
      </Head>
      <Button
        onClick={handlePdf}
        color="primary"
        variant="contained"
        className={classes.create}
      >
        <AddBoxIcon />
      </Button>
      <Button
        onClick={printPdf}
        color="primary"
        variant="contained"
        className={classes.create}
      >
        <PrintIcon />
      </Button>
      <div className={classes.page}>
        <Paper component="div" id="page" className={classes.inpage}>
          <div className={classes.first}>
            <div className={classes.mitsumori}>御見積書</div>
            <div className={classes.dateAndNo}>
              <div className={classes.date}>
                {moment(documents.created_at).format('YYYY年MM月DD日')}
                <br />
                No.{documents.id}
              </div>
            </div>
          </div>
          <div>
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <p className={classes.partner}>
                  {documents.business_partner_company_name}
                </p>
                <p className={classes.greet}>
                  平素は格別のお引き立てを賜り厚く御礼申し上げます。
                  <br />
                  下記の通りお見積もり申し上げます。
                  <br />
                  何卒宜しくお願い申し上げます。
                </p>
              </Grid>
              <Grid item xs>
                <p>{documents.honorific_title}</p>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.questarlogo}>
                  <img
                    src={imgUrl(documents.logo_img_path)}
                    alt="company logo"
                    id="img"
                    width="200px"
                  />
                  {users.map(u => (
                    <Box
                      justifyContent="flex-start"
                      className={classes.username}
                    >
                      {u.name}
                    </Box>
                  ))}
                </div>
              </Grid>
              <Grid item xs />
            </Grid>
            <TableContainer>
              <Table size="small" className={classes.upperTable}>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.contentKenmei}>
                      件名
                    </TableCell>
                    <TableCell className={classes.contentTitle}>
                      {documents.document_title}
                    </TableCell>
                    <TableCell className={classes.contentTitle}>
                      有効期限 :
                    </TableCell>
                    <TableCell className={classes.contentTitle}>
                      {documents.payment_terms}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.contentTitle}>
                      利用期間 :
                    </TableCell>
                    <TableCell className={classes.contentTitle}>
                      {documents.duration_of_service}
                    </TableCell>
                    <TableCell className={classes.contentTitle}>
                      契約条件 :
                    </TableCell>
                    <TableCell className={classes.contentTitle}>
                      {documents.term_and_conditions}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <TableContainer>
            <Table
              size="small"
              alia-label="a dense table"
              className={classes.tableArea}
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableName}>製品</TableCell>
                  <TableCell className={classes.tableHead}>数量</TableCell>
                  <TableCell className={classes.tableHead}>単位</TableCell>
                  <TableCell className={classes.tableHead}>単価 /￥</TableCell>
                  <TableCell className={classes.tableHead}>金額 /￥</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchasedProducts.map(pp => (
                  <TableRow key={pp.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableProductName}
                    >
                      {pp.name}
                      <br />
                      {pp.notes}
                    </TableCell>
                    <TableCell className={classes.tableItem}>
                      {pp.number}
                    </TableCell>
                    <TableCell className={classes.tableItem}>
                      {pp.unit}
                    </TableCell>
                    <TableCell className={classes.tableItem}>
                      {addSeparator(pp.unit_price)}
                    </TableCell>
                    <TableCell className={classes.tableItem}>
                      {unitPrice(pp.unit_price, pp.number)}
                    </TableCell>
                  </TableRow>
                ))}
                {purchasedPostages.map(pp => (
                  <TableRow key={pp.id}>
                    <TableCell
                      className={clsx(classes.table, classes.tableProductName)}
                    >
                      {pp.sender_place}~{pp.destination_place}運送費
                    </TableCell>
                    <TableCell className={classes.tableItem}>
                      {pp.quantity}
                    </TableCell>
                    <TableCell className={classes.tableItem}>個</TableCell>
                    <TableCell className={classes.tableItem}>
                      {addSeparator(pp.postage_price)}
                    </TableCell>
                    <TableCell className={classes.tableItem}>
                      {unitPrice(pp.postage_price, pp.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container spacing={0}>
            <Grid item xs={8} className={classes.tableItem} />
            <Grid item xs={1} className={classes.tableItemMargin}>
              小計
            </Grid>
            <Grid item xs={1} className={classes.tableItem} />
            <Grid item xs={1} className={classes.tableItem}>
              {addSeparator(documents.sub_total)}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8} />
            <Grid item xs={3} className={classes.dividerMargin}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={8} className={classes.tableItem} />
            <Grid item xs={1} className={classes.tableItemMargin}>
              消費税
            </Grid>
            <Grid item xs={1} className={classes.tableItem}>
              10%
            </Grid>
            <Grid item xs={1} className={classes.tableItem}>
              {tax(productPrice, postagePrice)}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8} />
            <Grid item xs={3} className={classes.dividerMargin}>
              <Divider />
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={8} className={classes.tableItem} />
            <Grid item xs={1} className={classes.tableItemMargin}>
              合計
            </Grid>
            <Grid item xs={1} className={classes.tableItem} />
            <Grid item xs={1} className={classes.tableItem}>
              ￥{addSeparator(documents.total_price)}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={8} />
            <Grid item xs={3} className={classes.dividerMargin}>
              <Divider />
            </Grid>
          </Grid>
          <p className={classes.bikou}>備考</p>
          <p className={classes.remarks}>{documents.remarks}</p>
        </Paper>
      </div>
    </React.Fragment>
  );
};

export default Preview;
