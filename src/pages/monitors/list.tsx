import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import MonitorPage from '../../components/organisms/ProductTableIndex/MonitorPage';

export default function ProductIndexPage() {
  return (
    <div>
      <CssBaseline />
      <main>
        <h2>モニター一覧</h2>
        <Typography paragraph>
          <MonitorPage />
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
