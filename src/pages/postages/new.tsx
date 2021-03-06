import React, { useEffect, useState } from 'react';
import { CreateButton } from '../../components/atoms/Buttons';
import CancelButton from '../../components/atoms/Accordion/index';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { newPostages } from '../../redux/slicers/postage';
import { RootState } from '../../redux/rootReducers';

const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    container: {
      display: 'flex',
    },
    body: {
      width: `calc(100% - 240px)`,
      marginLeft: '240px',
      marginTop: '75px',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    btn: {
      textAlign: 'right',
    },
    link: {
      textDecoration: 'none',
      color: 'black',
    },
  })
);

export default function PostageNewPage() {
  const classes = UseStyles();
  const [sender_place, setSenderPlace] = useState('');
  const [destination_place, setDestinationPlace] = useState('');
  const [postage_price, setPostatePrice] = useState(0);
  const [size, setSize] = useState('');
  const [id] = useState(0);
  const [tax] = useState('10%');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(
      newPostages(id, sender_place, destination_place, postage_price, size, tax)
    );
    router.push('/postages/list');
  };

  return (
    <div>
      <div className={classes.container}>
        <CssBaseline />
        <div>
          <div>
            <h2>送料登録</h2>
            <Typography>
              <p>送付元</p>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  variant="outlined"
                  label="送付元"
                  onChange={e => setSenderPlace(e.target.value)}
                />
                <p>送付先</p>
                <TextField
                  fullWidth
                  required
                  name="name"
                  variant="outlined"
                  label="送付先"
                  onChange={e => setDestinationPlace(e.target.value)}
                />
                <p>サイズ</p>
                <TextField
                  required
                  name="name"
                  fullWidth
                  label="サイズ"
                  variant="outlined"
                  onChange={e => setSize(e.target.value)}
                />
                <p>送料</p>
                <TextField
                  required
                  name="name"
                  variant="outlined"
                  label="送料"
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                    setPostatePrice((e.target.value as unknown) as number)
                  }
                />
                <div className={classes.btn}>
                  <Link href="/postages/list">
                    <a className={classes.link}>
                      <CancelButton />
                    </a>
                  </Link>
                  <CreateButton type="submit" />
                </div>
              </form>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
