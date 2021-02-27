import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListProgress = createSelector(
  (state: RootState) => state.progressState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);
