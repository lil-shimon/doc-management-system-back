import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api';
import { AppDispatch, AppThunk } from '../store';

export type Attachment = {
  id: number;
  order_id: number;
  file_path: string;
};

export interface AttachmentState {
  indexes: Record<number, Attachment>;
}

export const attachmentInitialState: AttachmentState = {
  indexes: {},
};

const attachmentSlice = createSlice({
  name: 'attachmentState',
  initialState: attachmentInitialState,
  reducers: {
    setAttachments: (
      state: AttachmentState,
      { payload }: PayloadAction<Attachment[]>
    ) => {
      console.log('payload attachment', payload);
      state.indexes = payload;
    },
  },
});

export const { setAttachments } = attachmentSlice.actions;

export default attachmentSlice.reducer;

//get attachment for each order
export const getAttachments = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/getattachment/${id}`).fetch();
    dispatch(setAttachments(data));
  } catch (err) {
    console.log(err);
  }
};

//　複数のファイルアップロード関数
export const storeAttachment = (file_path: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const params = new FormData();
    params.append('file_path', file_path);
    const res = await API.post('/attachment')
      .setBody(params)
      .fetch();
    dispatch(setAttachments(res.data));
  } catch (err) {
    console.log(err);
  }
};
