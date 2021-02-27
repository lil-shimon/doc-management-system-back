import React, { FC, useState } from 'react';

export const CompanyLogoUpload: FC<{ uploadFile: any; img: string }> = ({
  uploadFile,
  img,
}) => {
  return (
    <>
      <input type="file" name="img" onChange={e => uploadFile} />
    </>
  );
};
