import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

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
  })
);

export default UseStyles;
