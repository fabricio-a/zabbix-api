import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyle = makeStyles({
    formControl: {
        margin: 1,
        minWidth: 120,
    },
    select: {
        color: 'rgb(255,255,255)',
        width: '240px'
    }
})

export default function MySelect(props) {
    const classes = useStyle()

    const {
        id,
        label,
        data,
        selectValue,
        selectHandler
     } = props
    return(

        <FormControl className={classes.formControl}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                label={label}
                labelId={id}
                id={id+'-select'}
                value={selectValue}
                onChange={selectHandler}
                multiple
                className={classes.select}
            >
                <MenuItem value="-1">
                    Todos
                </MenuItem>
                {
                    data.map(element => <MenuItem value={element.value}>{element.label}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}