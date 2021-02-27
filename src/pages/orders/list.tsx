import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { OrderListsTable } from '../../components/organisms/OrderListsTable';
import { paymentOrders } from '../../redux/slicers/Order';
import SwipeableViews from 'react-swipeable-views';
import OrderFifteenList from '../../components/organisms/OrderListsTable/OrderFifteenList';
import OrderTwentyList from '../../components/organisms/OrderListsTable/OrderTwentyList';
import OrderTwentyFiveList from '../../components/organisms/OrderListsTable/OrderTwentyFiveList';
import OrderLastList from '../../components/organisms/OrderListsTable/OrderLastList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FlashMessageSystem from '../../components/molecules/FlashSystem';
import ErrorMessage from '../../components/organisms/ErrorMessage';
import CreateIcon from '@material-ui/icons/Create';
import { useRouter } from 'next/router';

const UseStyles = makeStyles(theme => ({
  drawerContainer: {
    overflow: 'auto',
  },
  btn: {
    marginTop: '25px',
    marginBottom: '25px',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  searchId: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  width: {
    width: '90%',
  },
  button: {
    margin: '0 0 10px 0',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function OrdersList() {
  const classes = UseStyles();
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleChangePayment = (word: string) => {
    dispatch(paymentOrders(word));
  };

  //Tab
  const [tab, setTab] = useState(0);
  const handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setTab(index);
  };

  // 新規作成ページに遷移
  const handleMoveToNew = () => {
    router.push('/orders/new');
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <CssBaseline />
          <main>
            <FlashMessageSystem />
            <ErrorMessage />
            <div className={classes.width}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <h2>案件一覧</h2>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={handleMoveToNew}
                  >
                    <CreateIcon />
                    作成
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    component="form"
                    className={classes.root}
                    onSubmit={handleSearch}
                  >
                    <InputBase
                      className={classes.input}
                      placeholder="案件を検索する"
                      onChange={e => setSearchWord(e.target.value)}
                    />
                    <IconButton type="submit" className={classes.iconButton}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              </Grid>
              <AppBar position="static" color="default">
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  indicatorColor="primary"
                >
                  <Tab label="全案件" />
                  <Tab
                    label="15日請求案件"
                    onClick={() => handleChangePayment('15日')}
                  />
                  <Tab
                    label="20日請求案件"
                    onClick={() => handleChangePayment('20日')}
                  />
                  <Tab
                    label="25日請求案件"
                    onClick={() => handleChangePayment('25日')}
                  />
                  <Tab
                    label="月末請求案件"
                    onClick={() => handleChangePayment('月末')}
                  />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={tab}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={tab} index={0} dir={theme.direction}>
                  <OrderListsTable searchWord={searchWord} />
                </TabPanel>
                <TabPanel value={tab} index={1} dir={theme.direction}>
                  <OrderFifteenList />
                </TabPanel>
                <TabPanel value={tab} index={2} dir={theme.direction}>
                  <OrderTwentyList />
                </TabPanel>
                <TabPanel value={tab} index={3} dir={theme.direction}>
                  <OrderTwentyFiveList />
                </TabPanel>
                <TabPanel value={tab} index={4} dir={theme.direction}>
                  <OrderLastList />
                </TabPanel>
              </SwipeableViews>
            </div>
          </main>
        </div>
      </DndProvider>
    </>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
