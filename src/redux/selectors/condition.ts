import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getConditionsById = createSelector(
  (state: RootState) => state.conditionState.indexes,
  indexes => {
    return Object.values(indexes)
  }
)