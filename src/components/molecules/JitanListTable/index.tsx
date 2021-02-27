import { TableBody } from '@material-ui/core';
import React, { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { getJitans } from '../../../redux/slicers/product';
import { JitanRow } from '../../atoms/ProductTableRow/jitan';

export const JitanListTable: FC<{ jitans: any }> = ({ jitans }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJitans(1));
  }, []);

  return (
    <TableBody>
      {jitans.map((j: any) => (
        <JitanRow products={jitans} p={j} />
      ))}
    </TableBody>
  );
};
