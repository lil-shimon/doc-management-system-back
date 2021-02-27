import { makeStyles, createStyles, Theme } from '@material-ui/core';

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
    btn: {
      textDecoration: 'none',
    },
    companyName: {
      maxWidth: 150,
    },
    tableItem: {
      minWidth: 150,
    },
  })
);

export default UseStyles;
