import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getListUser } from '../../redux/selectors/user';
import { getUsers } from '../../redux/slicers/user';
import UserIndex from '../../components/organisms/UserIndex';
import SelectUserTab from '../../components/molecules/SelectUserTab';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  body: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: '240px',
  },
}));

export default function UserIndexPage({ name, email, id }: UserProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(getListUser, shallowEqual);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log('users', users);

  return (
    <React.Fragment>
      <Head>
        <title>ユーザー一覧</title>
      </Head>
      <div>
        <CssBaseline />
        <main>
          <h2>ユーザー一覧</h2>
          <Typography paragraph>
            <UserIndex />
          </Typography>
          <div />
        </main>
      </div>
    </React.Fragment>
  );
}

interface UserProps {
  name: string;
  email: any;
  id: number;
}

export async function getStaticProps() {
  return {
    props: {
      layout: true,
    },
  };
}
