import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '../redux/rootReducers';
import { getRefreshToken, getUserLogin } from '../redux/slicers/login';

export enum AuthMode {
  PRIVATE,
  PUBLIC,
}

interface AuthenicationProps {
  children: React.ReactElement;
  mode?: AuthMode;
}

export default function Authenication({
  children,
  mode = AuthMode.PRIVATE,
}: AuthenicationProps) {
  const dispatch = useDispatch();
  const loginData = useSelector((state: RootState) => state.loginState.data);
  const checked = useSelector((state: RootState) => state.loginState.checked);
  const router = useRouter();

  useEffect(() => {
    if (!checked) {
      if (!loginData) {
        dispatch(getUserLogin());
      }
    }
  }, [checked]);

  useEffect(() => {
    if (checked) {
      if (mode === AuthMode.PUBLIC) {
        if (loginData) {
          router.push('/documents/mitsumori');
        }
      } else if (mode === AuthMode.PRIVATE) {
        if (!loginData) {
          dispatch(getRefreshToken())
        }
      }
    }
  }, [loginData, mode, checked]);

  return children;
}
