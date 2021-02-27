import { createStyles, FormControl, Theme } from '@material-ui/core'
import React from 'react'

import {makeStyles} from "@material-ui/core/styles"
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        }
    })
)

export default function NewTaxSelectField() {

    const classes = useStyles()

    const [ state, setState] = React.useState<{name: string}>({
        name: "-",
    })

    const handleChange = (event: React.ChangeEvent<{name?: string; value: any}>) => {
        const name = event.target.name as keyof typeof state
        setState({
            ...state,
            [name]: event.target.value,
        })
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="unit-simple">-</InputLabel>
                <Select 
                    native
                    value={state.name}
                    onChange={handleChange}
                    inputProps={{
                        name: 'name',
                        id: 'unit-simple',
                    }}
                >
                    <option area-label="none" value="" />
                    <option value={1}>10%</option>
                    <option value={2}>8%</option>
                    <option value={3}>5%</option>
                    <option value={4}>対象外</option>
                </Select>
            </FormControl>
        </div>
    )
}