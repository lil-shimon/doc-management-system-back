import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SelectPostageTab from '../../components/molecules/SelectPostageTab';
import PostageIndex from '../../components/organisms/PostagePage';
import { getPostages } from '../../redux/slicers/postage';

export default function PostagePage() {
  const dispatch = useDispatch();

  return (
    <div>
      <CssBaseline />
      <main>
        <h2>送料一覧</h2>
        <Typography paragraph>
          <PostageIndex />
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
