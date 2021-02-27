import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import App from 'next/app';
import { API, API_URL } from '../../api';
import { AppDispatch, AppThunk } from '../store';

export type Progress = {
  id: number;
  document_id: number;
  order_id: number;
};

export interface ProgressState {
  indexes: Record<number, Progress>;
}

export const progressInitialState: ProgressState = {
  indexes: {},
};

const progressSlice = createSlice({
  name: 'progressState',
  initialState: progressInitialState,
  reducers: {
    setProgresses: (
      state: ProgressState,
      { payload }: PayloadAction<Progress[]>
    ) => {
      state.indexes = payload;
    },
  },
});

export const { setProgresses } = progressSlice.actions;

export default progressSlice.reducer;

export const setDocumentProgress = (progres: any): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const [progress] = progres;
    const res = await API.post('/setdocument')
      .setBody({ progress })
      .fetch();
    dispatch(setProgresses(res.data));
  } catch (err) {
    console.log(err);
  }
};
