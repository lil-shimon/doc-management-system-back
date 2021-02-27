import { Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const UseStyles = makeStyles({
  root: {
    maxWidth: 250,
    textAlign: 'center',
  },
  rate: {
    textAlign: 'center',
  },
});

export default function DisplayMaintenance() {
  const classes = UseStyles();

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5">本日の監視状況</Typography>
          <Typography className={classes.rate} variant="h5">
            10/120
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
