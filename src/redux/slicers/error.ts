import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ErrorState = {
  error: string[];
};

export const initialErrorState: ErrorState = {
  error: [],
};

const errorSlice = createSlice({
  name: 'error',
  initialState: initialErrorState,
  reducers: {
    setError(state, action: PayloadAction<ErrorState['error']>) {
      state.error = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
