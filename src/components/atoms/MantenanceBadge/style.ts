import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    box: {
      padding: '2%',
      height: '105px',
      marginTop: '10px',
      width: '200px',
    },
    titleMargin: {
      marginRight: '10px',
    },
    thisMonth: {
      width: '300px',
      height: '165px',
      padding: '20px 0 0 25px',
    },
    japanese: {
      writingMode: 'vertical-rl',
      background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)',
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      fontSize: '40px',
      color: 'white',
      padding: '18% 5px 20% 0',
      marginTop: '25%',
    },
    title: {
      writingMode: 'vertical-rl',
    },
    workingHours: {
      fontSize: '20px',
    },
    price: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)',
      fontSize: '20px',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      width: '90px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    blueBox: {
      background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)',
      fontSize: '30px',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
      height: 48,
      textAlign: 'center',
      fontWeight: 'bold',
      width: '150px',
    },
    percentageGreen: {
      textAlign: 'right',
      color: 'green',
    },
    percentageRed: {
      textAlign: 'right',
      color: 'red',
    },
    icon: {
      padding: '5% 0 0 0',
    },
    float: {
      float: 'left',
    },
    flex: {
      display: 'flex',
    },
    text: {
      paddingTop: '35px',
      paddingLeft: '2%',
    },
    textSmall: {
      paddingTop: '15px',
      paddingLeft: '2%',
    },
    comparisonBox: {
      padding: '2%',
      height: '50px',
      background: 'linear-gradient(45deg, #2196F3 30%, #21cbf3 90%)',
      fontSize: '20px',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      color: 'white',
    },
  })
);

export default useStyles;
