import * as React from 'react'
import { Button, Grid }  from '@mui/material'
import logo from '../assets/logo-roost.png'
import { makeStyles } from '@material-ui/styles'
import MySelect from '../components/MySelect'

import html2canva from 'html2canvas'
import jsPDF from 'jspdf'

const useStyle = makeStyles({
    root: {
        color: '#fff',
    },

    logo: {
        height: '20px',
        margin: '10px'
    },

    data: {
        boxSizing: 'border-box',
        backgroundColor: 'rgb(0,240,0)',
        color: 'black',
        width: '100%',
        height: '95vh',
        padding: '10px',
        margin: '10px',
        boder: 'solid 1px white',
        borderRadius: '5px',
        overflowY: 'scroll'
    },

    menu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '300px'
    }
})

export default function MainScreen() {
    const classes = useStyle()

    const proxyName = {
        10447: 'Brasília',
        10481: 'São Paulo',
        0: 'Curitiba'
    }

    const [allHosts, setHosts] = React.useState([])
    const [hostSelect, setHostSelect] = React.useState('none')

    const getPDF = () => {
        const input = document.getElementById('pdfArea')
        input.style.height = '100%'
        
        html2canva(input)
            .then(canva => {
                const imgData = canva.toDataURL('image/png')
                input.style.height = '95vh'
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'in', 
                    format: [14,10]
                })
                pdf.addImage(imgData, 'JPEG', 0, 0)
                pdf.addPage()
                pdf.addImage(imgData, 'JPEG', 0, 0)
                pdf.save('report.pdf')
            })
    }

    const getHosts = () => {
        fetch('http://172.16.10.65:4444/generate-report/hosts')
            .then(res => res.json())
            .then(hosts => {
                setHosts(hosts)
                console.log(hosts)
            })
    }

    React.useEffect(() => {
        getHosts()
    }, [])

    return (
        <div className={classes.root}>
            <Grid 
                container 
                spacing={2}
                direction='row'
                justifyContent='center'
                alignItems='stretch'
            >
                <Grid item container spacing={3} xs={5} direction='column' alignItems='center' justifyContent='center'>
                    <Grid item>
                        <div className={classes.menu}>
                            <h2>Report Generator</h2>
                            <img src={logo} className={classes.logo}></img>
                        </div>
                    </Grid>

                    <Grid item>
                        <div className={classes.form}>
                            <MySelect 
                                id='host-select'
                                label='Host'
                                data={allHosts.map(host =>{ return {value: host.hostid, label: host.host} })}
                                hostSelect={hostSelect}
                                setHostSelect={(e) => setHostSelect(e.target.value)}    
                            />

                            <Button variant='contained' color='primary' onClick={getHosts}>
                                Gerar Relatório
                            </Button>
    
                            <Button variant='contained' color='primary' onClick={getPDF}>
                                Gerar PDF
                            </Button>
                        </div>
                    </Grid>
                </Grid>

                <Grid item container xs={7}>
                    <div className={classes.data} id='pdfArea'>
{/*                         {
                            allHosts.map(host => 
                                <p key={host.hostid}>{host.hostid} - {host.host} - {proxyName[host.proxy_hostid]}</p>    
                            )
                        } */}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}