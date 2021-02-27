import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducers';
import { getFlashSelector } from '../../../redux/selectors/flash';
import FlashMessage from '../../organisms/FlashMessage';

const FlashMessageSystem = () => {
  const flash = useSelector((state: RootState) => getFlashSelector(state));

  return flash.message ? <FlashMessage {...flash} /> : null;
};

export default FlashMessageSystem;
