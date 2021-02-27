import {
  List,
  Divider,
  Drawer,
  IconButton,
  useTheme,
  Badge,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, DeveloperBoard } from '@material-ui/icons';
import React from 'react';
import useStyles from './styles';
import { TreeItem, TreeView } from '@material-ui/lab';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import DeskTopWindowIcon from '@material-ui/icons/DesktopWindows';
import SpeedIcon from '@material-ui/icons/Speed';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BusinessIcon from '@material-ui/icons/Business';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { useRouter } from 'next/router';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${
          theme.palette.grey[400]
        })`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: 'inherit',
      flexGrow: 1,
    },
  })
);

export type SideBarProps = {
  sideBarWidth: number;
  sideBarOpened: boolean;
  onSideBarClose: () => void;
};

function StyledTreeItem(props: StyledTreeItemProps) {
  const classes = useTreeItemStyles();
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

export const sideBarWidth = 240;

export default function AppSideBar({
  sideBarWidth,
  sideBarOpened,
  onSideBarClose,
}: SideBarProps) {
  const classes = useStyles(sideBarWidth)();
  const theme = useTheme();
  const router = useRouter();
  const handleMoveToCreateDocument = () => {
    router.push('/documents/create-document');
  };
  const handleMoveToMonitor = () => {
    router.push('/monitors/list');
  };
  const handleMoveToMeasuringInstrument = () => {
    router.push('/measuringInstruments/list');
  };
  const handleMoveToJitan = () => {
    router.push('/jitans/list');
  };
  const handleMoveToOther = () => {
    router.push('/others/list');
  };
  const handleMoveToPostage = () => {
    router.push('/postages/list');
  };
  const handleMoveToUser = () => {
    router.push('/users/list');
  };
  const handleMoveToCompanyLogo = () => {
    router.push('/company-logo/list');
  };
  const handleMoveToMitsumori = () => {
    router.push('/documents/mitsumori');
  };
  const handleMoveToOrder = () => {
    router.push('/orders/list');
  };
  const handleMoveToMaintenance = () => {
    router.push('/maintenances/list');
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={sideBarOpened}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onSideBarClose}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <TreeView
        className={classes.root}
        defaultExpanded={['3']}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
      >
        <StyledTreeItem
          nodeId="1"
          labelText="見積作成"
          labelIcon={CreateIcon}
          onClick={handleMoveToCreateDocument}
        />
        <StyledTreeItem nodeId="2" labelText="各種登録" labelIcon={PostAddIcon}>
          <StyledTreeItem
            nodeId="3"
            labelText="商品情報"
            labelIcon={DescriptionIcon}
            color="#1a73e8"
            bgColor="#e8f0fe"
          >
            <StyledTreeItem
              nodeId="4"
              labelText="モニター一覧"
              labelIcon={DeskTopWindowIcon}
              color="#e3742f"
              bgColor="#fcefe3"
              onClick={handleMoveToMonitor}
            />
            <StyledTreeItem
              nodeId="5"
              labelText="計測器一覧"
              labelIcon={SpeedIcon}
              color="#e3742f"
              bgColor="#fcefe3"
              onClick={handleMoveToMeasuringInstrument}
            />
            <StyledTreeItem
              nodeId="6"
              labelText="JITAN一覧"
              labelIcon={FlashOnIcon}
              color="#e3742f"
              bgColor="#fcefe3"
              onClick={handleMoveToJitan}
            />
            <StyledTreeItem
              nodeId="7"
              labelText="その他一覧"
              labelIcon={ListAltIcon}
              color="#e3742f"
              bgColor="#fcefe3"
              onClick={handleMoveToOther}
            />
          </StyledTreeItem>
          <StyledTreeItem
            nodeId="8"
            labelText="送料一覧"
            labelIcon={FlightTakeoffIcon}
            color="#a250f5"
            bgColor="#f3e8fd"
            onClick={handleMoveToPostage}
          />
          <StyledTreeItem
            nodeId="9"
            labelText="ユーザー一覧"
            labelIcon={AccountBoxIcon}
            color="#a250f5"
            bgColor="#f3e8fd"
            onClick={handleMoveToUser}
          />
          <StyledTreeItem
            nodeId="10"
            labelText="会社ロゴ一覧"
            labelIcon={BusinessIcon}
            color="#a250f5"
            bgColor="#f3e8fd"
            onClick={handleMoveToCompanyLogo}
          />
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="11"
          labelText="見積一覧"
          labelIcon={LibraryBooksIcon}
          color="#3c8039"
          bgColor="#e6f4ea"
          onClick={handleMoveToMitsumori}
        />
        <StyledTreeItem
          nodeId="12"
          labelText="案件一覧"
          labelIcon={DeveloperBoard}
          color="#3c8039"
          bgColor="#e6f4ea"
          onClick={handleMoveToOrder}
        />
        <StyledTreeItem
          nodeId="13"
          labelIcon={DeveloperBoard}
          labelText="メンテナンス一覧"
          onClick={handleMoveToMaintenance}
        />
      </TreeView>
    </Drawer>
  );
}
