import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import MeasuringPage from '../../components/organisms/ProductTableIndex/MeasuringPage';

export default function MeasuringInstrumentPage() {
  return (
    <div>
      <CssBaseline />
      <main>
        <h2>計測器一覧</h2>
        <Typography paragraph>
          <MeasuringPage />
        </Typography>
      </main>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
