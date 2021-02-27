import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API, API_URL } from '../../api';
import { AppDispatch, AppThunk } from '../store';
import { User } from './user';
import { setFlashError, setFlashSuccess } from './flash';

export type Document = {
  id: number;
  business_partner_company_name: string;
  created_at: string;
  customer_part_id: number;
  customer_part_label: string;
  deleted_at: string | null;
  document_title: string | null;
  document_type_id: number;
  honorific_title: string;
  logo_img_path: string;
  payment_terms: string | null;
  quotation_expiration_date: string;
  remarks: string | null;
  see_part_id: number;
  see_part_label: string;
  sell_part_id: number;
  sell_part_label: string;
  status: number;
  status_label: string;
  term_and_conditions: string | null;
  updated_at: string | null;
  usage_period: string | null;
  duration_of_service: string | null;
  usage_period_start?: Date | null;
  usage_period_end?: Date | null;
  user_id: number;
  users: User;
  total_price: number;
  sub_total: number;
};

export type Postage = {
  id: number;
  sender_place: string;
  destination_place: string;
  postage_price: number;
  size: any;
  tax: string;
  quantity: number;
};

export type PostPostage = Pick<
  Postage,
  'sender_place' | 'destination_place' | 'size' | 'quantity' | 'postage_price'
>;

export type Product = {
  id: number;
  name: any;
  unit: string;
  unit_price: number;
  tax: string;
  number: number;
  notes: string;
};

export type PostProduct = Pick<
  Product,
  'name' | 'unit' | 'unit_price' | 'number'
>;

export interface DocumentState {
  indexes: Record<number, Document>;
  postages: Record<number, Postage>;
  products: Record<number, Product>;
  documentById: Record<number, Document>;
  purchasedProductById: Record<number, Product>;
  purchasedPostageById: Record<number, Postage>;
}

export const documentInitialState: DocumentState = {
  indexes: {},
  products: {},
  postages: {},
  documentById: {},
  purchasedProductById: {},
  purchasedPostageById: {},
};

const documentSlice = createSlice({
  name: 'documentState',
  initialState: documentInitialState,
  reducers: {
    setDocuments: (
      state: DocumentState,
      { payload }: PayloadAction<Document[]>
    ) => {
      state.indexes = payload;
    },
    setDocumentById: (
      state: DocumentState,
      { payload }: PayloadAction<Document[]>
    ) => {
      state.documentById = payload;
      setDocumentById(payload);
    },
    setPurchasedProductById: (
      state: DocumentState,
      { payload }: PayloadAction<Product[]>
    ) => {
      state.purchasedProductById = payload;
      setPurchasedProductById(payload);
    },
    setPurchasedPostageById: (
      state: DocumentState,
      { payload }: PayloadAction<Postage[]>
    ) => {
      state.purchasedPostageById = payload;
      setPurchasedPostageById(payload);
    },
    setDocumentProduct: (
      state: DocumentState,
      { payload }: PayloadAction<Product[]>
    ) => {
      state.products = {};
      payload.forEach(item => {
        state.products[item.id] = item;
      });
    },
    setDocumentPostage: (
      state: DocumentState,
      { payload }: PayloadAction<Postage[]>
    ) => {
      state.postages = {};
      payload.forEach(item => {
        state.postages[item.id] = item;
      });
    },
    deleteDocumentById(state, { payload }: PayloadAction<number[]>) {
      payload.forEach(id => {
        delete state.indexes[id];
      });
    },
  },
});

export const {
  setDocuments,
  deleteDocumentById,
  setDocumentPostage,
  setDocumentProduct,
  setDocumentById,
  setPurchasedPostageById,
  setPurchasedProductById,
} = documentSlice.actions;

export default documentSlice.reducer;

// read documents
export const getDocuments = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get('/document').fetch();
    dispatch(setDocuments(data));
  } catch (err) {
    console.error(err);
  }
};

// 見積もり詳細
export const getDocumentById = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/document/${id}`).fetch();
    dispatch(setDocumentById(data));
  } catch (err) {
    console.log(err);
  }
};

// 見積もり詳細
export const getPurchasedPostageById = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/purchasedpostage/${id}`).fetch();
    dispatch(setPurchasedPostageById(data));
  } catch (err) {
    console.log(err);
  }
};

// 見積もり詳細
export const getPurchasedProductById = (id: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get(`/purchasedproduct/${id}`).fetch();
    dispatch(setPurchasedProductById(data));
  } catch (err) {
    console.log(err);
  }
};

//copy documents
export const copyDocuments = (
  pid: number,
  business_partner_company_name: string,
  document_title: string | null,
  document_type_id: number,
  honorific_title: string,
  logo_img_path: string,
  payment_terms: string | null,
  quotation_expiration_date: string,
  tax: string,
  term_and_conditions: string | null,
  usage_period: string | null,
  usage_period_start: Date | null,
  usage_period_end: Date | null,
  duration_of_service: string | null,
  user_id: number,
  remarks: string | null,
  customer_part_id: number,
  see_part_id: number,
  sell_part_id: number,
  products: PostProduct,
  postages: PostPostage,
  sub_total: number,
  total_price: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    let { data } = await API.get('/document').fetch();
    dispatch(setDocuments(data));
    let editId = pid;
    const editItem = data.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setDocumentById(editItem));

    const doc_info = {
      sell_part_id,
      see_part_id,
      customer_part_id,
      document_type_id,
      business_partner_company_name,
      honorific_title,
      user_id,
      document_title,
      payment_terms,
      usage_period,
      usage_period_start,
      usage_period_end,
      duration_of_service,
      logo_img_path,
      quotation_expiration_date,
      tax,
      term_and_conditions,
      sub_total,
      total_price,
    };

    const product_item = products;
    const postage_item = postages;

    const res = await API.post('/document')
      .setBody({ doc_info, remarks, product_item, postage_item })
      .fetch();
    await dispatch(setFlashSuccess('見積もりをコピーしました'));
  } catch (err) {
    await dispatch(setFlashError('見積もりのコピーに失敗しました'));
  }
};

