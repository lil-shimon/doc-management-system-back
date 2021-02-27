import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content2: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },

    content: {
      flexGrow: 1,
      //   backgroundColor: 'white',
      height: '100vh',
      width: '100%',
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
      },
    },
    inner: {
      padding: theme.spacing(3),
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    flex_align_center: {
      display: 'flex',
      alignItems: 'center',
    },
    loginLink: {
      display: 'flex',
      alignItems: 'center',
    },
    userIconMenu: {
      color: 'white',
    },
  })
);

export default useStyles;
