import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListUser = createSelector(
  (state: RootState) => state.userState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);
