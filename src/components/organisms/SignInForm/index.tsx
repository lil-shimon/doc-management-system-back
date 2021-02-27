import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { LoginButton } from '../../atoms/Buttons';
import LoginAppBar from '../../organisms/LoginAppBar';
import useStyles from './styles';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slicers/login';

export type FormData = {
  username: string;
  password: string;
};

export type LoginFormProps = {
  onSubmit: (formData: FormData) => void;
};

export default function SignIn() {
  const { register } = useForm<FormData>();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasEmailError, setHasEmailError] = useState(false);

  const AuthEmail = process.env.EMAIL;
  const AuthPassword = process.env.PASSWORD;
  const emailErrorText =
    'メールアドレス、パスワードが正しくありません。入力し直してください。';

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(AuthEmail);
    console.log(AuthPassword);

    if (AuthEmail === email) {
      if (password === `${AuthPassword}`) {
        dispatch(login(email, password));
        setHasEmailError(false);
      } else {
        setHasEmailError(true);
      }
    } else {
      setHasEmailError(true);
    }
  };

  return (
    <div>
      <LoginAppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            {hasEmailError && <Alert severity="error">{emailErrorText}</Alert>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
              inputRef={register({ required: true })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              inputRef={register({ required: true })}
            />
            <Grid container>
              <div className={classes.btn}>
                <LoginButton className={classes.btn} type="submit" />
              </div>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
