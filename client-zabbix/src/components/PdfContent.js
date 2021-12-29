import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { removeGraph } from '../store/reportArea/reportSlice'

import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'

const useStyle = makeStyles({
    box: {
        border: '1px solid black',
        borderRadius: '5px',
        width: '80%',
        overflow: 'hidden'
    },

    drag: {
        textAlign: 'center',
        height: '25px',
        color: 'white'
    }
})

export default function PdfContent(props) {
    const classes = useStyle()

    return (
        <div className={classes.box}> 
            <div className={`handle ${classes.drag}`}>
                {props.label}
            </div>
            {props.children}
        </div>
    )
}