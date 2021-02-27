import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from 'next/link';
import { createStyles, Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
    },
    btn: {
      textDecoration: 'none',
      backGroundColor: 'blue',
      marginLeft: '10px',
    },
  })
);

export default function CreateDocumentBodyContentButton() {
  const classes = useStyles();

  return (
    <div>
      <ButtonGroup variant="contained">
        <Link href="/documents/mitsumori">
          <a className={classes.link}>
            <Button color="secondary">キャンセル</Button>
          </a>
        </Link>
        <Link href="/preview">
          <a className={classes.btn}>
            <Button color="primary">プレビュー</Button>
          </a>
        </Link>
        <Link href="/documents/mitsumori">
          <a className={classes.btn}>
            <Button color="primary">保存</Button>
          </a>
        </Link>
      </ButtonGroup>
    </div>
  );
}
