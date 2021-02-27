import { TableBody } from '@material-ui/core';
import React, { useEffect, FC } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getListMonitor } from '../../../redux/selectors/product';
import { getMonitors } from '../../../redux/slicers/product';
import { ProductRow } from '../../atoms/ProductTableRow';

export const MonitorListTable: FC<{ monitors: any }> = ({ monitors }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMonitors(1));
  }, []);

  return (
    <TableBody>
      {monitors.map((m: any) => (
        <ProductRow products={monitors} p={m} />
      ))}
    </TableBody>
  );
};
