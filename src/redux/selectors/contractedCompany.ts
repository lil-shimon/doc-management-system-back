import { createSelector } from 'reselect';
import { RootState } from '../rootReducers';

export const getListContractedCompany = createSelector(
    (state: RootState) => state.contractedCompanyState.indexes,
    (indexes: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        return Object.values(indexes)
    }
)
