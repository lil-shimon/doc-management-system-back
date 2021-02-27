import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListDocument = createSelector(
  (state: RootState) => state.documentState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);

export const getPurchasedPostage = createSelector(
  (state: RootState) => state.documentState.postages,
  postages => {
    return Object.values(postages);
  }
);

export const getPurchasedProduct = createSelector(
  (state: RootState) => state.documentState.products,
  products => {
    return Object.values(products);
  }
);

export const getDocumentByDid = createSelector(
  (state: RootState) => state.documentState.documentById,
  documentById => {
    return documentById;
  }
);

export const getPurchasedPostageById = createSelector(
  (state: RootState) => state.documentState.purchasedPostageById,
  getPurchasedPostageById => {
    return getPurchasedPostageById;
  }
);

export const getPurchasedProductById = createSelector(
  (state: RootState) => state.documentState.purchasedProductById,
  getPurchasedProductById => {
    return getPurchasedProductById;
  }
);
