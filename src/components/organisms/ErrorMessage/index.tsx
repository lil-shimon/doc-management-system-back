import React, { useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/rootReducers';

const ErrorMessage: React.FC = () => {
  const error = useSelector((state: RootState) => state.errorState.error);

  return error.length ? (
    <Alert severity="error">
      <AlertTitle>エラー</AlertTitle>
      <ul>
        {error.map(_error => (
          <li key={_error}>{_error}</li>
        ))}
      </ul>
    </Alert>
  ) : null;
};

export default ErrorMessage;
