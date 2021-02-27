import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, API_URL } from '../../api';
import { AppThunk, AppDispatch } from '../store';
import axios from 'axios';
import { setLastPage } from './Order';

export type Product = {
  id: number;
  name: string | number;
  unit: string;
  unit_price: number;
  tax: string;
  quantity: number;
  notes: string | null;
  product_types_id: number;
};

export interface ProductState {
  indexes: Record<number, Product>;
  monitors: Record<number, Product>;
  measuringInstruments: Record<number, Product>;
  jitans: Record<number, Product>;
  others: Record<number, Product>;
  selectedProducts: Record<number, Product>;
  lastPage: number;
}

export const productInitialState: ProductState = {
  indexes: {},
  monitors: {},
  measuringInstruments: {},
  jitans: {},
  others: {},
  lastPage: 1,
  selectedProducts: [
    {
      name: '',
      unit: '式',
      unit_price: 1,
      quantity: 1,
      id: 0,
      tax: '0.1',
      notes: null,
      product_types_id: 1,
    },
  ],
};

const productSlice = createSlice({
  name: 'productState',
  initialState: productInitialState,
  reducers: {
    setProducts: (
      state: ProductState,
      { payload }: PayloadAction<Product[]>
    ) => {
      state.indexes = {};
      payload.forEach(item => {
        state.indexes[item.id] = item;
      });
    },
    setProductLastPage: (
      state: ProductState,
      { payload }: PayloadAction<number>
    ) => {
      //@ts-ignore
      state.lastPage = payload['last_page'];
    },
    setMonitors: (
      state: ProductState,
      { payload }: PayloadAction<Product[]>
    ) => {
      //@ts-ignore
      state.monitors = payload['data'];
    },
    setMeasuringInstruments: (
      state: ProductState,
      { payload }: PayloadAction<Product[]>
    ) => {
      //@ts-ignore
      state.measuringInstruments = payload['data'];
    },
    setJitans: (state: ProductState, { payload }: PayloadAction<Product[]>) => {
      //@ts-ignore
      state.jitans = payload['data'];
    },
    setOthers: (state: ProductState, { payload }: PayloadAction<Product[]>) => {
      //@ts-ignore
      state.others = payload['data'];
    },
    setCurrentPage: (
      state: ProductState,
      { payload }: PayloadAction<Product[]>
    ) => {
      state.indexes = {};
      payload.forEach(item => {
        state.indexes[item.id] = item;
      });
    },
    deleteProductById(state, { payload }: PayloadAction<number[]>) {
      payload.forEach(id => {
        delete state.indexes[id];
      });
    },
    addProductTable: (
      state: ProductState,
      { payload }: PayloadAction<Product[]>
    ) => {
      //@ts-ignore
      state.selectedProducts.push(...payload);
    },
  },
});

export const {
  setProducts,
  setMonitors,
  setMeasuringInstruments,
  setJitans,
  setOthers,
  deleteProductById,
  setCurrentPage,
  addProductTable,
  setProductLastPage,
} = productSlice.actions;
export default productSlice.reducer;

// read products
export const getProducts = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/product').fetch();
    dispatch(setProducts(data));
  } catch (err) {
    console.error(err);
  }
};

// read monitors
export const getMonitors = (currentPage: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/1?page=${currentPage}`
    ).fetch();
    dispatch(setMonitors(data));
    dispatch(setProductLastPage(data));
  } catch (err) {
    console.log(err);
  }
};

// get data by search word
export const searchMonitors = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/1?name=${word}`
    ).fetch();
    dispatch(setMonitors(data));
  } catch (err) {
    console.log(err);
  }
};

// read monitors
export const getMeasuringInstruments = (
  currentPage: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/2?page=${currentPage}`
    ).fetch();
    dispatch(setMeasuringInstruments(data));
    dispatch(setProductLastPage(data));
  } catch (err) {
    console.log(err);
  }
};

// get data by search word
export const searchMeasuringInstruments = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/2?name=${word}`
    ).fetch();
    dispatch(setMeasuringInstruments(data));
  } catch (err) {
    console.log(err);
  }
};

export const getJitans = (currentPage: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/3?page=${currentPage}`
    ).fetch();
    dispatch(setJitans(data));
    dispatch(setProductLastPage(data));
  } catch (err) {
    console.log(err);
  }
};

// get data by search word
export const searchJitans = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/3?name=${word}`
    ).fetch();
    dispatch(setJitans(data));
  } catch (err) {
    console.log(err);
  }
};

export const getOthers = (currentPage: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/4?page=${currentPage}`
    ).fetch();
    dispatch(setOthers(data));
    dispatch(setProductLastPage(data));
  } catch (err) {
    console.log(err);
  }
};

// get data by search word
export const searchOthers = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(
      `/producttypesidindex/4?name=${word}`
    ).fetch();
    dispatch(setOthers(data));
  } catch (err) {
    console.log(err);
  }
};

// create new product
export const newProducts = (
  id: number,
  name: string,
  unit: string,
  unit_price: number,
  tax: string,
  notes: null | string,
  product_types_id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const editItem = {
      id,
      name,
      unit,
      unit_price,
      tax,
      notes,
      product_types_id,
    };
    const res = await API.post('/product')
      .setBody({ editItem })
      .fetch();
    dispatch(setProducts(res.data));
  } catch (err) {
    console.log(err);
  }
};

//edit product
export const editProduct = (
  id: number,
  name: string | number,
  unit: string,
  unit_price: number,
  tax: string,
  notes: null | string,
  product_types_id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const editItem = {
      id,
      name,
      unit,
      unit_price,
      tax,
      notes,
      product_types_id,
    };
    await axios.delete(`${API_URL}` + '/product/' + `${id}`);
    const res = await API.post('/product')
      .setBody({ editItem })
      .fetch();
    dispatch(setProducts(res.data));
  } catch (err) {
    console.log(err);
  }
};

// copy product
export const copyProducts = (
  pid: number,
  name: string | number,
  unit: string,
  unit_price: number,
  tax: string,
  notes: null | string,
  product_item: any,
  product_types_id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    let editId = pid;
    const editItemById = product_item.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setProducts(editItemById));
    const editItem = {
      pid,
      name,
      unit,
      unit_price,
      tax,
      notes,
      product_types_id,
    };
    const res = await API.post('/product')
      .setBody({ editItem })
      .fetch();
    dispatch(setProducts(res.data));
  } catch (err) {
    console.log(err);
  }
};

// add row
export const addRowProducts = (
  name: string,
  unit: string,
  unit_price: number,
  quantity: number,
  id: number
) => (dispatch: AppDispatch) => {
  try {
    const editItem = [
      {
        name,
        unit,
        unit_price,
        quantity,
        id,
      },
    ];
    //@ts-ignore
    dispatch(addProductTable(editItem));
  } catch (err) {
    console.log(err);
  }
};

export const selectProducts = (pid: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/product').fetch();
    dispatch(setProducts(data));
    let editId = pid;
    const editItem = data.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setProducts(editItem));
  } catch (err) {
    console.log(err);
  }
};

//delete Item
export const productDelete = (
  dispatch: AppDispatch,
  productIdList: number[],
  id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}` + '/product/' + `${id}`);
    dispatch(setProducts);
  } catch (err) {}
};
