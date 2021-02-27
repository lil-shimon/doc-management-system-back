import { makeStyles } from '@material-ui/core/styles';

const UseStyles = makeStyles(theme => ({
  drawerContainer: {
    overflow: 'auto',
  },
  btn: {
    marginTop: '25px',
    marginBottom: '25px',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchId: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default UseStyles;
