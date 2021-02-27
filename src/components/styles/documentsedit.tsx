import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles(theme => ({
  btn: {
    marginTop: '25px',
  },
  table: {
    marginTop: '25px',
  },
  tableItem: {
    maxWidth: 70,
    fontSize: '12px',
  },
  tableRow: {
    minWidth: 100,
    fontSize: '12px'
  },
  tableQuantity: {
    minWidth: 70,
  },
  memuItem: {
    fontSize: '10px',
  },
  money: {
    height: '100px',
    marginBottom: '30px',
  },
  selectItem: {
    minWidth: 200,
  },
  field: {
    marginBottom: '50px',
  },
  root: {
    display: 'flex',
  },
  right: {
    position: 'absolute',
    right: '5%',
    top: '30%',
    transform: 'translateY(-50%)',
  },
  num: {
    position: 'absolute',
    top: '3%',
    right: '5%',
  },
  container: {
    borderRadius: '1px',
    borderColor: 'black',
    border: 'solid',
    position: 'relative',
  },
  top: {
    margin: '1px',
  },
  button: {
    margin: '30px',
  },
  second: {
    marginTop: '25px',
  },
  price: {
    lineHeight: '50px',
    letterSpacing: 'normal',
    fontSize: '18px',
  },
  currency: {
    textAlign: 'center',
    border: 'solid',
    borderColor: 'black',
    backgroundColor: '#d1d1d1',
    fontWeight: 'bold',
    float: 'left',
    width: '50%',
    borderRight: 'none',
    marginBottom: '50px',
  },
  zero: {
    border: 'solid',
    borderLeft: 'none',
    borderColor: 'black',
    textAlign: 'right',
    float: 'right',
    width: '50%',
  },
  option: {
    width: '100%',
    marginBottom: '140px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  contents: {
    marginTop: '100px',
  },
  honorific: {
    marginTop: '16px',
  },
  createbtn: {
    marginBottom: '25px',
  },
  questar: {
    minWidth: 200,
    margin: theme.spacing(1),
    marginLeft: '770px',
    marginTop: '110px',
    textAlign: 'right',
  },
  img: {
    position: 'absolute',
    right: '10px',
    top: '175px',
  },
  productName: {
    minWidth: 200,
  },
  productItem: {
    minWidth: 70,
  },
}));

export default useStyles;
