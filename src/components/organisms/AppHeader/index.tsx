import {
  CssBaseline,
  Toolbar,
  Typography,
  Drawer,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Popover,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slicers/login';
import useStyles from './styles';
import clsx from 'clsx';
import { Menu } from '@material-ui/icons';

export const drawerWidth = 240;

export type AppHeaderProps = {
  sideBarWidth: number;
  sidebarOpened: boolean;
  onSidebarOpen: () => void;
};

export default function AppHeader({
  sideBarWidth,
  sidebarOpened,
  onSidebarOpen,
}: AppHeaderProps) {
  const classes = useStyles(sideBarWidth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: sidebarOpened,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onSidebarOpen}
            edge="start"
            className={clsx(classes.menuButton, sidebarOpened && classes.hide)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            見積もり案件管理システム
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            ログアウト
          </Button>
        </Toolbar>
        <Drawer className={classes.drawer} variant="permanent" />
      </AppBar>
    </div>
  );
}
