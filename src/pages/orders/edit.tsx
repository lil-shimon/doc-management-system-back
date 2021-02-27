import { CssBaseline } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import OrderEdit from '../../components/organisms/OrderEditPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
);

export default function OrderShow() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <OrderEdit />
      </div>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
