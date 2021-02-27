import { combineReducers } from '@reduxjs/toolkit';

import userState from './slicers/user';
import loginState from './slicers/login';
import documentState from './slicers/document';
import productState from './slicers/product';
import postageState from './slicers/postage';
import companyLogoState from './slicers/companyLogo';
import sidebarState from './slicers/sideBar';
import orderState from './slicers/Order';
import orderItemState from './slicers/orderItem';
import contractedCompanyState from './slicers/contractedCompany';
import attachmentState from './slicers/attachment';
import progressState from './slicers/progress';
import conditionState from './slicers/condition';
import maintenanceState from './slicers/maintenance';
import flashState from './slicers/flash';
import errorState from './slicers/error';

const rootState = {
  userState,
  loginState,
  documentState,
  productState,
  postageState,
  companyLogoState,
  sidebarState,
  orderState,
  orderItemState,
  contractedCompanyState,
  attachmentState,
  progressState,
  conditionState,
  maintenanceState,
  flashState,
  errorState,
};

const rootReducer = combineReducers(rootState);

export type RootState = ReturnType<typeof rootReducer>;
export type RawRootState = typeof rootState;
export default rootReducer;
