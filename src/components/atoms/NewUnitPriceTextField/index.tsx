import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'

const UseStyles = makeStyles((theme: Theme) => 
    createStyles ({
        root: {
            '& .MuiTextField-root' : {
                margin: theme.spacing(1),
                width: '25ch',
            }
        }
    })
)

export default function NewUnitPriceTextPrice() {
    const classes = UseStyles()

    return (
        <form className={classes.root}>
                <TextField  
                    required
                    name="name"
                    variant="outlined"
                    defaultValue="0"
                />
        </form>
    )
}
