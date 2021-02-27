import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListCompanyLogo = createSelector(
  (state: RootState) => state.companyLogoState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);
