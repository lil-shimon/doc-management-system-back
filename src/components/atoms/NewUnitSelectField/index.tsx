import { createStyles, FormControl, Theme } from '@material-ui/core';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      nimWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

type NewUnitSelectProps = { defaultunit: '式' } & typeof defaultProps;
const defaultProps = {
  defaultunit: '式',
};

export default function NewUnitSelectField(props: NewUnitSelectProps) {
  const classes = useStyles();

  const [state, setState] = React.useState<{ unit: string }>({
    unit: '単位',
  });

  const handleChange = (
    event: React.ChangeEvent<{ unit?: string; value: any }>
  ) => {
    const unit = event.target.unit as keyof typeof state;
    setState({
      ...state,
      [unit]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="unit-simple">-</InputLabel>
        <Select
          native
          value={state.unit}
          onChange={handleChange}
          inputProps={{
            name: 'state.unit',
            id: 'unit-simple',
          }}
        >
          <option area-label="state.unit" value="state.unit" />
          <option value={1}>式</option>
          <option value={2}>カ月</option>
          <option value={3}>個</option>
          <option value={4}>枚</option>
        </Select>
      </FormControl>
    </div>
  );
}
