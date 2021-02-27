import { Dispatch } from 'react';
import { Action, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer, { RootState } from './rootReducers';

const store = (preloadedState: Partial<RootState> = {}) => {
  const middleware = [...getDefaultMiddleware()];
  if (process.env.NODE_ENV !== 'production') {
    middleware.unshift(logger);
  }
  
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducers', () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
};

export default store;

export type AppDispatch = ThunkDispatch<any, null, AnyAction> &
  ThunkDispatch<any, undefined, AnyAction> &
  Dispatch<AnyAction>;

export type AppThunk<T = any> = ThunkAction<
  Promise<T>,
  RootState,
  unknown,
  Action<string>
>;
