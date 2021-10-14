import * as React from 'react'
import './mainScreen.css'
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';

export default function MainScreen() {
    const [allHosts, setHosts] = React.useState([])
    const [formState, setFormState] = React.useState({
        hosts: []
    })

    React.useEffect(() => {
        fetch('http://localhost:4444/generate-report/hosts')
            .then(res => res.json())
            .then(hosts => {
                setHosts(hosts)

                console.log(hosts)
            })
    }, [])

    return (
        <div className='mainScreen'>
            <h2>Report Generator Roost</h2>

        </div>
    )
}