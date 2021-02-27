import { TextField } from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import React, { FC } from 'react';

export interface documentTitleType {
  inputValue?: string;
  documentTitle: string;
}

const filter = createFilterOptions<documentTitleType>();

export const DocumentTitleTextField: FC<{
  documents: any;
  documentTitle: string;
  handleChangeDocumentTitle: (e: any) => void;
}> = ({ documents, documentTitle, handleChangeDocumentTitle }) => {
  const documentTitleList = documents.map((d: { document_title: string }) => {
    return d.document_title;
  });

  const documentTitleLists = [...documentTitleList];
  let uniqueDocumentTitleList = [...new Set(documentTitleLists)];

  return (
    <Autocomplete
      value={documentTitle}
      onChange={(e, newValue) => {
        if (typeof newValue === 'string') {
          handleChangeDocumentTitle(newValue);
        } else if (newValue && newValue.inputValue) {
          handleChangeDocumentTitle(newValue.inputValue);
        } else {
          handleChangeDocumentTitle(newValue);
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
      clearOnBlur
      handleHomeEndKeys
      options={uniqueDocumentTitleList}
      getOptionLabel={option => {
        if (typeof option === 'string') {
          return option;
        }
        return option;
      }}
      freeSolo
      renderInput={params => <TextField {...params} label="件名" />}
    />
  );
};
