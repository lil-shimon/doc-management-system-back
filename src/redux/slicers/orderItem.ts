import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { API, API_URL } from '../../api';
import { AppDispatch, AppThunk } from '../store';
import { RootState } from '../rootReducers';

export type OrderItem = {
  id: number;
  order_date: string;
  note: string;
  sub_total: number;
  quotation: string;
  invoice: string;
  total_price: number;
  remarks: string;
  order_id: number;
  claim: string;
};

export interface OrderItemState {
  indexes: Record<number, OrderItem>;
  orderItemById: Record<number, OrderItem>;
}

export const orderItemInitialState: OrderItemState = {
  indexes: {},
  orderItemById: {},
};

const orderItemSlice = createSlice({
  name: 'orderItemState',
  initialState: orderItemInitialState,
  reducers: {
    setOrderItems: (
      state: OrderItemState,
      { payload }: PayloadAction<OrderItem[]>
    ) => {
      state.indexes = payload;
    },
    setOrderItemById: (
      state: OrderItemState,
      { payload }: PayloadAction<OrderItem[]>
    ) => {
      state.orderItemById = payload;
      setOrderItemById(payload);
    },
  },
});

export const { setOrderItems, setOrderItemById } = orderItemSlice.actions;

export default orderItemSlice.reducer;

// get order item list
export const getOrderItems = (orderId: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/getorderitem/${orderId}`).fetch();
    dispatch(setOrderItems(data));
  } catch (err) {
    console.log(err);
  }
};

//案件見積部編集
export const editOrderItem = (order_ite: any, id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const [order_item] = order_ite;
    const res = await API.put(`/orderitem/${id}`)
      .setBody(order_item)
      .fetch();
    dispatch(setOrderItems(res.data));
  } catch (err) {
    console.log(err);
  }
};

// 見積もり部、見積書、請求書のアップロード関数
export const storeOrderItem = (
  quotation: any,
  invoice: any,
  note: any,
  order_date: any,
  remarks: any,
  sub_total: any
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const params = new FormData();
    params.append('order_date', order_date);
    params.append('note', note);
    params.append('quotation', quotation);
    params.append('invoice', invoice);
    params.append('sub_total', sub_total);
    params.append('remarks', remarks);
    const res = await API.post('/orderitem')
      .setBody(params)
      .fetch();
    dispatch(setOrderItems(res.data));
  } catch (err) {
    console.log(err);
  }
};

//案件の見積もり部を見積もりから作成
export const storeOrderItemFromDocument = (
  sub_total: null | number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const order_item = {
      sub_total,
    };
    console.log('order_item', order_item);
    const res = await API.post('/storeorderitemfromdocument')
      .setBody(order_item)
      .fetch();
  } catch (err) {
    console.log(err);
  }
};

export const showOrderItem = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/getorderitem/${id}`).fetch();
    dispatch(setOrderItemById(data));
  } catch (err) {
    console.log(err);
  }
};
