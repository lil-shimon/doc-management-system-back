import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    width: '75%'
  },
  page: {
    padding: '0 20px',
  },
  unitprice: {
    marginTop: '25px',
    marginBottom: '25px',
  },
  btn: {
    textAlign: 'right',
    marginTop: '25px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  totalPrice: {
    marginTop: '20px',
    minWidth: 100,
    maxWidth: 250,
    minHeight: 80,
    maxHeight: 150,
  },
  yen: {
    textAlign: 'right',
  },
  tableNote: {
    minWidth: 150,
  },
  tableItem: {
    minWidth: 80,
  },
  fileUp: {
    maxWidth: 100,
  },
  files: {
    paddingTop: '20px',
  },
  inputFileBtnHide: {
    opacity: 0,
    appearance: 'none',
    position: 'absolute',
  },
  divider: {
    margin: theme.spacing(2),
  },
  fontEight: {
    fontSize: '8px',
  },
  width: {
    width: '85%'
  }
})
);

export default useStyles;
