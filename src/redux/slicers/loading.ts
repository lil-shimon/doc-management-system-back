import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LoadingState = {
  loading: boolean;
};

export const loadingInitialState: LoadingState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: loadingInitialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
