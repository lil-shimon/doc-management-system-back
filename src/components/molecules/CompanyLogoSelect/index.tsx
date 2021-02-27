import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { FC } from 'react';
import useStyles from './styles';

export const CompanyLogoSelect: FC<{
  companyLogos: any;
  handleSelectCompanyLogo: (e: any) => void;
  img_path: string;
}> = ({ companyLogos, handleSelectCompanyLogo, img_path }) => {
  const classes = useStyles();
  console.log('companyLogos', companyLogos);
  return (
    <>
      <FormControl className={classes.selectItem}>
        <InputLabel>会社ロゴ</InputLabel>
        <Select
          value={img_path}
          onChange={e => handleSelectCompanyLogo(e.target.value)}
          id="company-logo"
          required
        >
          {companyLogos.map(
            (c: {
              img_path: string | number | readonly string[] | undefined;
              name: React.ReactNode;
            }) => (
              <MenuItem value={c.img_path}>{c.name}</MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </>
  );
};
