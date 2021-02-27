import React from 'react';
import Head from 'next/head';
import AppHeader from '../components/organisms/AppHeader';
import AppSideBar, { sideBarWidth } from './organisms/AppSideBar';
import { CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducers';
import { toggleSideBar } from '../redux/slicers/sideBar';
import useStyles from './styles/layout';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  //@ts-ignore
  const classes = useStyles(sideBarWidth);

  const sideBarOpened = useSelector(
    (state: RootState) => state.sidebarState.sideBarOpened
  );
  const handleDrawer = (open: boolean) => () => {
    dispatch(toggleSideBar(open));
  };
  return (
    <>
      <Head>
        <title>見積もり案件メンテナンス管理システム</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <AppHeader
          sideBarWidth={sideBarWidth}
          sidebarOpened={sideBarOpened}
          onSidebarOpen={handleDrawer(true)}
        />
        <AppSideBar
          sideBarWidth={sideBarWidth}
          onSideBarClose={handleDrawer(false)}
          sideBarOpened={sideBarOpened}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: sideBarOpened,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    </>
  );
}
