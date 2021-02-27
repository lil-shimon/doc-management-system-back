import React, { FC } from 'react'
import { Grid, Typography, Button, } from '@material-ui/core'
import useStyles from './style'

export const AttachmentNew: FC<{
  file_path: any
}> = ({ file_path }) => {
  const classes = useStyles()
  return (
    <div className={classes.files}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Typography>その他</Typography>
          <Typography>添付ファイル</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            component="label"
            variant="outlined"
            color="primary"
          >
            upload
                <input
              value={file_path}
              type="file"
              className={classes.inputFileBtnHide}
            />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            component="label"
            variant="outlined"
            color="primary"
          >
            upload
                <input
              type="file"
              value={file_path}
              className={classes.inputFileBtnHide}
            />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            component="label"
            variant="outlined"
            color="primary"
          >
            upload
                <input
              type="file"
              value={file_path}
              className={classes.inputFileBtnHide}
            />
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
