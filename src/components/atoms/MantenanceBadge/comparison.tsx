import React, { FC } from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { addSeparator } from '../../organisms/preview/preview';
import useStyles from './style';
import { TrendingDown, TrendingUp } from '@material-ui/icons';

export const Comparison: FC<{
  title: string;
  price: number;
  percentage: any;
}> = ({ title, price, percentage }) => {
  const classes = useStyles();
  //対比した文字の色を状況によって変化させる
  let comparisonText: JSX.Element;
  if (percentage > 0) {
    comparisonText = (
      <Box className={classes.percentageGreen}>
        + {addSeparator(percentage)}%
        <TrendingUp className={classes.icon} />
      </Box>
    );
  } else {
    comparisonText = (
      <Box className={classes.percentageRed}>
        {addSeparator(percentage)}%
        <TrendingDown className={classes.icon} />
      </Box>
    );
  }

  return (
    <Paper className={classes.comparisonBox}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box fontWeight="fontWeightLight" fontSize={10}>
            メンテナンスコスト
          </Box>
          <Box
            className={classes.workingHours}
            fontWeight="fontWeightBold"
            fontSize={20}
          >
            {addSeparator(price * 3000)}
          </Box>
        </Grid>
        <Grid item xs={6}>
          {comparisonText}
        </Grid>
      </Grid>
    </Paper>
  );
};
