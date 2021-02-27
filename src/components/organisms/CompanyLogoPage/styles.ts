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
    btn: {
      textDecoration: 'none',
    },
  })
);

export default UseStyles;
