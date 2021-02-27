import React, { FC, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import useStyles from '../../organisms/OrderNew/style';

export const InputFile: FC<{ file: any; handleChangeFile: any }> = ({
  file,
  handleChangeFile,
}) => {
  const [fileName, setFileName] = useState('未選択');

  const classes = useStyles();

  useEffect(() => {
    if (file !== null) {
      setFileName(file.name);
    }
  }, [file]);
  const handleChangeFileName = (e: any) => {
    setFileName(e.target.value);
  };
  return (
    <React.Fragment>
      <Button component="label" variant="outlined" color="primary">
        <input
          type="file"
          className={classes.inputFileBtnHide}
          onChange={e => handleChangeFile(e)}
        />
        ファイルを選択
      </Button>
      <p className={classes.fontEight}>{fileName}</p>
    </React.Fragment>
  );
};
