import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  Grid,
  TableContainer,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core';
import { MaintenanceStats } from '../../components/atoms/MantenanceBadge';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  getListLastMonth,
  getListMaintenance,
  getListThisMonth,
  getListTwoMonthAgo,
} from '../../redux/selectors/maintenance';
import {
  getLastMonth,
  getMaintenance,
  getThisMonth,
  getTwoMonthAgo,
} from '../../redux/slicers/maintenance';
import { MaintenanceLists } from '../../components/organisms/MaintenanceList';
import Loading from '../../components/molecules/Loading';
import FlashMessageSystem from '../../components/molecules/FlashSystem';
import ErrorMessage from '../../components/organisms/ErrorMessage';
import useStyles from '../../components/styles/maintenance';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Comparison } from '../../components/atoms/MantenanceBadge/comparison';
import { ThisMonthStats } from '../../components/atoms/MantenanceBadge/thisMonthStats';
import CreateIcon from '@material-ui/icons/Create';

// 対比
export const calcPercentage = (num1: number, num2: number) => {
  if (num1 > num2) {
    return Math.floor((num1 / num2) * 100);
  } else if (num2 > num1) {
    return Math.floor((num2 / num1) * -100);
  } else {
    return 0;
  }
};

export default function MaintenanceList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [Maintenances, setMaintenances] = useState();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState<boolean>();

  const maintenances = useSelector(getListMaintenance, shallowEqual);
  const thisMonth = useSelector(getListThisMonth, shallowEqual);
  const lastMonth = useSelector(getListLastMonth, shallowEqual);
  const twoMonthAgo = useSelector(getListTwoMonthAgo, shallowEqual);

  const thisMonthWorkingHours: number[] = thisMonth.map<number>(p => {
    return p.working_hours;
  });

  const lastMonthWorkingHours: number[] = lastMonth.map<number>(p => {
    return p.working_hours;
  });

  const twoMonthAgoWorkingHours: number[] = twoMonthAgo.map<number>(p => {
    return p.working_hours;
  });

  let sumThisWorkingHours = thisMonthWorkingHours.reduce(function(a, b) {
    return a + b;
  }, 0);
  let sumLastWorkingHours = lastMonthWorkingHours.reduce(function(a, b) {
    return a + b;
  }, 0);

  let sumTwoMonthWorkingHours = twoMonthAgoWorkingHours.reduce(function(a, b) {
    return a + b;
  }, 0);

  const comparison = sumTwoMonthWorkingHours - sumLastWorkingHours;

  const comparisonPercentage = calcPercentage(
    sumTwoMonthWorkingHours,
    sumLastWorkingHours
  );

  const swapList = useCallback(
    (sourceIndex: number, targetIndex: number) => {
      //@ts-ignore
      [Maintenances[targetIndex], Maintenances[sourceIndex]] = [
        //@ts-ignore
        Maintenances[sourceIndex],
        //@ts-ignore
        Maintenances[targetIndex],
      ];
      //@ts-ignore
      setMaintenances(Maintenances.splice(0));
    },
    [Maintenances]
  );

  useEffect(() => {
    const initial = async () => {
      await dispatch(getMaintenance()),
        await dispatch(getThisMonth()),
        await dispatch(getLastMonth()),
        await dispatch(getTwoMonthAgo()),
        await setLoading(false);
    };
    initial();
  }, []);

  useEffect(() => {
    const func = async () => {
      await setLoading(true);
      //@ts-ignore
      await setMaintenances(maintenances);
      await setLoading(false);
    };
    func();
  }, [maintenances]);

  useEffect(() => {
    const func = async () => {
      await dispatch(getMaintenance()),
        await dispatch(getThisMonth()),
        //@ts-ignore
        await setMaintenances(maintenances),
        await setLoading(false);
      await setReload(false);
      console.log('reload await is called');
    };
    func();
  }, [reload]);

  // state handler
  const handleChangeMaintenances = (key: string, value: any, id: number) => {
    setMaintenances(prev => {
      //@ts-ignore
      return prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            [key]: value,
          };
        }
        return item;
      });
    });
  };

  //reload handler
  const handleReload = () => {
    setReload(true);
  };

  return loading ? (
    <React.Fragment>
      <Loading />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <DndProvider backend={HTML5Backend}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className={classes.box}>
            <FlashMessageSystem />
            <ErrorMessage />
            <a>
              <h2 className={classes.titleMargin}>メンテナンス一覧</h2>
              <Button
                variant="contained"
                color="primary"
                className={classes.createButton}
              >
                <CreateIcon />
                作成
              </Button>
            </a>
            <a className={classes.statsMargin}>
              <ThisMonthStats title={'今月'} cost={sumThisWorkingHours} />
            </a>
            <a>
              <Comparison
                title={'対比'}
                price={comparison}
                percentage={calcPercentage(
                  sumTwoMonthWorkingHours,
                  sumLastWorkingHours
                )}
              />
              <div className={classes.box}>
                <MaintenanceStats title={'先月'} cost={sumLastWorkingHours} />
                <MaintenanceStats
                  title={'先々月'}
                  cost={sumTwoMonthWorkingHours}
                />
              </div>
            </a>
          </div>
          <TableContainer component={Paper} className={classes.TableContainer}>
            <Table stickyHeader size="small" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>日付</TableCell>
                  <TableCell>件名</TableCell>
                  <TableCell>現場住所</TableCell>
                  <TableCell align="right" className={classes.workingHours}>
                    作業時間
                  </TableCell>
                  <TableCell>合計金額</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {/* @ts-ignore */}
                {Maintenances.map((m, index) => (
                  <MaintenanceLists
                    date={m.date}
                    title={m.title}
                    address={m.address}
                    note={m.note}
                    working_hours={m.working_hours}
                    id={m.id}
                    handleChangeMaintenances={handleChangeMaintenances}
                    index={index}
                    key={index}
                    swapList={swapList}
                    count={m.count}
                    handleReload={handleReload}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MuiPickersUtilsProvider>
      </DndProvider>
    </React.Fragment>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
