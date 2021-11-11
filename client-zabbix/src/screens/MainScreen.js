import * as React from 'react'
import { Button, Grid }  from '@mui/material'
import logo from '../assets/logo-roost.png'
import { makeStyles } from '@material-ui/styles'
import MySelect from '../components/MySelect'
import DateTimeSelect from '../components/DateTimeSelect'

import Report from './report'

import html2canva from 'html2canvas'
import jsPDF from 'jspdf'

const report = Report()

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
        backgroundColor: 'white',
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
        alignItems: 'start',
        height: '450px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px'
    }, 
    
    bt: {
        width: '240px'
    }
})

export default function MainScreen() {
    const classes = useStyle()

    const [allHosts, setHosts] = React.useState([])
    const [allHostGroup, setHostGroup] = React.useState([])
    const [dateFrom, setDateFrom] = React.useState(new Date())
    const [dateTill, setDateTill] = React.useState(new Date())
    const [hostSelect, setHostSelect] = React.useState([])
    const [hostGroupSelect, setHostGroupSelect] = React.useState([])
    const [reportData, setReportData] = React.useState([])
    const [allGraphs, setAllGraphs] = React.useState([])
    const [graphsSelect, setGraphsSelect] = React.useState([])

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
        fetch('http://172.16.10.65:4444/generate-report/hosts?groupids='+hostGroupSelect.toString())
            .then(res => res.json())
            .then(hosts => {
                console.log(hosts)
                setHosts(hosts)
            })
    }

    const getGroupHosts = () => {
        fetch('http://172.16.10.65:4444/generate-report/grouphosts')
            .then(res => res.json())
            .then(grouphosts => {
                //console.log(grouphosts)
                setHostGroup(grouphosts)
            })
    }

    const getGraphs = () => {
        const url = 'http://172.16.10.65:4444/generate-report/graphs?hostids=['+hostSelect.toString()+']'

        fetch(url)
            .then(res => res.json())
            .then(items => {
                console.log('I get the items bitch')
                console.log(items)
                setAllGraphs(items)
            })
    }

    const generateReport = () => {
        report
            .getHistory(hostSelect, dateFrom.getTime(), dateTill.getTime())
            .then((dados) => {
                console.log(dados)
                setReportData(dados)
            })
    }

    React.useEffect(() => {
        getHosts()
        getGroupHosts()
        getGraphs()
    }, [])

    React.useEffect(() => {
        getHosts()
        getGraphs()
    }, [hostGroupSelect])

    React.useEffect(() => {
        getGraphs()
    }, [hostSelect])

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
                                label='Grupos de Hosts'
                                data={allHostGroup.map(group =>{ return {value: group.groupid, label: group.name} })}
                                selectValue={hostGroupSelect}
                                selectHandler={(e) => setHostGroupSelect(e.target.value)}    
                            />

                            <MySelect 
                                id='host-select'
                                label='Hosts'
                                data={allHosts.map(host =>{ return {value: host.hostid, label: host.host} })}
                                selectValue={hostSelect}
                                selectHandler={(e) => setHostSelect(e.target.value)}    
                            />

                            <MySelect 
                                id='items-select'
                                label='Gráficos'
                                data={allGraphs.map(item =>{ return {value: item.itemid, label: item.name} })}
                                selectValue={graphsSelect}
                                selectHandler={(e) => setGraphsSelect(e.target.value)}    
                            />

                            <DateTimeSelect value={dateFrom} label='Data Inicial' handleChange={(date) => setDateFrom(date)}/>
                            <DateTimeSelect value={dateTill} label='Data Final' handleChange={(date) => setDateTill(date)}/>

                            <Button className={classes.bt} variant='contained' color='primary' onClick={generateReport}>
                                Gerar Relatório
                            </Button>
    
                            <Button className={classes.bt} variant='contained' color='primary' onClick={getPDF}>
                                Gerar PDF
                            </Button>
                        </div>
                    </Grid>
                </Grid>

                <Grid item container xs={7}>
                    <div className={classes.data} id='pdfArea'>
                        {
                            reportData.map((report) => <p>{String(report)}</p>)
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}