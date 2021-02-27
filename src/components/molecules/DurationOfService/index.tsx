import { TextField } from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import React, { FC } from 'react';

export interface durationOfServiceType {
  inputValue?: string;
  duration_of_service: string | null;
}

const filter = createFilterOptions<durationOfServiceType>();

export const DurationOfService: FC<{
  documents: any;
  duration_of_service: string | null;
  label: string;
  handleChangeDurationOfService: (e: any) => void;
}> = ({
  documents,
  duration_of_service,
  label,
  handleChangeDurationOfService,
}) => {
  //配列からnullを削除
  const newDurationOfService = documents.map(
    (d: { duration_of_service: any }) => {
      if (d.duration_of_service !== null) {
        return d.duration_of_service;
      } else {
        return '';
      }
    }
  );

  //配列から''を削除
  const newDocument = [...newDurationOfService];
  for (let i = 0; i < newDocument.length; i++) {
    if (newDocument[i] === '') {
      newDocument.splice(i, 1);
    }
  }

  //かぶっている要素を削除
  let uniqueDurationOfService = [...new Set(newDocument)];

  return (
    <Autocomplete
      value={duration_of_service}
      onChange={(e, newValue) => {
        if (typeof newValue === 'string') {
          handleChangeDurationOfService(newValue);
        } else if (newValue && newValue.inputValue) {
          handleChangeDurationOfService(newValue.inputValue);
        } else {
          handleChangeDurationOfService(newValue);
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
      options={uniqueDurationOfService}
      getOptionLabel={option => {
        if (typeof option === 'string') {
          return option;
        }
        return option;
      }}
      freeSolo
      renderInput={params => <TextField {...params} label={label} />}
    />
  );
};
