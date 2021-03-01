import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { API, API_URL } from '../../api';
import { AppDispatch, AppThunk } from '../store';
import { setFlashError, setFlashSuccess } from './flash';
import { AdditionalPagination, Pagination } from '../../../types';

export type Order = {
  id: number;
  start_date: string;
  end_date: string;
  expected_start_date: string;
  expected_end_date: string;
  invoice_note: string;
  sale_note: string;
  maintainance_note: string;
  sim_number: string;
  signnage_id: string;
  condition_id: number;
  user_id: number;
  total_price: number;
  additional_invoice: string;
  condition_name: string;
  document_id: number | null;
  company_name: string | null;
};

export type OrderById = {
  created_at: string;
  username: string;
  start_date: string;
  end_date: string;
  expected_start_date: string;
  expected_end_date: string;
  invoice_note: string;
  sale_note: string;
  maintainance_note: string;
  sim_number: string;
  signnage_id: string;
  condition_id: number;
  user_id: number;
  total_price: number | null;
  additional_invoice: string;
  condition_name: string;
  company_name: string | null;
};

export interface OrderState {
  indexes: Record<number, Order>;
  fifteens: Record<number, Order>;
  twenties: Record<number, Order>;
  twentyFives: Record<number, Order>;
  lasts: Record<number, Order>;
  lastPage: number;
  orderById: Record<number, OrderById>;
  docIdArray: Record<number, Order>;
  pagination: Pagination;
  url: string | null
}

export const orderInitialState: OrderState = {
  indexes: {},
  fifteens: {},
  twenties: {},
  twentyFives: {},
  lasts: {},
  lastPage: 1,
  orderById: {},
  docIdArray: {},
  pagination: {
    total: 0,
    current_page: 1,
    last_page: 1,
  },
  url: null
};

const orderSlice = createSlice({
  name: 'orderState',
  initialState: orderInitialState,
  reducers: {
    setOrders: (state: OrderState, { payload }: PayloadAction<Order[]>) => {
      //@ts-ignore
      state.indexes = payload['data'];
    },
    setUrl: (state: OrderState, { payload }: PayloadAction<string | null>) => {
      state.url = payload;
    },
    setOrderPagination(
      state,
      { payload }: PayloadAction<AdditionalPagination>
    ) {
      state.pagination = {
        ...state.pagination,
        ...payload,
      };
    },
    setFifteens: (state: OrderState, { payload }: PayloadAction<Order[]>) => {
      //@ts-ignore
      state.fifteens = payload['data'];
    },
    setTwenties: (state: OrderState, { payload }: PayloadAction<Order[]>) => {
      //@ts-ignore
      state.twenties = payload['data'];
    },
    setTwentyFives: (
      state: OrderState,
      { payload }: PayloadAction<Order[]>
    ) => {
      //@ts-ignore
      state.twentyFives = payload['data'];
    },
    setLasts: (state: OrderState, { payload }: PayloadAction<Order[]>) => {
      //@ts-ignore
      state.lasts = payload['data'];
    },
    setLastPage: (state: OrderState, { payload }: PayloadAction<number>) => {
      //@ts-ignore
      state.lastPage = payload['last_page'];
    },
    setOrderById: (
      state: OrderState,
      { payload }: PayloadAction<OrderById[]>
    ) => {
      state.orderById = payload;
      //@ts-ignore
      setOrderById(payload);
    },
    setDocIdArrayByOrder: (
      state: OrderState,
      { payload }: PayloadAction<Order[]>
    ) => {
      state.docIdArray = payload;
    },
  },
});

export const {
  setOrders,
  setFifteens,
  setTwenties,
  setTwentyFives,
  setLasts,
  setLastPage,
  setOrderById,
  setDocIdArrayByOrder,
  setOrderPagination,
  setUrl
} = orderSlice.actions;

export default orderSlice.reducer;

