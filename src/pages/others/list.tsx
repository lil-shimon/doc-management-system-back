import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import OthersPage from '../../components/organisms/ProductTableIndex/OthersPage';

export default function ProductIndexPage() {
  return (
    <div>
      <CssBaseline />
      <main>
        <h2>その他商品一覧</h2>
        <Typography paragraph>
          <OthersPage />
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
