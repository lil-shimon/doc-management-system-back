import {
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import moment from 'moment';
import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  setPurchasedPostage,
  setPurchasedProduct,
  getDocumentById,
} from '../../../redux/slicers/document';
import { useDispatch } from 'react-redux';
import { storeOrderFromDocument } from '../../../redux/slicers/Order';
import useStyles from '../../organisms/DocumentLists/styles';
import { getUsersById } from '../../../redux/slicers/user';
import Loading from '../Loading';

export const DocumentListTableRow: FC<{
  document: any;
  handleReload: any;
  docArray: any;
}> = ({ document, handleReload, docArray }) => {
  //必要な定数を定義
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    setLoading(false);
  }, []);

  //必要なstateを定義
  const [orderOpen, setOrderOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // 受注ボタンから案件と案件見積部作成
  const handleCreateOrderBydocument = (
    id: number,
    user_id: number,
    business_partner_company_name: string,
    document_title: string | null,
    total_price: number,
    sub_total: number
  ) => {
    setLoading(true);
    dispatch(
      storeOrderFromDocument(
        id,
        user_id,
        business_partner_company_name,
        document_title,
        document_title,
        total_price,
        sub_total
      )
    );
    handleReload(true);
    setOrderOpen(false);
    setLoading(false);
  };

  const handleMovePreview = (id: number) => {
    dispatch(getDocumentById(document.id));
    dispatch(setPurchasedPostage(document.id));
    dispatch(setPurchasedProduct(document.id));
    dispatch(getUsersById(document.user_id));
    router.push('/documents/preview');
    setLoading(false);
  };

  const handleOrderOpen = () => {
    setOrderOpen(true);
  };

  const handleOrderClose = () => {
    setOrderOpen(false);
  };

  //受注ボタン
  let orderButton: JSX.Element;
  if (docArray.includes(document.id)) {
    orderButton = (
      <div>
        <Button variant="contained" color="secondary">
          受注
        </Button>
      </div>
    );
  } else {
    orderButton = (
      <div>
        <Button
          variant="contained"
          //@ts-ignore
          onClick={handleOrderOpen}
        >
          受注
        </Button>
        <Dialog open={orderOpen} onClose={handleOrderClose}>
          <DialogTitle>確認</DialogTitle>
          <DialogContent>
            <DialogContentText>受注にしますか？</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleOrderClose}
              variant="outlined"
              color="primary"
            >
              いいえ
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                handleCreateOrderBydocument(
                  document.id,
                  document.user_id,
                  document.business_partner_company_name,
                  document.document_title,
                  document.total_price,
                  document.sub_total
                );
              }}
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <TableRow key={document.id}>
        <TableCell>
          <Button
            color="primary"
            startIcon={<DescriptionIcon />}
            onClick={() => handleMovePreview(document.id)}
          />
        </TableCell>
        <TableCell>{document.id}</TableCell>
        <TableCell>
          {moment(document.created_at).format('YYYY年MM月DD日')}
        </TableCell>
        <TableCell>{document.document_title}</TableCell>
        <TableCell className={classes.companyName}>
          {document.business_partner_company_name}
        </TableCell>
        <TableCell>{document.users.name}</TableCell>
        <TableCell>{orderButton}</TableCell>
      </TableRow>
    </React.Fragment>
  );
};