// get order list
export const getOrders = (
  currentPage: number,
  query?: string | null,
  queryWord?: string | null,
  orderBy?: string | null,
  orderByWord?: string | null
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    console.log('query word', queryWord);
    console.log('order by word', orderByWord);
    const res = await API.get(
      '/order',
      [`?page=${currentPage}`],
      [[`${query}`, `${queryWord}`, `${orderBy}`, `${orderByWord}`]]
    ).fetch();
    if (queryWord == '15日') {
      dispatch(setFifteens(res.data));
    } else if (queryWord == '20日') {
      dispatch(setTwenties(res.data));
    } else if (queryWord == '25日') {
      dispatch(setTwentyFives(res.data));
    } else if (queryWord == '月末') {
      dispatch(setLasts(res.data));
    } else {
      dispatch(setOrders(res.data));
    }
    dispatch(setUrl(queryWord));
    dispatch(setLastPage(res.data));
    dispatch(
      setOrderPagination({
        total: res.data.total,
        current_page: res.data.current_page,
        last_page: res.data.last_page,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

//請求日で一覧取得
export const paymentOrders = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/order?payment=${word}`).fetch();
    if (word === '15日') {
      dispatch(setFifteens(data));
    } else if (word === '20日') {
      dispatch(setTwenties(data));
    } else if (word === '25日') {
      dispatch(setTwentyFives(data));
    } else if (word === '月末') {
      dispatch(setLasts(data));
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

// get order info for show page
export const showOrder = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/order/${id}`).fetch();
    dispatch(setOrderById(data));
  } catch (err) {
    console.log(err);
  }
};

//案件を見積もりから作成
export const storeOrderFromDocument = (
  document_id: number,
  user_id: number,
  company_name: string,
  title: string | null,
  site_name: string | null,
  total_price: number,
  sub_total: null | number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    // メンテナンス更新回数の初期値
    const count = 1;
    const order_info = {
      document_id,
      user_id,
      company_name,
      title,
      site_name,
      total_price,
      sub_total,
      count,
    };
    const res = await API.post('/storefromdocument')
      .setBody(order_info)
      .fetch();
    await dispatch(
      setFlashSuccess(`見積もり${document_id}番が受注になりました`)
    );
  } catch (err) {
    await dispatch(setFlashError('受注に変更できませんでした'));
  }
};

