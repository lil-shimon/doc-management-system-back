import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../api';
import { AppDispatch, AppThunk } from '../store';

export type CompanyLogo = {
  id: number;
  name: string | number;
  img_path: string;
};

export interface CompanyLogoState {
  indexes: Record<number, CompanyLogo>;
}

export const companyLogoInitialState: CompanyLogoState = {
  indexes: {},
};

const companyLogoSlice = createSlice({
  name: 'companyLogoState',
  initialState: companyLogoInitialState,
  reducers: {
    setCompanyLogos: (
      state: CompanyLogoState,
      { payload }: PayloadAction<CompanyLogo[]>
    ) => {
      state.indexes = {};
      payload.forEach(item => {
        state.indexes[item.id] = item;
      });
    },
  },
});

export const { setCompanyLogos } = companyLogoSlice.actions;

export default companyLogoSlice.reducer;

export const getCompanyLogos = (): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/company-logo').fetch();
    dispatch(setCompanyLogos(data));
  } catch (err) {
    console.error(err);
  }
};

export const newCompanyLogos = (
  title: string | number,
  file: any
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    let data = new FormData();
    data.append('file', file);
    //@ts-ignore
    data.append('title', title);
    const res = await API.post('/company-logo')
      .setBody(data)
      .fetch();
    dispatch(setCompanyLogos(res.data));
  } catch (err) {
    console.log('err', err);
  }
};

export const selectCompanyLogos = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/company-logo').fetch();
    let editId = id;
    const editItem = data.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setCompanyLogos(editItem));
  } catch (err) {
    console.log(err);
  }
};

export const editCompanyLogos = (
  title: string | number,
  file: any
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    // await axios.delete('http://18.180.197.69/api/company-logo/' + `${id}`);
    let data = new FormData();
    data.append('file', file);
    //@ts-ignore
    data.append('title', title);
    const res = await API.post('/company-logo')
      .setBody(data)
      .fetch();
    dispatch(setCompanyLogos(res.data));
  } catch (err) {
    console.log(err);
  }
};
