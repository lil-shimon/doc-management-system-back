import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, saveLoginToken } from '../../api';
import { getLoginData, saveLoginData } from '../../utils/auth';
import { AppDispatch, AppThunk } from '../store';
import { User } from './user';
import { setFlashError } from './flash';

export interface LoginState {
  data: User | null;
  checked: boolean;
}

export const loginInitialState: LoginState = {
  data: null,
  checked: false,
};

const loginSlice = createSlice({
  name: 'loginState',
  initialState: loginInitialState,
  reducers: {
    setLoginData: (
      state: LoginState,
      { payload }: PayloadAction<User | null>
    ) => {
      state.data = payload;
      saveLoginData(payload);
    },
    setCheckedLogin: (state: LoginState) => {
      state.checked = true;
    },
  },
});

export const { setLoginData, setCheckedLogin } = loginSlice.actions;

export default loginSlice.reducer;

export const login = (email: string, password: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const res = await API.post('/auth/login')
      .setBody({
        email,
        password,
      })
      .fetch();

    saveLoginToken(res.data.access_token);

    const { data: userData } = await API.post('/auth/me').fetch();
    dispatch(setLoginData(userData));
    dispatch(setCheckedLogin());
  } catch (err) {
    console.error(err);
    dispatch(setLoginData(null));
  }
};

export const getRefreshToken = (): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const Auth = localStorage.getItem('jwt-token');
    console.log('jwt-token', Auth);
    const res = await API.post('/auth/refresh')
      .setBody({ Auth })
      .fetch();

    saveLoginToken(res.data.access_token);

    const { data: userData } = await API.post('/auth/me').fetch();

    dispatch(setLoginData(userData));
    dispatch(setCheckedLogin());
  } catch (err) {
    dispatch(setLoginData(null));
    dispatch(setFlashError('ログイン情報の更新に失敗しました。'));
  }
};

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  await API.post('/auth/logout');
  saveLoginToken('');
  dispatch(setLoginData(null));
};

export const getUserLogin = (): AppThunk => async (dispatch: AppDispatch) => {
  // <preload cache user login>
  const initialData = getLoginData();
  if (initialData) {
    dispatch(setLoginData(initialData)); // NEED to preload if user already login before
  }
  // </preload cache user login>
  try {
    const { data: userData } = await API.post('/auth/me').fetch();
    dispatch(setLoginData(userData));
    dispatch(setCheckedLogin());
  } catch (err) {
    console.error(err);
    dispatch(setLoginData(null));
    dispatch(setCheckedLogin());
  }
};
