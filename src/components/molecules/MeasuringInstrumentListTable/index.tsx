import { TableBody } from '@material-ui/core';
import React, { useEffect, FC } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { getListMeasuringInstrument } from '../../../redux/selectors/product';
import { getMeasuringInstruments } from '../../../redux/slicers/product';
import { ProductRow } from '../../atoms/ProductTableRow';
import { MeasuringInstrumentRow } from '../../atoms/ProductTableRow/measuringInstrument';

export const MeasuringInstrumentListTable: FC<{ measurings: any }> = ({
  measurings,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeasuringInstruments(1));
  }, []);

  return (
    <TableBody>
      {measurings.map((m: any) => (
        <MeasuringInstrumentRow products={measurings} p={m} />
      ))}
    </TableBody>
  );
};
