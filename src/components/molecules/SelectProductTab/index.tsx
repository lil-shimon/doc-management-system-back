import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';

interface TabPanelProps {
  index: any;
  value: any;
  children?: React.ReactNode;
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  btn: {
    textDecoration: 'none',
    color: 'white',
  },
}));

export default function SelectProductTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        TabIndicatorProps={{ style: { background: 'default' } }}
      >
        <Link href={'/products/list'}>
          <a className={classes.btn}>
            <Tab value={0} label="商品" {...a11yProps('one')} />
          </a>
        </Link>
        <Link href={'/postages/list'}>
          <a className={classes.btn}>
            <Tab value={2} label="送料" {...a11yProps('two')} />
          </a>
        </Link>
        <Link href={'/users/list'}>
          <a className={classes.btn}>
            <Tab value={3} label="ユーザー" {...a11yProps('three')} />
          </a>
        </Link>
        <Link href={'/company-logo/list'}>
          <a className={classes.btn}>
            <Tab value={4} label="会社ロゴ" {...a11yProps('four')} />
          </a>
        </Link>
      </Tabs>
    </AppBar>
  );
}
