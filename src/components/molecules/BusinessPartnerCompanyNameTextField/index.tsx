import { TextField } from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import React, { FC } from 'react';

export interface businessPartnerType {
  inputValue?: string;
  business_partner_company_name: string;
  params: string;
}

export interface businessPartnerCompanyNameType {
  documents: any;
  business_partner_company_name: string;
  handleChangeBusinessPartnerCompanyName: (e: any) => void;
}

const filter = createFilterOptions<businessPartnerType>();

export const BusinessPartnerCompanyNameTextField: FC<
  businessPartnerCompanyNameType
> = ({
  documents,
  business_partner_company_name,
  handleChangeBusinessPartnerCompanyName,
}) => {
  const partnerList = documents.map(
    (d: { business_partner_company_name: string }) => {
      return d.business_partner_company_name;
    }
  );
  const partnerLists = [...partnerList];
  let uniquePartnerList = [...new Set(partnerLists)];

  return (
    <Autocomplete
      value={business_partner_company_name}
      onChange={(e, newValue) => {
        if (typeof newValue === 'string') {
          handleChangeBusinessPartnerCompanyName(newValue);
        } else if (newValue && newValue.inputValue) {
          handleChangeBusinessPartnerCompanyName(newValue.inputValue);
        } else {
          handleChangeBusinessPartnerCompanyName(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        if (params.inputValue !== '') {
          {/* @ts-ignore */}
          filtered.push(params.inputValue);
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={uniquePartnerList}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option;
      }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="取引先名" />}
    />
  );
};
