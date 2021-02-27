import { createStyles, Theme, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '50%',
            height: '50%',
            marginLeft: '50%'
        }
    })
)

export default function Logo () {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <p>ここには会社のロゴが入ります</p>
        </div>
    )
}