//案件、見積もり部作成
export const storeOrder = (
  start_date: Blob | string | any,
  end_date: Blob | string | any,
  expected_start_date: Blob | string | any,
  expected_end_date: Blob | string | any,
  user_id: Blob | string,
  company_name: Blob | string | any,
  site_name: Blob | string | any,
  phone_number: Blob | string | any,
  site_representative: Blob | string | any,
  site_representative_phone: Blob | string | any,
  site_mail: Blob | string | any,
  site_address: Blob | string | any,
  condition_name: Blob | string | any,
  payment: string | Blob | any,
  note: string | Blob | any,
  sub_total: string | Blob | any,
  quotation: string | Blob | any,
  invoice: string | Blob | any,
  claim: string | Blob | any,
  order_date: string | Blob | any,
  invoice_note: string | Blob | any,
  sale_note: string | Blob | any,
  maintainance_note: string | Blob | any,
  signnage_id: string | Blob | any,
  additional_invoice: string | Blob | any,
  file_path: string | Blob | any,
  file_path_two: string | Blob | any,
  file_path_three: string | Blob | any
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const params = new FormData();
    // params.append('_method', 'put');
    if (start_date != null) {
      params.append('start_date', start_date);
    }
    if (end_date != null) {
      params.append('end_date', end_date);
    }
    if (expected_start_date != null) {
      params.append('expected_start_date', expected_start_date);
    }
    if (expected_end_date != null) {
      params.append('expected_end_date', expected_end_date);
    }
    if (user_id != null) {
      params.append('user_id', user_id);
    }
    if (company_name != null) {
      params.append('company_name', company_name);
    }
    if (site_mail != null) {
      params.append('site_name', site_name);
    }
    if (phone_number != null) {
      params.append('phone_number', phone_number);
    }
    if (site_representative != null) {
      params.append('site_representative', site_representative);
    }
    if (site_representative_phone != null) {
      params.append('site_representative_phone', site_representative_phone);
    }
    if (site_mail != null) {
      params.append('site_mail', site_mail);
    }
    if (site_address != null) {
      params.append('site_address', site_address);
    }
    if (condition_name != null) {
      params.append('condition_name', condition_name);
    }
    if (payment != null) {
      params.append('payment', payment);
    }
    if (order_date != null) {
      params.append('order_date', order_date);
    }
    if (note != null) {
      params.append('note', note);
    }
    if (quotation != null) {
      params.append('quotation', quotation);
    }
    if (invoice != null) {
      params.append('invoice', invoice);
    }
    if (sub_total != null) {
      params.append('sub_total', sub_total);
    }
    if (claim != null) {
      params.append('claim', claim);
    }
    if (invoice_note != null) {
      params.append('invoice_note', invoice_note);
    }
    if (sale_note != null) {
      params.append('sale_note', sale_note);
    }
    if (maintainance_note != null) {
      params.append('maintainance_note', maintainance_note);
    }
    if (signnage_id != null) {
      params.append('signnage_id', signnage_id);
    }
    if (additional_invoice != null) {
      params.append('additional_invoice', additional_invoice);
    }
    if (file_path != null) {
      params.append('file_path', file_path);
    }
    if (file_path_two != null) {
      params.append('file_path_two', file_path_two);
    }
    if (file_path_three != null) {
      params.append('file_path_three', file_path_three);
    }
    const res = await API.post(`/order`)
      .setBody(params)
      .fetch();
    await dispatch(setFlashSuccess('案件の作成に成功しました'));
  } catch (err) {
    await dispatch(setFlashError('案件の作成に失敗しました'));
  }
};
//案件、見積もり部編集
export const updateOrder = (
  start_date: Blob | string | any,
  end_date: Blob | string | any,
  expected_start_date: Blob | string | any,
  expected_end_date: Blob | string | any,
  user_id: Blob | string,
  company_name: Blob | string | any,
  site_name: Blob | string | any,
  phone_number: Blob | string | any,
  site_representative: Blob | string | any,
  site_representative_phone: Blob | string | any,
  site_mail: Blob | string | any,
  site_address: Blob | string | any,
  condition_name: Blob | string | any,
  payment: string | Blob | any,
  note: string | Blob | any,
  sub_total: string | Blob | any,
  quotation: string | Blob | any,
  invoice: string | Blob | any,
  claim: string | Blob | any,
  order_date: string | Blob | any,
  invoice_note: string | Blob | any,
  sale_note: string | Blob | any,
  maintainance_note: string | Blob | any,
  signnage_id: string | Blob | any,
  additional_invoice: string | Blob | any,
  file_path: string | Blob | any,
  file_path_two: string | Blob | any,
  file_path_three: string | Blob | any,
  id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    console.log('quotation', quotation);
    const params = new FormData();
    if (start_date != null) {
      params.append('start_date', start_date);
    }
    if (end_date != null) {
      params.append('end_date', end_date);
    }
    if (expected_start_date != null) {
      params.append('expected_start_date', expected_start_date);
    }
    if (expected_end_date != null) {
      params.append('expected_end_date', expected_end_date);
    }
    if (user_id != null) {
      params.append('user_id', user_id);
    }
    if (company_name != null) {
      params.append('company_name', company_name);
    }
    if (site_name != null) {
      params.append('site_name', site_name);
    }
    if (phone_number != null) {
      params.append('phone_number', phone_number);
    }
    if (site_representative != null) {
      params.append('site_representative', site_representative);
    }
    if (site_representative_phone != null) {
      params.append('site_representative_phone', site_representative_phone);
    }
    if (site_mail != null) {
      params.append('site_mail', site_mail);
    }
    if (site_address != null) {
      params.append('site_address', site_address);
    }
    if (condition_name != null) {
      params.append('condition_name', condition_name);
    }
    if (payment != null) {
      params.append('payment', payment);
    }
    if (order_date != null) {
      params.append('order_date', order_date);
    }
    if (note != null) {
      params.append('note', note);
    }
    if (quotation != null) {
      params.append('quotation', quotation);
    }
    if (invoice != null) {
      params.append('invoice', invoice);
    }
    if (sub_total != null) {
      params.append('sub_total', sub_total);
    }
    if (claim != null) {
      params.append('claim', claim);
    }
    if (invoice_note != null) {
      params.append('invoice_note', invoice_note);
    }
    if (sale_note != null) {
      params.append('sale_note', sale_note);
    }
    if (maintainance_note != null) {
      params.append('maintainance_note', maintainance_note);
    }
    if (signnage_id != null) {
      params.append('signnage_id', signnage_id);
    }
    if (additional_invoice != null) {
      params.append('additional_invoice', additional_invoice);
    }
    if (file_path != null) {
      params.append('file_path', file_path);
    }
    if (file_path_two != null) {
      params.append('file_path_two', file_path_two);
    }
    if (file_path_three != null) {
      params.append('file_path_three', file_path_three);
    const res = await API.post(`/order/${id}`)
      .setBody(params)
      .fetch();
    await dispatch(setFlashSuccess('案件の保存に成功しました'));
  } catch (err) {
    await dispatch(setFlashError('案件の保存に失敗しました'));
  }
};

//案件削除
export const deleteOrder = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    await axios.delete(`${API_URL}` + '/order/' + `${id}`);
    dispatch(setOrders);
  } catch (err) {
    console.log(err);
  }
};

// 受注された見積もりのIDを取得
export const getDocIdArray = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/getdocumentidarray').fetch();
    dispatch(setDocIdArrayByOrder(data));
  } catch (err) {
    console.log(err);
  }
};

//請求日で案件をフィルタリング
export const filterOrderByPayment = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/order').fetch();
    console.log('data', data['data']);
    const filterItem = data['data'].filter((item: { payment: string }) => {
      let itemPayment = String(item.payment);
      return itemPayment.match(word);
    });
    console.log('filterItem', filterItem);
    if (word === '15日') {
      dispatch(setFifteens(filterItem));
    } else if (word === '20日') {
      dispatch(setTwenties(filterItem));
    } else if (word === '25日') {
      dispatch(setTwentyFives(filterItem));
    } else if (word === '月末') {
      dispatch(setLasts(filterItem));
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
