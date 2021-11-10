import React from 'react'
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/styles'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

const useStyles = makeStyles({
    dt: {
        width: '240px',
        borderRadius: '3px'
    }
})

export default function DateTimeSelect(props) {
    const {
        value,
        handleChange,
        label
    } = props

    const classes = useStyles()

    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                label={label}
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} className={classes.dt}/>}
            /> 
        </LocalizationProvider>
    )
}