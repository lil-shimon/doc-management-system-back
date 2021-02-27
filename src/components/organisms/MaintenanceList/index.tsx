import React, { FC, useRef, useState } from 'react';
import {
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  TextareaAutosize,
  TextField,
} from '@material-ui/core';
import { editMaintenance } from '../../../redux/slicers/maintenance';
import { useDispatch } from 'react-redux';
import { addSeparator } from '../preview/preview';
import SaveIcon from '@material-ui/icons/Save';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { useDrag, useDrop } from 'react-dnd';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import useStyles from './style';

export const MaintenanceLists: FC<{
  date: Date;
  title: string;
  address: string;
  note: string;
  working_hours: string;
  id: number;
  handleChangeMaintenances: any;
  index: number;
  count: number;
  swapList: (sourceIndex: number, targetIndex: number) => void;
  handleReload: any;
}> = ({
  date,
  title,
  address,
  note,
  working_hours,
  id,
  handleChangeMaintenances,
  index,
  swapList,
  count,
  handleReload,
}) => {
  interface DragItem {
    type: string;
    index: number;
  }
  const DND_GROUP = 'list';
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  //@ts-ignore
  const total_cost = working_hours * 3000;
  const classes = useStyles();
  //@ts-ignore
  const ref = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop({
    accept: DND_GROUP,
    drop(item: DragItem) {
      if (!ref.current || item.index === index) {
        return;
      }
      swapList(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type: DND_GROUP, index },
  });
  drag(drop(ref));

  const handleSubmit = async () => {
    await dispatch(
      editMaintenance(id, date, title, address, note, working_hours, count)
    );
    await handleReload();
  };

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <TableRow ref={ref}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            {count}
          </IconButton>
        </TableCell>
        <TableCell>
          <KeyboardDateTimePicker
            disableToolbar
            format="MM/dd hh時mm分"
            onChange={e => handleChangeMaintenances('date', e, id)}
            ampm={false}
            value={date}
            variant="inline"
          />
        </TableCell>

        <TableCell>
          <TextField
            className={classes.textField}
            value={title}
            onChange={e =>
              handleChangeMaintenances('title', e.target.value, id)
            }
          />
        </TableCell>

        <TableCell>
          <TextField
            className={classes.address}
            value={address}
            onChange={e =>
              handleChangeMaintenances('address', e.target.value, id)
            }
          />
        </TableCell>

        <TableCell align="right">
          <TextField
            type="number"
            value={working_hours}
            onChange={e =>
              handleChangeMaintenances('working_hours', e.target.value, id)
            }
            className={classes.workingHours}
          />
        </TableCell>

        <TableCell>¥{addSeparator(total_cost)}</TableCell>

        <TableCell>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            <SaveIcon />
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={13} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TextareaAutosize
              className={classes.note}
              rowsMin={3}
              value={note}
              onChange={e =>
                handleChangeMaintenances('note', e.target.value, id)
              }
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
