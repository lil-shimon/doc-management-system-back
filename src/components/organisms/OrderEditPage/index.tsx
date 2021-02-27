import React, { useEffect, useState } from 'react';
import { OrderTop } from './orderTop';
import { OrderDown } from '../OrderNew/orderDown';
import { OrderItemEdit } from './orderitem';
import useStyles from './style';
import {
  Paper,
  Typography,
  Divider,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { TotalPriceEdit } from './totalPriceEdit';
import { AttachmentEdit } from './attachment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { deleteOrder, updateOrder } from '../../../redux/slicers/Order';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getListAttachment } from '../../../redux/selectors/attachment';
import { getOrderById } from '../../../redux/selectors/order';
import { getListOrderItem } from '../../../redux/selectors/orderItem';
import { useRouter } from 'next/router';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

export default function OrderEdit() {
  //編集する案件情報を取得
  const orders = useSelector(getOrderById, shallowEqual);
  const orderItems = useSelector(getListOrderItem, shallowEqual);
  const attachments = useSelector(getListAttachment, shallowEqual);

  // initial state (order_info, order_item, attachment)
  const [order_info, setOrderInfo] = useState([orders]);
  const [order_item, setOrderItem] = useState(orderItems);

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
  //@ts-ignore
  const [company_name, setCompanyName] = useState(orders.company_name);
  const [site_name, setSiteName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [site_representative, setSiteRepresentative] = useState('');
  const [site_representative_phone, setSiterepresentativePhone] = useState('');
  const [site_mail, setSiteMail] = useState('');
  const [site_address, setSiteAddress] = useState('');
  const [condition_name, setConditionName] = useState('');
  const [additional_invoice, setAdditionalInvoice] = useState('');
  const [created_at, setCreatedAt] = useState(null);
  const [user_id, setUserId] = useState(null);
  const [payment, setPayment] = useState('');

  console.log('site_representative_phone', site_representative_phone);
  //見積もり部
  const [order_date, setOrderDate] = useState<null | Date | any>(
    //@ts-ignore
    orderItems.order_date
  );
  //@ts-ignore
  const [note, setNote] = useState<any>(orderItems.note);
  //@ts-ignore
  const [sub_total, setSubTotal] = useState<any>(orderItems.sub_total);
  const [invoice, setInvoice] = useState<any>(null);
  const [quotation, setQuotation] = useState<any>(null);
  const [claim, setClaim] = useState<any>('');

  //その他添付ファイル
  const [file_path, setFilePath] = useState(null);
  const [file_path_two, setFilePathTwo] = useState(null);
  const [file_path_three, setFilePathThree] = useState(null);

  useEffect(() => {
    {
      orderItems.map(
        o => (
          setOrderDate(o.order_date),
          setNote(o.note),
          setSubTotal(o.sub_total),
          setClaim(o.claim)
        )
      );
      order_info.map(
        o => (
          //@ts-ignore
          setStartDate(o.start_date),
          //@ts-ignore
          setEndDate(o.end_date),
          //@ts-ignore
          setExpectedStartDate(o.expected_start_date),
          //@ts-ignore
          setExpectedEndDate(o.expected_end_date),
          //@ts-ignore
          setInvoiceNote(o.invoice_note),
          //@ts-ignore
          setSaleNote(o.sale_note),
          //@ts-ignore
          setMaintainanceNote(o.maintainance_note),
          //@ts-ignore
          setSimNumber(o.sim_number),
          //@ts-ignore
          //@ts-ignore
          setSignnageId(o.signnage_id),
          //@ts-ignore
          setTotalPrice(o.total_price),
          //@ts-ignore
          setCompanyName(o.company_name),
          //@ts-ignore
          setSiteName(o.site_name),
          //@ts-ignore
          setPhoneNumber(o.phone_number),
          //@ts-ignore
          setSiteRepresentative(o.site_representative),
          //@ts-ignore
          setSiterepresentativePhone(o.site_representative_phone),
          //@ts-ignore
          setSiteMail(o.site_mail),
          //@ts-ignore
          setSiteAddress(o.site_address),
          //@ts-ignore
          setConditionName(o.condition_name),
          //@ts-ignore
          setAdditionalInvoice(o.additional_invoice),
          //@ts-ignore
          setCreatedAt(o.created_at),
          //@ts-ignore
          setUserId(o.user_id),
          //@ts-ignore
          setPayment(o.payment)
        )
      );
    }
  }, []);

  // 終了ボタンに必要なstate
  const [open, setOpen] = useState(false);

  //編集保存時のコンファームstate
  const [editOpen, setEditOpen] = useState(false);

  //@ts-ignore
  const id = orders.id;

  //使用する関数を定義
  const dispatch = useDispatch();

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

  // 削除確認ダイアログを開く
  const handleClickOpen = () => {
    setOpen(true);
  };

  // 削除確認ダイアログを閉じる
  const handleClose = () => {
    setOpen(false);
  };

  // 案件削除
  const handleDeleteOrder = (id: number) => {
    dispatch(deleteOrder(id));
    setOpen(false);
    router.push('/orders/list');
  };

  //保存確認ダイアログに必要な関数
  const handleClickEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleSaveOrder = (id: number) => {
    dispatch(
      updateOrder(
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
        file_path_three,
        id
      )
    );
    router.push('/orders/list');
  };

  //ページ遷移関数
  const router = useRouter();
  const handleBack = () => {
    router.push('/orders/list');
  };

  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <h2>案件編集</h2>
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
              onClick={handleClickEditOpen}
            >
              <SaveAltIcon />
              保存
            </Button>
            <Dialog open={editOpen} onClose={handleEditClose}>
              <DialogTitle>確認</DialogTitle>
              <DialogContent>
                <DialogContentText>案件を保存しますか？</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleEditClose}
                  variant="outlined"
                  color="primary"
                >
                  いいえ
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleSaveOrder(id)}
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
              payment={payment}
              created_at={created_at}
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
            <Grid container spacing={1}>
              <Grid item xs={2}>
                {order_info.map(o => (
                  //@ts-ignore
                  <TotalPriceEdit total_price={o.total_price} />
                ))}
              </Grid>
              <Grid item xs={10}>
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
            {order_info.map(o => (
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
            ))}
          </Paper>
          <Grid container spacing={2}>
            <Grid item xs={10} />
            <Grid item xs={2}>
              <Button
                color="secondary"
                variant="contained"
                //@ts-ignore
                className={classes.btn}
                startIcon={<DeleteIcon />}
                onClick={handleClickOpen}
              >
                削除
              </Button>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>確認</DialogTitle>
            <DialogContent>
              <DialogContentText>本当に案件を削除しますか？</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined" color="primary">
                いいえ
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteOrder(id)}
              >
                はい
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
      </form>
    </MuiPickersUtilsProvider>
  );
}
