import React, { useEffect, useState } from 'react';
import { Paper, Table, TableHead, TableRow } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getDocuments } from '../../../redux/slicers/document';
import { getListDocument } from '../../../redux/selectors/document';
import UseStyles from './styles';
import { DocumentListTableRow } from '../../molecules/DocumentListTableRow';
import { getDocIdArray } from '../../../redux/slicers/Order';
import { getListDocIdArray } from '../../../redux/selectors/order';
import Loading from '../../molecules/Loading';

export default function DocumentLists() {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const documents = useSelector(getListDocument, shallowEqual);
  const docIdArray = useSelector(getListDocIdArray, shallowEqual);
  const docArray = docIdArray.map(d => {
    return d.document_id;
  });
  const [reload, setReload] = useState(false);

  const [loading, setLoading] = useState(true);

  // 必要な情報を取得
  useEffect(() => {
    const func = async () => {
      await dispatch(getDocuments());
      await dispatch(getDocIdArray());
      await setLoading(false);
    };
    func();
  }, []);

  // ページリロード
  useEffect(() => {
    const func = async () => {
      await dispatch(getDocuments());
      await dispatch(getDocIdArray());
      await setReload(false);
    };
    func();
  }, [reload]);

  //リロード
  const handleReload = () => {
    setReload(true);
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky tabel">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.tableItem}>No</TableCell>
              <TableCell className={classes.tableItem}>日付</TableCell>
              <TableCell className={classes.tableItem}>件名</TableCell>
              <TableCell className={classes.tableItem}>取引先名</TableCell>
              <TableCell className={classes.tableItem}>担当者</TableCell>
              <TableCell>受注</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map(document => (
              <DocumentListTableRow
                document={document}
                handleReload={setReload}
                docArray={docArray}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