export const selectDocuments = (pid: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/document').fetch();
    dispatch(setDocuments(data));
    let editId = pid;
    const editItem = data.filter((edit: { id: number }) => {
      return editId === edit.id;
    });
    dispatch(setDocuments(editItem));
  } catch (err) {
    console.log(err);
  }
};

// search Document
export const searchDocuments = (word: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await API.get('/document').fetch();
    const searchItem = data.filter(
      (item: {
        document_title: string;
        id: number;
        business_partner_company_name: string | number;
      }) => {
        let itemId = String(item.id);
        let itemPartner = String(item.business_partner_company_name);
        return (
          item.document_title.includes(word) ||
          itemId.includes(word) ||
          itemPartner.includes(word)
        );
      }
    );
    dispatch(setDocuments(searchItem));
  } catch (err) {
    console.log(err);
  }
};

export const setPurchasedPostage = (pid: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await axios.get(
      `${API_URL}` + '/purchasedpostage/' + `${pid}`
    );
    console.log('postage', data);
    dispatch(setDocumentPostage(data));
  } catch (err) {
    console.log(err);
  }
};

export const setPurchasedProduct = (pid: number): AppThunk => async (
  dispatch: AppDispatch
) => {
  try {
    const { data } = await axios.get(
      `${API_URL}` + '/purchasedproduct/' + `${pid}`
    );
    dispatch(setDocumentProduct(data));
  } catch (err) {
    console.log(err);
  }
};

export const newDocuments = (
  business_partner_company_name: string,
  document_title: string,
  document_type_id: number,
  honorific_title: string,
  logo_img_path: string,
  payment_terms: string | null,
  quotation_expiration_date: string,
  tax: string,
  term_and_conditions: string | null,
  usage_period: string | null,
  usage_period_start: Date | null,
  usage_period_end: Date | null,
  duration_of_service: string | null,
  user_id: number,
  remarks: string,
  purchasedPostage: any,
  purchasedProduct: any,
  customer_part_id: number,
  see_part_id: number,
  sell_part_id: number,
  topPurchasedProduct: any,
  sub_total: number,
  total_price: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const doc_info = {
      sell_part_id,
      see_part_id,
      customer_part_id,
      document_type_id,
      business_partner_company_name,
      honorific_title,
      user_id,
      document_title,
      payment_terms,
      usage_period,
      usage_period_start,
      usage_period_end,
      duration_of_service,
      logo_img_path,
      quotation_expiration_date,
      tax,
      term_and_conditions,
      sub_total,
      total_price,
    };

    const postage_item = purchasedPostage;
    let product_item = topPurchasedProduct.concat(purchasedProduct);

    const res = await API.post('/document')
      .setBody({ doc_info, remarks, product_item, postage_item })
      .fetch();
    dispatch(setDocuments(res.data));
  } catch (err) {
    console.log(err);
  }
};

// //書類編集
// export const editDocument = (
//   id: number,
//   business_partner_company_name: string,
//   document_title: string | null,
//   honorific_title: string,
//   logo_img_path: string,
//   payment_terms: string | null,
//   term_and_conditions: string | null,
//   usage_period: string | null,
//   duration_of_service: string | null,
//   user_id: number,
//   remarks: string | null,
//   sub_total: number,
//   total_price: number
// ): AppThunk => async (dispatch: AppDispatch) => {
//   try {
//     const res = await API.put('/document/' + `${id}`)
//       .setBody({ document_title, logo_img_path, user_id, remarks, business_partner_company_name, honorific_title, payment_terms, usage_period, term_and_conditions, duration_of_service, total_price, sub_total })
//       .fetch();
//     dispatch(setDocuments(res.data));
//   } catch (err) {
//     console.log(err);
//   }
// };

export const editDocument = (
  id: number,
  business_partner_company_name: string,
  document_title: string | null,
  document_type_id: number,
  honorific_title: string,
  logo_img_path: string,
  payment_terms: string | null,
  quotation_expiration_date: string,
  tax: string,
  term_and_conditions: string | null,
  usage_period: string | null,
  usage_period_start: Date | null,
  usage_period_end: Date | null,
  duration_of_service: string | null,
  user_id: number,
  remarks: string | null,
  customer_part_id: number,
  see_part_id: number,
  sell_part_id: number,
  product_item: any,
  postage_item: any,
  sub_total: number,
  total_price: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const doc_info = {
      sell_part_id,
      see_part_id,
      customer_part_id,
      document_type_id,
      business_partner_company_name,
      honorific_title,
      user_id,
      document_title,
      payment_terms,
      usage_period,
      usage_period_start,
      usage_period_end,
      duration_of_service,
      logo_img_path,
      quotation_expiration_date,
      tax,
      term_and_conditions,
      sub_total,
      total_price,
    };

    await axios.delete(`${API_URL}` + '/document/' + `${id}`);
    const res = await API.post('/document')
      .setBody({ doc_info, remarks, product_item, postage_item })
      .fetch();
    dispatch(setDocuments(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const documentDelete = (
  documentIdList: number[],
  id: number
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`${API_URL}` + '/document/' + `${id}`);
    dispatch(deleteDocumentById(documentIdList));
    dispatch(setDocuments);
  } catch (err) {
    console.log(err);
  }
};
