import React, { useState } from 'react';
import { OrderTop } from '../OrderEditPage/orderTop';
import { OrderDown } from './orderDown';
import useStyles from './style';
import {
  Paper,
  Typography,
  Divider,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { storeOrder } from '../../../redux/slicers/Order';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { OrderItemEdit } from '../OrderEditPage/orderitem';
import { TotalPriceEdit } from '../OrderEditPage/totalPriceEdit';
import { AttachmentEdit } from '../OrderEditPage/attachment';

export default function OrderNew() {
  //使用する関数を定義
  const dispatch = useDispatch();

  //案件初期状態
  const [start_date, setStartDate] = useState<Date | null>(null);
  const [end_date, setEndDate] = useState<Date | null>(null);
  const [expected_start_date, setExpectedStartDate] = useState<Date | null>(
    null
  );
  const [expected_end_date, setExpectedEndDate] = useState<Date | null>(null);
  const [invoice_note, setInvoiceNote] = useState('');
  const [sale_note, setSaleNote] = useState('');
  const [maintainance_note, setMaintainanceNote] = useState('');
  const [sim_number, setSimNumber] = useState('');
  const [signnage_id, setSignnageId] = useState('');
  const [total_price, setTotalPrice] = useState(0);
  const [company_name, setCompanyName] = useState('');
  const [site_name, setSiteName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [site_representative, setSiteRepresentative] = useState('');
  const [site_representative_phone, setSiterepresentativePhone] = useState('');
  const [site_mail, setSiteMail] = useState('');
  const [site_address, setSiteAddress] = useState('');
  const [condition_name, setConditionName] = useState('');
  const [additional_invoice, setAdditionalInvoice] = useState('');
  const [user_id, setUserId] = useState(null);
  const [payment, setPayment] = useState('');
  const created_at = new Date();
  //見積もり部
  const [order_date, setOrderDate] = useState<null | Date | any>(new Date());
  const [note, setNote] = useState<any>('');
  const [sub_total, setSubTotal] = useState<any>('');
  const [invoice, setInvoice] = useState<any>(null);
  const [quotation, setQuotation] = useState<any>(null);
  const [claim, setClaim] = useState<any>('');

  //その他添付ファイル
  const [file_path, setFilePath] = useState(null);
  const [file_path_two, setFilePathTwo] = useState(null);
  const [file_path_three, setFilePathThree] = useState(null);

  // state handler
  // 見積もり部
  const handleChangeOrderDate = (date: Date | null) => {
    setOrderDate(date);
  };

  const handleChangeNote = (e: any) => {
    setNote(e.target.value);
  };

  const handleChangeSubTotal = (e: any) => {
    setSubTotal(e.target.value);
  };

  const handleChangeQuotation = (e: any) => {
    const file = e.target.files[0];
    setQuotation(file);
  };

  const handleChangeInvoice = (e: any) => {
    const file = e.target.files[0];
    setInvoice(file);
  };

  const handleChangeClaim = (e: any) => {
    setClaim(e.target.value);
  };

  // 案件部分
  const handleChangeStartDate = (date: Date | null) => {
    setStartDate(date);
  };

  const handleChangeEndDate = (date: Date | null) => {
    setEndDate(date);
  };

  const handleChangeExpectedStartDate = (date: Date | null) => {
    setExpectedStartDate(date);
  };

  const handleChangeExpectedEndDate = (date: Date | null) => {
    setExpectedEndDate(date);
  };

  const handleChangeCompanyName = (e: any) => {
    setCompanyName(e.target.value);
  };

  const handleChangeSiteName = (e: any) => {
    setSiteName(e.target.value);
  };

  const handleChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangeSiteRepresentative = (e: any) => {
    setSiteRepresentative(e.target.value);
  };

  const handleChangeSiteRepresentativePhone = (e: any) => {
    setSiterepresentativePhone(e.target.value);
  };

  const handleChangeSiteMail = (e: any) => {
    setSiteMail(e.target.value);
  };

  const handleChangeSiteAddress = (e: any) => {
    setSiteAddress(e.target.value);
  };

  const handleChangeConditionName = (e: any) => {
    setConditionName(e.target.value);
  };

  const handleChangeUserId = (e: any) => {
    setUserId(e.target.value);
  };

  //案件下部
  const handleChangeInvoiceNote = (e: any) => {
    setInvoiceNote(e.target.value);
  };

  const handleChangeSaleNote = (e: any) => {
    setSaleNote(e.target.value);
  };

  const handleChangeMaintainanceNote = (e: any) => {
    setMaintainanceNote(e.target.value);
  };

  const handleChangeSignnageId = (e: any) => {
    setSignnageId(e.target.value);
  };

  const handleChangeAdditionalInvoice = (e: any) => {
    setAdditionalInvoice(e.target.value);
  };

  const handleChangePayment = (e: any) => {
    setPayment(e.target.value);
  };

  // attachments
  const handleChangeFilePath = (e: any) => {
    const file = e.target.files[0];
    setFilePath(file);
  };

  const handleChangeFilePathTwo = (e: any) => {
    const file = e.target.files[0];
    setFilePathTwo(file);
  };

  const handleChangeFilePathThree = (e: any) => {
    const file = e.target.files[0];
    setFilePathThree(file);
  };

  //ページ遷移関数
  const router = useRouter();
  const handleBack = () => {
    router.push('/orders/list');
  };

  //作成時確認ダイアログ
  const [newOpen, setNewOpen] = useState(false);
  const handleClickNewOpen = () => {
    setNewOpen(true);
  };
  const handleNewClose = () => {
    setNewOpen(false);
  };

  // submit
  const handleNewOrder = () => {
    dispatch(
      storeOrder(
        start_date,
        end_date,
        expected_start_date,
        expected_end_date,
        //@ts-ignore
        user_id,
        company_name,
        site_name,
        phone_number,
        site_representative,
        site_representative_phone,
        site_mail,
        site_address,
        condition_name,
        payment,
        note,
        sub_total,
        quotation,
        invoice,
        claim,
        order_date,
        invoice_note,
        sale_note,
        maintainance_note,
        signnage_id,
        additional_invoice,
        file_path,
        file_path_two,
        file_path_three
      )
    );
    router.push('/orders/list');
  };

  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form onSubmit={handleNewOrder}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <h2>案件登録</h2>
          </Grid>
          <Grid item xs>
            <Button variant="contained" onClick={handleBack}>
              戻る
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickNewOpen}
            >
              作成
            </Button>
            <Dialog open={newOpen} onClose={handleNewClose}>
              <DialogTitle>確認</DialogTitle>
              <DialogContent>
                <DialogContentText>案件を作成しますか？</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleNewClose}
                  variant="outlined"
                  color="primary"
                >
                  いいえ
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleNewOrder()}
                >
                  はい
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
        <Typography>
          <Paper className={classes.page}>
            {/* @ts-ignore */}
            <OrderTop
              start_date={start_date}
              end_date={end_date}
              expected_start_date={expected_start_date}
              expected_end_date={expected_end_date}
              user_id={user_id}
              company_name={company_name}
              site_name={site_name}
              phone_number={phone_number}
              site_representative={site_representative}
              site_representative_phone={site_representative_phone}
              site_mail={site_mail}
              site_address={site_address}
              condition_name={condition_name}
              created_at={created_at}
              payment={payment}
              handleChangeStartDate={handleChangeStartDate}
              handleChangeEndDate={handleChangeEndDate}
              handleChangeExpectedStartDate={handleChangeExpectedStartDate}
              handleChangeExpectedEndDate={handleChangeExpectedEndDate}
              handleChangeCompanyName={handleChangeCompanyName}
              handleChangeSiteName={handleChangeSiteName}
              handleChangePhoneNumber={handleChangePhoneNumber}
              handleChangeSiteRepresentative={handleChangeSiteRepresentative}
              handleChangeSiteRepresentativePhone={
                handleChangeSiteRepresentativePhone
              }
              handleChangeSiteMail={handleChangeSiteMail}
              handleChangeSiteAddress={handleChangeSiteAddress}
              handleChangeConditionName={handleChangeConditionName}
              handleChangeUserId={handleChangeUserId}
              handleChangePayment={handleChangePayment}
            />
            <Divider variant="middle" className={classes.divider} />
            <OrderItemEdit
              order_date={order_date}
              note={note}
              sub_total={sub_total}
              quotation={quotation}
              invoice={invoice}
              claim={claim}
              handleChangeOrderDate={handleChangeOrderDate}
              handleChangeNote={handleChangeNote}
              handleChangeSubTotal={handleChangeSubTotal}
              handleChangeQuotation={handleChangeQuotation}
              handleChangeInvoice={handleChangeInvoice}
              handleChangeClaim={handleChangeClaim}
            />
            <Grid container spacing={2}>
              <Grid item xs>
                <TotalPriceEdit total_price={total_price} />
              </Grid>
              <Grid item xs>
                <AttachmentEdit
                  file_path={file_path}
                  file_path_two={file_path_two}
                  file_path_three={file_path_three}
                  handleChangeFilePath={handleChangeFilePath}
                  handleChangeFilePathTwo={handleChangeFilePathTwo}
                  handleChangeFilePathThree={handleChangeFilePathThree}
                />
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <OrderDown
              invoice_note={invoice_note}
              sale_note={sale_note}
              maintainance_note={maintainance_note}
              signnage_id={signnage_id}
              additional_invoice={additional_invoice}
              handleChangeInvoiceNote={handleChangeInvoiceNote}
              handleChangeSaleNote={handleChangeSaleNote}
              handleChangeMaintainanceNote={handleChangeMaintainanceNote}
              handleChangeSignnageId={handleChangeSignnageId}
              handleChangeAdditionalInvoice={handleChangeAdditionalInvoice}
            />
          </Paper>
        </Typography>
      </form>
    </MuiPickersUtilsProvider>
  );
}
