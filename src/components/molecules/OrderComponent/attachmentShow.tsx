import React, { FC, useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from '../../organisms/OrderShowPage/style';
import { fileDisplay } from './orderItem';

export const AttachmentShow: FC<{
  attachment: any;
  id: number;
}> = ({ attachment, id }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs>
          <h4>その他添付ファイル</h4>
        </Grid>
        <Grid item xs={6}>
          {fileDisplay(attachment.file_path)}
        </Grid>
        <Grid item xs={6}>
          {fileDisplay(attachment.file_path_two)}
        </Grid>
        <Grid item xs={6}>
          {fileDisplay(attachment.file_path_three)}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
