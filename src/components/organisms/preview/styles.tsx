import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
  },
  date: {
    fontSize: '12px',
  },
  mitsumori: {
    fontWeight: 'bold',
    fontSize: '22px',
    marginLeft: '42%',
  },
  no: {
    fontSize: '12px',
    marginLeft: '40%',
  },
  honorific: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  greet: {
    fontSize: '10px',
    width: 500,
    marginLeft: '15px',
  },
  content: {
    fontSize: '1px',
  },
  companyName: {
    width: 500,
    fontSize: '14px',
    marginLeft: '3px',
  },
  tableName: {
    maxWidth: 135,
    fontSize: '10px',
    textAlign: 'center',
  },
  tableHead: {
    minWidth: 80,
    fontSize: '10px',
    textAlign: 'right',
  },
  upperTable: {
    maxWidth: '95%',
    fontSize: '1px',
  },
  tableArea: {
    marginTop: '5px',
    maxWidth: 600,
  },
  tableItem: {
    fontSize: '8px',
    textAlign: 'right',
    margin: '3px 0 0 0',
  },
  tableItemMargin: {
    margin: '3px 0 0 10px',
    fontSize: '8px',
    textAlign: 'right',
  },
  dividerMargin: {
    margin: '3px 0 0 15px',
  },
  tableItemPrice: {
    fontSize: '8px',
    textAlign: 'center',
  },
  table: {
    fontSize: '8px',
    textAlign: 'left',
    alignItems: 'right',
  },
  contentTitle: {
    fontSize: '6px',
    textAlign: 'left',
  },
  contentKenmei: {
    fontSize: '6px',
    textAlign: 'left',
    letterSpacing: '1.9em',
  },
  tableProductName: {
    textAlign: 'left',
    fontSize: '8px',
  },
  thTop: {
    backgroundColor: '#1976d2',
    borderTop: 'solid',
    fontSize: '15px',
  },
  tb: {
    textAlign: 'center',
    border: 'solid',
    fontSize: '14px',
  },
  flexright: {
    marginLeft: '80%',
    display: 'flex',
    borderBottom: 'solid',
    fontSize: '13px',
    width: 110,
    height: 35,
  },
  bottom: {
    right: '50px',
  },
  remarks: {
    maxWidth: 550,
    height: 80,
    fontSize: '8px',
    wordWrap: 'break-word',
    marginLeft: '3%',
    whiteSpace: 'pre-wrap',
  },
  bikou: {
    fontSize: '12px',
    paddingLeft: '3%',
  },
  center: {
    borderBottom: 'solid',
    width: '55%',
    fontSize: '12px',
  },
  top: {
    display: 'flex',
    borderBottom: 'double',
    width: '65%',
  },
  first: {
    display: 'flex',
    paddingTop: '3%',
  },
  page: {
    alignItems: 'center',
  },
  inpage: {
    width: '172mm',
    paddingLeft: '10px',
    paddingBottom: '100px',
  },
  price: {
    lineHeight: '30px',
    letterSpacing: 'normal',
    fontSize: '14px',
    width: '35%',
  },
  currency: {
    textAlign: 'center',
    border: 'solid',
    borderColor: 'black',
    backgroundColor: '#d1d1d1',
    fontWeight: 'bold',
    float: 'left',
    width: '63%',
  },
  zero: {
    border: 'solid',
    borderLeft: 'none',
    borderColor: 'black',
    textAlign: 'right',
    float: 'right',
    width: '37%',
    paddingRight: '15px',
  },
  create: {
    marginBottom: '10px',
    marginRight: '10px',
  },
  username: {
    fontSize: '10px',
  },
  topBorder: {
    border: 'solid 2px',
    borderColor: 'black',
    width: '100%',
  },
  noAndDate: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '60%',
  },
  dateAndNo: {
    marginLeft: '23%',
  },
  questarlogo: {
    flexDirection: 'column',
    textAlign: 'right',
  },
  partner: {
    paddingLeft: '5%',
  },
}));

export default useStyles;
