import React, { FC } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from './style';
import { addSeparator } from '../../organisms/preview/preview';

export const ThisMonthStats: FC<{ title: string; cost: number }> = ({
  title,
  cost,
}) => {
  const classes = useStyles();
  const totalCost = (cost: any) => {
    return cost * 3000;
  };
  return (
    <Paper className={classes.thisMonth} elevation={3}>
      <Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box
              letterSpacing={6}
              textAlign="center"
              className={classes.japanese}
            >
              {title}
            </Box>
          </Grid>
          <Grid item xs={9}>
            {/*<a className={classes.float}>*/}
            <Box fontWeight="fontWeightLight" fontSize={10}>
              メンテナンスコスト
            </Box>
            <a className={classes.flex}>
              <Box className={classes.blueBox}>
                {addSeparator(totalCost(cost))}
              </Box>
              <Box
                fontWeight="fontWeightLight"
                fontSize={10}
                className={classes.text}
              >
                円
              </Box>
            </a>
            <Box fontWeight="fontWeightLight" fontSize={10}>
              メンテナンスタイム
            </Box>
            <a className={classes.flex}>
              <Box className={classes.blueBox}>{addSeparator(cost)}</Box>
              <Box
                fontWeight="fontWeightLight"
                fontSize={10}
                className={classes.text}
              >
                時間
              </Box>
            </a>
            {/*</a>*/}
          </Grid>
        </Grid>
      </Typography>
    </Paper>
  );
};
