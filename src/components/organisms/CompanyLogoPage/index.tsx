import React, { useEffect } from 'react';
import { Button, Paper, Table, TableHead, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { getListCompanyLogo } from '../../../redux/selectors/companyLogo';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  getCompanyLogos,
  selectCompanyLogos,
} from '../../../redux/slicers/companyLogo';
import UseStyles from './styles';
import { useRouter } from 'next/router';

export const imgUrl = (url: string | null) => {
  return '/' + url;
};

export default function CompanyLogoIndex() {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const companyLogos = useSelector(getListCompanyLogo, shallowEqual);
  const router = useRouter();

  useEffect(() => {
    dispatch(getCompanyLogos());
  }, []);

  return (
    <div className={classes.root}>
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky tabel">
            <TableHead>
              <TableRow>
                <TableCell>名前</TableCell>
                <TableCell>画像</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyLogos.map(companyLogo => (
                <TableRow key={companyLogo.id}>
                  <TableCell>{companyLogo.name}</TableCell>
                  <TableCell>
                    <img src={imgUrl(companyLogo.img_path)} width="100px" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
