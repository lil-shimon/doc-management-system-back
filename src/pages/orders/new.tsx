import React from 'react';
import useStyles from '../../components/organisms/OrderNew/style';
import { CssBaseline } from '@material-ui/core';
import OrderNew from '../../components/organisms/OrderNew';

export default function OrderNewPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <OrderNew />
      </div>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
