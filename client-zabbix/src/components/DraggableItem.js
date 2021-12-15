import React from 'react'
import Draggable, {DraggableCore} from 'react-draggable'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
    box: {
        border: '1px solid black',
        borderRadius: '5px',
        width: '80%'
    },

    drag: {
        textAlign: 'center',
        backgroundColor: '#595959',
        height: '25px',
        cursor: 'crosshair'
    }
})

export default function DraggableItem(props) {
    const classes = useStyle()

    return (
            <Draggable
                handle='.handle'
            >
                <div className={classes.box}> 
                    <div className={`handle ${classes.drag}`}>{props.label}</div>
                    {props.children}
                </div>
            </Draggable>
    )
}