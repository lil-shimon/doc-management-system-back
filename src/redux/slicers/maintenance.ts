import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppThunk } from '../store';
import { API } from '../../api';
import { setFlashError, setFlashSuccess } from './flash';

export type Maintenance = {
  id: number;
  date: Date;
  title: string;
  address: string;
  note: string;
  working_hours: string;
};

export type Monthly = {
  working_hours: number;
};
export interface MaintenanceState {
  indexes: Record<number, Maintenance>;
  thisMonth: Record<number, Monthly>;
  lastMonth: Record<number, Monthly>;
  twoMonthAgo: Record<number, Monthly>;
}

export const maintenanceInitialState: MaintenanceState = {
  indexes: {},
  thisMonth: {},
  lastMonth: {},
  twoMonthAgo: {},
};

const maintenanceSlice = createSlice({
  name: 'maintenanceState',
  initialState: maintenanceInitialState,
  reducers: {
    setMaintenances: (
      state: MaintenanceState,
      { payload }: PayloadAction<Maintenance[]>
    ) => {
      state.indexes = payload;
    },
    setThisMonth: (
      state: MaintenanceState,
      { payload }: PayloadAction<Monthly[]>
    ) => {
      state.thisMonth = payload;
    },
    setLastMonth: (
      state: MaintenanceState,
      { payload }: PayloadAction<Monthly[]>
    ) => {
      state.lastMonth = payload;
    },
    setTwoMonthAgo: (
      state: MaintenanceState,
      { payload }: PayloadAction<Monthly[]>
    ) => {
      state.twoMonthAgo = payload;
    },
  },
});

export const {
  setMaintenances,
  setThisMonth,
  setLastMonth,
  setTwoMonthAgo,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;

export const getMaintenance = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get(`/maintenance`).fetch();
    dispatch(setMaintenances(data));
  } catch (err) {
    console.log(err);
  }
};

export const editMaintenance = (
  id: number,
  date: Date,
  title: string,
  address: string,
  note: string,
  working_hours: string,
  count: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const maintenance = { date, title, address, note, working_hours, count };
    const res = await API.put(`/maintenance/${id}`)
      .setBody(maintenance)
      .fetch();
    await dispatch(setFlashSuccess('メンテナンスの保存に成功しました'));
  } catch (err) {
    await dispatch(setFlashError('メンテナンスの保存に失敗しました'));
  }
};

//今月のメンテデータを取得
export const getThisMonth = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/getthismonth').fetch();
    dispatch(setThisMonth(data));
  } catch (err) {
    console.log(err);
  }
};

// 先月のメンテデータを取得
export const getLastMonth = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/getlastmonth').fetch();
    dispatch(setLastMonth(data));
  } catch (err) {
    console.log(err);
  }
};

//先々月のメンテデータを取得
export const getTwoMonthAgo = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/gettwomonthago').fetch();
    dispatch(setTwoMonthAgo(data));
  } catch (err) {
    console.log(err);
  }
};
