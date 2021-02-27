import React, { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';

export const CompanyLogoName: FC<{
  handleChangeName: (e: any) => void;
  name: string | number;
}> = ({ handleChangeName, name }) => {
  return (
    <TextField
      required
      fullWidth
      variant="outlined"
      label="name"
      onChange={(e) => handleChangeName(e.target.value)}
    />
  );
};
