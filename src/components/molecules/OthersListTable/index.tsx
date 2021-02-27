import { TableBody } from '@material-ui/core';
import React, { useEffect, FC } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getOthers } from '../../../redux/slicers/product';
import { OtherRow } from '../../atoms/ProductTableRow/others';

export const OtherListTable: FC<{ others: any }> = ({ others }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOthers(1));
  }, []);

  return (
    <TableBody>
      {others.map((o: any) => (
        <OtherRow products={others} p={o} />
      ))}
    </TableBody>
  );
};
