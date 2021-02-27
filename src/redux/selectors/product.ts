import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

// Call a specific State from the State managed collectively by RootState. Refer to state from store
export const getListProduct = createSelector(
  (state: RootState) => state.productState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);
export const getListMonitor = createSelector(
  (state: RootState) => state.productState.monitors,
  monitors => {
    return Object.values(monitors);
  }
);
export const getListMeasuringInstrument = createSelector(
  (state: RootState) => state.productState.measuringInstruments,
  measuringInstruments => {
    return Object.values(measuringInstruments);
  }
);
export const getListJitan = createSelector(
  (state: RootState) => state.productState.jitans,
  jitans => {
    return Object.values(jitans);
  }
);
export const getListOthers = createSelector(
  (state: RootState) => state.productState.others,
  others => {
    return Object.values(others);
  }
);

export const getSelectedProduct = createSelector(
  (state: RootState) => state.productState.selectedProducts,
  selectedProducts => {
    return Object.values(selectedProducts);
  }
);

export const getLastPage = createSelector(
  (state: RootState) => state.productState.lastPage,
  lastPage => {
    return lastPage;
  }
);
