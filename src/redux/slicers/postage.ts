import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, API_URL } from '../../api';
import { AppThunk, AppDispatch } from '../store';
import axios from 'axios';
import { RootState } from '../rootReducers';

export type Postage = {
  id: number;
  sender_place: string;
  destination_place: string;
  postage_price: number;
  size: any;
  tax: string;
};

export interface PostageState {
  indexes: Record<number, Postage>;
  lastPage: number;
}

export const postageInitialState: PostageState = {
  indexes: {},
  lastPage: 1,
};

const postageSlice = createSlice({
  name: 'postageState',
  initialState: postageInitialState,
  reducers: {
    setPostages: (
      state: PostageState,
      { payload }: PayloadAction<Postage[]>
    ) => {
      state.indexes = {};
      payload.forEach(item => {
        state.indexes[item.id] = item;
      });
    },
    setUpPostages: (
      state: PostageState,
      { payload }: PayloadAction<Postage[]>
    ) => {
      state.indexes = payload;
    },
    setLastPage: (state: PostageState, { payload }: PayloadAction<number>) => {
      //@ts-ignore
      state.lastPage = payload['last_page'];
    },
    setPostageIndexes: (
      state: PostageState,
      { payload }: PayloadAction<Postage[]>
    ) => {
      //@ts-ignore
      state.indexes = payload['data'];
    },
    deletePostageById(state, { payload }: PayloadAction<number[]>) {
      payload.forEach(id => {
        delete state.indexes[id];
      });
    },
  },
});

export const {
  setPostages,
  deletePostageById,
  setUpPostages,
  setLastPage,
  setPostageIndexes,
} = postageSlice.actions;

export default postageSlice.reducer;

// read postages
export const getPostages = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/postage').fetch();
    dispatch(setPostages(data));
  } catch (err) {
    console.error(err);
  }
};

// ページネーションの送料データ
export const getPostageIndexes = (currentPage: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/postageindex/?page=${currentPage}`
    ).fetch();
    dispatch(setPostageIndexes(data));
    dispatch(setLastPage(data));
  } catch (err) {
    console.log(err);
  }
};

// get data by search word
export const searchPostages = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/postageindex/?destination_place=${word}`
    ).fetch();
    dispatch(setPostageIndexes(data));
  } catch (err) {
    console.log(err);
  }
};

export const newPostages = (
  id: number,
  sender_place: string,
  destination_place: string,
  postage_price: number,
  size: any,
  tax: string
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const editItem = {
      id,
      sender_place,
      destination_place,
      postage_price,
      size,
      tax,
    };
    const res = await API.post('/postage')
      .setBody({ editItem })
      .fetch();
    dispatch(setPostages(res.data));
  } catch (err) {
    console.log(err);
  }
};

//copy postage
export const copyPostages = (
  id: number,
  sender_place: string,
  destination_place: string,
  postage_price: number,
  size: any,
  tax: string
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/postage').fetch();
    dispatch(setPostages(data));
    let editId = id;
    const editItemById = data.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setPostages(editItemById));
    const editItem = {
      id,
      sender_place,
      destination_place,
      postage_price,
      size,
      tax,
    };
    const res = await API.post('/postage')
      .setBody({ editItem })
      .fetch();
    dispatch(setPostages(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const selectPostages = (pid: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/postage').fetch();
    dispatch(setPostages(data));
    let editId = pid;
    const editItem = data.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setPostages(editItem));
  } catch (err) {
    console.log(err);
  }
};

export const upPostages = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/postage').fetch();
    const upSortItems = data.sort(function(
      a: { postage_price: number },
      b: { postage_price: number }
    ) {
      if (a.postage_price > b.postage_price) return -1;
      if (a.postage_price < b.postage_price) return 1;
      return 0;
    });
    dispatch(setUpPostages(upSortItems));
  } catch (err) {
    console.log(err);
  }
};

export const downPostages = (data: any) => (dispatch: AppDispatch) => {
  try {
    const downSortItems = data.sort(function(
      a: { postage_price: number },
      b: { postage_price: number }
    ) {
      if (a.postage_price < b.postage_price) return -1;
      if (a.postage_price > b.postage_price) return 1;
      return 0;
    });
    dispatch(setPostages(downSortItems));
  } catch (err) {
    console.log(err);
  }
};

export const editPostage = (
  id: number,
  sender_place: string,
  destination_place: string,
  postage_price: number,
  size: any,
  tax: string
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const editItem = {
      id,
      sender_place,
      destination_place,
      postage_price,
      size,
      tax,
    };
    await axios.delete(`${API_URL}` + '/postage/' + `${id}`);
    const res = await API.post('/postage')
      .setBody({ editItem })
      .fetch();
    dispatch(setPostages(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const postageDelete = (
  dispatch: AppDispatch,
  postageIdList: number[],
  id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}` + '/postage/' + `${id}`);
    dispatch(deletePostageById(postageIdList));
    dispatch(setPostages);
  } catch (err) {
    console.log(err);
  }
};
