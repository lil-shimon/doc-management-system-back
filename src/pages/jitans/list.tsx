import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import JitanPage from '../../components/organisms/ProductTableIndex/JitanPage';

export default function ProductIndexPage() {
  return (
    <div>
      <CssBaseline />
      <main>
        <h2>JITAN一覧</h2>
        <Typography paragraph>
          <JitanPage />
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
