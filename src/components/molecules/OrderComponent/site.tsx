import React, { FC } from 'react'
import { Grid, TextField } from '@material-ui/core'


export const SiteShow: FC<{
  contractedCompany: any
}> = ({ contractedCompany }) => {
  return (
    <React.Fragment>
      <TextField
inputProps={{
  readOnly: true,
}}
variant="outlined"
value={contractedCompany.site_name}
margin="normal"
fullWidth
label="納入先"
/>
<Grid container spacing={2}>
<Grid item xs>
  <TextField
    variant="outlined"
    margin="normal"
    fullWidth
    value={contractedCompany.site_representative}
    inputProps={{
      readOnly: true,
    }}
    label="現場担当者"
  />
</Grid>
<Grid item xs>
  <TextField
    variant="outlined"
    value={contractedCompany.mail}
    margin="normal"
    inputProps={{
      readOnly: true,
    }}
    fullWidth
    label="メールアドレス"
  />
</Grid>
</Grid>
<TextField
variant="outlined"
value={contractedCompany.address}
margin="normal"
inputProps={{
  readOnly: true,
}}
fullWidth
label="現場住所"
/>
    </React.Fragment>
  )
}
