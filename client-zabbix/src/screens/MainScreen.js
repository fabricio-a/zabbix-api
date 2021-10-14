import * as React from 'react'
import './mainScreen.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MainScreen() {
    const [hosts, setHosts] = React.useState([])

    return (
        <div>
            <h2>Report Generator Roost</h2>
        </div>
    )
}