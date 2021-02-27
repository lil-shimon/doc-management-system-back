import React from 'react'
import { makeStyles } from '@material-ui/core'

import TextField from '@material-ui/core/TextField'

const UseStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '90%',
        }
    }
})
)

export default function TextFieldAgreement () {
    const classes = UseStyles()
    return (
        <form className={classes.root} >
            <TextField 
                id="title-input"
                label="契約条件"
                defaultValue=""
            />
        </form>
    )
}
