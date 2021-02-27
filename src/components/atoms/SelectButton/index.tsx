import React from 'react'
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme: Theme) =>
    createStyles ({
        formControl: {
            margin: theme.spacing(2),
            minWidth: 120
        }
    })
)

interface SelectProps {
    id: string
    label: string
    defaultValue: string
}

export function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export function TitleSelect (props: SelectProps) {
    const classes = useStyles()
    const [state, setState] = React.useState('')

    const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setState (event.target.value as string)
    }

    return (
        <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="title-select-label">敬称</InputLabel>
        <Select
          labelId="title-select-label"
          id="title-simple-select"
          value={state}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        </div>
    )
}

export function StaffSelect (props: SelectProps) {
    const classes = useStyles()
    const [state, setState] = React.useState('')

    const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setState (event.target.value as string)
    }

    return (
        <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="title-select-label">担当者</InputLabel>
        <Select
          labelId="staff-select-label"
          id="staff-select"
          value={state}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        </div>
    )
}
