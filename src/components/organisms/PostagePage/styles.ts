import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { width: '100%' },
    container: { maxHeight: 440, minWidth: '650px' },
    link: {
      textDecoration: 'none',
      color: 'black',
      margin: theme.spacing(1),
      padding: '2px',
    },
    button: {
      margin: theme.spacing(1),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    btn: {
      textAlign: 'right',
      marginTop: '25px',
    },
    formControl: {
      margin: theme.spacing(1),
      nimWidth: 120,
    },
    unitprice: {
      marginTop: '25px',
      marginBottom: '25px',
    },
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
    iconButton: {
      padding: 10,
    },
    iconSort: {
      paddingTop: '5px',
    },
    arrow: {
      display: 'flex',
      flexDirection: 'column',
    },
    tableItem: {
      minWidth: 70,
      display: 'flex',
    },
    tableName: {
      marginTop: '10px',
    },
  })
);

export default UseStyles;
