import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';
import { FlashState } from '../slicers/flash';

export const getFlashSelector = createSelector(
  (state: RootState) => state.flashState.type,
  (state: RootState) => state.flashState.message,
  (type, message) => {
    return { type, message } as FlashState;
  }
);
