import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  TableContainer: {
    marginTop: '2%',
  },
  titleMargin: {
    marginRight: '200px',
    width: '200px',
  },
  statsMargin: {
    marginRight: '2%',
  },
  tableDate: {
    width: '10%',
  },
  createButton: {
    marginTop: '40px',
  },
  tableCell: {
    width: '25%',
  },
  table: {
    minWidth: 100,
  },
  workingHours: {
    maxWidth: '20%',
  },
  box: {
    display: 'flex',
  },
}));

export default useStyles;
