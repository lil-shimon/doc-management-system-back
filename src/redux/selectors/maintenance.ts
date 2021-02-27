import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../rootReducers';

export const getListMaintenance = createSelector(
  (state: RootState) => state.maintenanceState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);

export const getListThisMonth = createSelector(
  (state: RootState) => state.maintenanceState.thisMonth,
  thisMonth => {
    return Object.values(thisMonth);
  }
);

export const getListLastMonth = createSelector(
  (state: RootState) => state.maintenanceState.lastMonth,
  lastMonth => {
    return Object.values(lastMonth);
  }
);

export const getListTwoMonthAgo = createSelector(
  (state: RootState) => state.maintenanceState.twoMonthAgo,
  twoMonthAgo => {
    return Object.values(twoMonthAgo);
  }
);
