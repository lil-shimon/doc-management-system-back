import React, { useState } from 'react';
import { CreateButton } from '../../components/atoms/Buttons/index';
import CancelButton from '../../components/atoms/Accordion/index';
import Link from 'next/link';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { newUsers } from '../../redux/slicers/user';
import { useRouter } from 'next/router';

const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    container: {
      display: 'flex',
    },
    body: {
      width: `calc(100% - 240px)`,
      marginLeft: '240px',
      marginTop: '75px',
    },
    btn: {
      textAlign: 'right',
      marginTop: '25px',
    },
    link: {
      textDecoration: 'none',
      color: 'black',
    },
  })
);

export default function UserNewPage() {
  const classes = UseStyles();
  const [name, setName] = useState('');
  const [id] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(newUsers(name, email, id, password));
    router.push('/users/list');
  };

  return (
    <div className={classes.container}>
      <CssBaseline />
      <main>
        <div>
          <h2>新規登録</h2>
          <Typography>
            <form onSubmit={handleSubmit}>
              <p>名前</p>
              <TextField
                required
                fullWidth
                variant="outlined"
                label="名前"
                onChange={e => setName(e.target.value)}
              />
              <p>メールアドレス</p>
              <TextField
                fullWidth
                required
                name="name"
                variant="outlined"
                label="メールアドレス"
                onChange={e => setEmail(e.target.value)}
              />
              <p>パスワード</p>
              <TextField
                fullWidth
                required
                name="name"
                label="パスワード"
                variant="outlined"
                onChange={e => setPassword(e.target.value)}
              />
              <div className={classes.btn}>
                <Link href="/users/list">
                  <a className={classes.link}>
                    <CancelButton />
                  </a>
                </Link>
                <CreateButton type="submit" />
              </div>
            </form>
          </Typography>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
