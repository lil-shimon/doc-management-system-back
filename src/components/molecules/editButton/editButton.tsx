import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

export default function editButton() {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary">
        編集
      </Button>
    </div>
  );
}
