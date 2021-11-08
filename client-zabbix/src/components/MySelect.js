import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyle = makeStyles({
    formControl: {
        margin: 1,
        minWidth: 120,
    }
})

export default function MySelect(props) {
    const classes = useStyle()

    const {
        id,
        label,
        data,
        hostSelect,
        setHostSelect
     } = props
    return(

        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                id={id+'-select'}
                value={hostSelect}
                onChange={setHostSelect}
            >
                <MenuItem value="none">
                    <em>None</em>
                </MenuItem>
                {
                    data.map(element => <MenuItem value={element.value}>{element.label}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}