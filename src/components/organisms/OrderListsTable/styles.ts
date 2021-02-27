import { makeStyles, createStyles, Theme } from '@material-ui/core';

const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { width: '100%' },
    container: { maxHeight: 1500, minWidth: '650px' },
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
      minWidth: 125,
    },
    tableName: {
      minWidth: 300,
    },
    tableDate: {
      minWidth: 150,
    },
    tableFile: {
      minWidth: 50,
    },
    tableId: {
      maxWidth: 150,
    },
    sticky: {
      position: 'sticky',
    },
  })
);

export default UseStyles;
