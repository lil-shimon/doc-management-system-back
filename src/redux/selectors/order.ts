import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListOrder = createSelector(
  (state: RootState) => state.orderState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);

//total, current_page, last_page
export const getOrderPagination = createSelector(
  (state: RootState) => state.orderState.pagination,
  pagination => {
    return pagination;
  }
);

export const getListFifteen = createSelector(
  (state: RootState) => state.orderState.fifteens,
  fifteens => {
    if (fifteens) {
      return Object.values(fifteens);
    } else {
      return;
    }
  }
);

export const getListTwenty = createSelector(
  (state: RootState) => state.orderState.twenties,
  twenties => {
    return Object.values(twenties);
  }
);

export const getListTwentyFive = createSelector(
  (state: RootState) => state.orderState.twentyFives,
  twentyFives => {
    return Object.values(twentyFives);
  }
);

export const getListLast = createSelector(
  (state: RootState) => state.orderState.lasts,
  lasts => {
    return Object.values(lasts);
  }
);

export const getLastPage = createSelector(
  (state: RootState) => state.orderState.lastPage,
  lastPage => {
    return lastPage;
  }
);

export const getOrderById = createSelector(
  (state: RootState) => state.orderState.orderById,
  orderById => {
    return orderById;
  }
);

//受注された見積もりIDを取得
export const getListDocIdArray = createSelector(
  (state: RootState) => state.orderState.docIdArray,
  docIdArray => {
    return Object.values(docIdArray);
  }
);

//ページの場所を取得
export const getOrderUrl = createSelector(
  (state: RootState) => state.orderState.url,
  url => {
    return url;
  }
);
