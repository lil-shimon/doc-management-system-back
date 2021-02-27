import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    container: {
      maxHeight: 440,
      minWidth: '650px',
    },
    link: {
      textDecoration: 'none',
      color: 'black',
      margin: theme.spacing(1),
      padding: '2px',
    },
    button: {},
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    btn: {
      textAlign: 'right',
      marginTop: '25px',
    },
    formControl: {},
    unitprice: {},
    form: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      marginTop: '15px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {},
    iconSort: {
      paddingTop: '5px',
    },
    productItem: {},
    notes: {
      minWidth: 150,
    },
    notesItem: {
      fontSize: '10px',
    },
  })
);

export default UseStyles;
