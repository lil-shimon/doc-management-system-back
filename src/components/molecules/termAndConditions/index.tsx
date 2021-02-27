import { TextField } from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import React, { FC } from 'react';

export interface termAndConditionsType {
  inputValue?: string;
  term_and_conditions: string;
}

const filter = createFilterOptions<termAndConditionsType>();

export const TermAndConditions: FC<{
  documents: any;
  term_and_conditions: string;
  handleChangeTermAndConditions: (e: any) => void;
}> = ({ documents, term_and_conditions, handleChangeTermAndConditions }) => {
  //配列からnullを削除
  const newTermAndConditions = documents.map(
    (d: { term_and_conditions: any }) => {
      if (d.term_and_conditions !== null) {
        return d.term_and_conditions;
      } else {
        return '';
      }
    }
  );

  //配列から''を削除
  const newDocument = [...newTermAndConditions];
  for (let i = 0; i < newDocument.length; i++) {
    if (newDocument[i] === '') {
      newDocument.splice(i, 1);
    }
  }

  //かぶっている要素を削除
  let uniqueTermAndConditions = [...new Set(newDocument)];

  console.log('term_and_conditions', term_and_conditions);

  return (
    <Autocomplete
      value={term_and_conditions}
      onChange={(e, newValue) => {
        if (typeof newValue === 'string') {
          handleChangeTermAndConditions(newValue);
        } else if (newValue && newValue.inputValue) {
          handleChangeTermAndConditions(newValue.inputValue);
        } else {
          handleChangeTermAndConditions(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          //@ts-ignore
          filtered.push(params.inputValue);
        }
        return filtered;
      }}
      selectOnFocus
      handleHomeEndKeys
      clearOnBlur
      options={uniqueTermAndConditions}
      getOptionLabel={option => {
        if (typeof option === 'string') {
          return option;
        }
        return option;
      }}
      freeSolo
      renderInput={params => <TextField {...params} label="契約条件" />}
    />
  );
};
