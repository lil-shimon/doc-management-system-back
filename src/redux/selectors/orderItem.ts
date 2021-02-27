import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListOrderItem = createSelector(
  (state: RootState) => state.orderItemState.indexes,
  indexes => {
    return Object.values(indexes)
  }
);

export const getOrderItemById = createSelector(
  (state: RootState) => state.orderItemState.orderItemById,
  orderItemById => {
    return orderItemById;
  }
);