import React, { FC } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from './style';
import { addSeparator } from '../../organisms/preview/preview';

export const MaintenanceStats: FC<{ title: string; cost: any }> = ({
  title,
  cost,
}) => {
  const classes = useStyles();

  const totalCost = (cost: any) => {
    return cost * 3000;
  };
  return (
    <Paper className={classes.box}>
      <Typography>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Box
              letterSpacing={3}
              textAlign="center"
              fontSize={15}
              className={classes.title}
            >
              {title}
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Box fontWeight="fontWeightLight" fontSize={8}>
              メンテナンスコスト
            </Box>
            <a className={classes.flex}>
              <Box className={classes.price}>
                {addSeparator(totalCost(cost))}
              </Box>
              <Box
                fontWeight="fontWeightLight"
                fontSize={10}
                className={classes.textSmall}
              >
                円
              </Box>
            </a>

            <Box fontWeight="fontWeightLight" fontSize={8}>
              メンテナンスタイム
            </Box>
            <a className={classes.flex}>
              <Box className={classes.price}>{addSeparator(cost)}</Box>
              <Box
                fontWeight="fontWeightLight"
                fontSize={10}
                className={classes.textSmall}
              >
                時間
              </Box>
            </a>
          </Grid>
        </Grid>
      </Typography>
    </Paper>
  );
};
