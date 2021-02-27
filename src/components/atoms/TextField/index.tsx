import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'

import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .Mui,TextField-root' : {
                margin: theme.spacing(1),
                width: '25ch'
            }
        }
    })
)

interface TextFieldProps {
    id: string
    label: string
    defaultValue: string
}

export default function TextFieldBasic (props: TextFieldProps) {
    const classes = useStyles()
    return (
        <form className={classes.root} >
            <TextField
            />
        </form>
    )
}

export function TorihikiField (props: TextFieldProps) {
    const classes = useStyles() 
    return (
        <form className={classes.root}>
            <TextField 
                id={"input-torihikisaki"}
                label={"取引先名"}
                defaultValue={""}
            />
        </form>
    )
}

// export const TextFieldBasic: React.FC<TextFieldProps> = ({
//     children,
//     id,
//     label,
//     defaultValue
// }) => {
//     const classes = useStyles()

//     return (
//         <form className={classes.root}>
//             <TextField />
//         </form>
//     )
// }