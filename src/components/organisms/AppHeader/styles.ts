import { makeStyles, Theme, createStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    typography: {
      padding: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    green: {
      background: '#06B10D',
    },
    blue: {
      background: '#0300AE',
    },
    orange: {
      background: '#F2994A',
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    item: {},
    flex_align_center: {
      display: 'flex',
      alignItems: 'center',
    },
    userIconMenu: {
      color: 'white',
    },
    loginLink: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export default useStyles;
