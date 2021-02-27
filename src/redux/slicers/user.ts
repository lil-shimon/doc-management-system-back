import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import App from 'next/app';
import { API, API_URL } from '../../api';
import { AppDispatch, AppThunk } from '../store';
import axios from 'axios';

export type User = {
  name: string | null;
  email: any;
  id: number;
  password: any;
};

export interface UserState {
  indexes: Record<number, User>;
}

export const userInitialState: UserState = {
  indexes: {},
};

const userSlice = createSlice({
  name: 'userState',
  initialState: userInitialState,
  reducers: {
    setUsers: (state: UserState, { payload }: PayloadAction<User[]>) => {
      state.indexes = {};
      payload.forEach(item => {
        state.indexes[item.id] = item;
      });
    },
    deleteUserById(state, { payload }: PayloadAction<number[]>) {
      payload.forEach(id => {
        delete state.indexes[id];
      });
    },
  },
});

export const { setUsers, deleteUserById } = userSlice.actions;

export default userSlice.reducer;

export const getUsers = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/user').fetch();
    dispatch(setUsers(data));
  } catch (err) {
    console.error(err);
  }
};

export const newUsers = (
  name: string,
  email: any,
  id: number,
  password: any
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const res = await API.post('/user')
      .setBody({
        id,
        email,
        password,
        name,
      })
      .fetch();
    dispatch(setUsers(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const selectUsers = (pid: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/user').fetch();
    dispatch(setUsers(data));
    let editId = pid;
    const editItem = data.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setUsers(editItem));
  } catch (err) {
    console.log(err);
  }
};

export const editUser = (
  name: string | null,
  email: any,
  id: number,
  password: any
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}` + '/user/' + `${id}`);
    const res = await API.post('/user')
      .setBody({ name, email, id, password })
      .fetch();
    dispatch(setUsers(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const userDelete = (
  dispatch: AppDispatch,
  userIdList: number[],
  id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}` + '/user/' + `${id}`);
    dispatch(deleteUserById(userIdList));
    dispatch(setUsers);
  } catch (err) {
    console.log(err);
  }
};
export const getUsersById = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/user/' + `${id}`).fetch();
    dispatch(setUsers(data));
  } catch (err) {
    console.log(err);
  }
};
