import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListAttachment = createSelector(
  (state: RootState) => state.attachmentState.indexes,
  (indexes: { [s: string]: unknown } | ArrayLike<unknown>) => {
    console.log('indexed', indexes);
    return indexes;
  }
);
