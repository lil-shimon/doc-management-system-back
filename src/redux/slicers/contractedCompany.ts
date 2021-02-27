import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { API } from '../../api';
import { AppDispatch, AppThunk } from '../store'

export type ContractedCompany = {
    id: number
    document_id: number
    order_id: number
    name: string
    person_in_change: string
    honorific_title: string
    tel: string
    site_name: string
    site_representative: string
    site_representative_phone: string
    mail: string
    address: string
}

export interface ContractedCompanyState {
  indexes: Record<number, ContractedCompany>
}

export const contractedCompanyInitialState: ContractedCompanyState = {
  indexes: {},
}

const contractedCompanySlice = createSlice({
  name: 'contractedCompanyState',
  initialState: contractedCompanyInitialState,
  reducers: {
    setContractedCompanies: (
      state: ContractedCompanyState,
      { payload }: PayloadAction<ContractedCompany[]>
    ) => {
      state.indexes = payload;
    },
 }
})

export const { setContractedCompanies} = contractedCompanySlice.actions;

export default contractedCompanySlice.reducer;

// get contracted company information for order show page
export const getContractedCompanies = (id: number): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const { data } = await API.get(`/getcontractedcompany/${id}`).fetch();
    dispatch(setContractedCompanies(data))
  } catch (err) {
    console.log(err)
  }
}