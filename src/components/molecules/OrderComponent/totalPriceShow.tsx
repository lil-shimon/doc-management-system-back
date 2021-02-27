import React, { FC } from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from '../../organisms/OrderShowPage/style';
import { addSeparator } from '../../organisms/preview/preview';

export const TotalPriceShow: FC<{
  total_price: number | null 
}> = ({ total_price }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs>
          <div className={classes.totalPrice}>
            <h4>税込金額</h4>
            <p className={classes.yen}>
              {addSeparator(total_price)}
              円</p>
          </div>
        </Grid>
        <Grid item xs>
       </Grid>
      </Grid>
    </React.Fragment>
  )
}
