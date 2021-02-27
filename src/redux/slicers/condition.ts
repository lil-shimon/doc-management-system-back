import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';

export type Condition = {
  id: number
  name: string
}

export interface ConditionState {
  indexes: Record<number,Condition>
}

export const conditionInitialState: ConditionState = {
  indexes: {}
}

const conditionSlice = createSlice({
  name: 'conditionState',
  initialState: conditionInitialState,
  reducers: {
    setConditions: (state: ConditionState, {payload}: PayloadAction<Condition[]>) => {
      state.indexes = payload
    }
  }
})

export const { setConditions } = conditionSlice.actions

export default conditionSlice.reducer

export const getConditionsById = (id: number) => ( dispatch: AppDispatch) => {
  const conditions = [
    {id: 1, name: '発送済み' },
    {id: 2, name: '稼働中'},
    {id: 3, name: '終了'},
    {id: 4, name: '休止中'},
  ]
  const condition = conditions.filter((item: {id: number}) => {
    return id === item.id
  })
  console.log('condition', condition)
  dispatch(setConditions(condition))
}