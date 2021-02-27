import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Color } from '@material-ui/lab/Alert';
import { AppThunk } from '../store';

export type FlashState = {
  type: Color;
  message: string | null;
};

export const initialFlashState: FlashState = {
  message: null,
  type: 'info',
};

const flashSlice = createSlice({
  name: 'flash',
  initialState: initialFlashState,
  reducers: {
    setFlash(state, { payload }: PayloadAction<FlashState>) {
      state.message = null;
      state.type = payload.type;
      state.message = payload.message;
    },
    initFlash(state) {
      state.message = '';
      state.type = 'info';
    },
  },
});

export const { initFlash, setFlash } = flashSlice.actions;

export default flashSlice.reducer;

export const setFlashSuccess = (
  message: string
): AppThunk => async dispatch => {
  dispatch(initFlash());
  dispatch(
    flashSlice.actions.setFlash({
      type: 'success',
      message,
    })
  );
};

export const setFlashError = (message: string): AppThunk => async dispatch => {
  dispatch(initFlash());

  dispatch(
    flashSlice.actions.setFlash({
      type: 'error',
      message,
    })
  );
};
