import { LastPage } from '@material-ui/icons';
import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

// Call a specific State from the State managed collectively by RootState. Refer to state from store
export const getListPostage = createSelector(
  (state: RootState) => state.postageState.indexes,
  indexes => {
    return Object.values(indexes);
  }
);

export const getLastPage = createSelector(
  (state: RootState) => state.postageState.lastPage,
  lastpage => {
    return lastpage;
  }
);
