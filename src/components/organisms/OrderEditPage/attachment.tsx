import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './style';
import { InputFile } from '../../atoms/InputFile';

export const AttachmentEdit: FC<{
  file_path: any;
  file_path_two: any;
  file_path_three: any;
  handleChangeFilePath: any;
  handleChangeFilePathTwo: any;
  handleChangeFilePathThree: any;
}> = ({
  file_path,
  file_path_two,
  file_path_three,
  handleChangeFilePath,
  handleChangeFilePathTwo,
  handleChangeFilePathThree,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.files}>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <p>
            その他
            <br />
            添付ファイル
          </p>
        </Grid>
        <Grid item xs={3}>
          <InputFile file={file_path} handleChangeFile={handleChangeFilePath} />
        </Grid>
        <Grid item xs={3}>
          <InputFile
            file={file_path_two}
            handleChangeFile={handleChangeFilePathTwo}
          />
        </Grid>
        <Grid item xs={3}>
          <InputFile
            file={file_path_three}
            handleChangeFile={handleChangeFilePathThree}
          />
        </Grid>
      </Grid>
    </div>
  );
};
