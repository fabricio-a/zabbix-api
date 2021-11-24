import * as React from 'react'
import { Button, Grid }  from '@mui/material'
import logo from '../assets/logo-roost.png'
import { makeStyles } from '@material-ui/styles'
import MySelect from '../components/MySelect'
import DateTimeSelect from '../components/DateTimeSelect'
import DraggableItem from '../components/DraggableItem'
import TocIcon from '@mui/icons-material/Toc'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Menu from '@mui/material/Menu'

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
        backgroundColor: '#fff',
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

    menuText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'start',
        height: '200px',
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
    const [textSizeSelect, setTextSizeSelect] = React.useState([])
    const [reportData, setReportData] = React.useState([])
    const [allGraphs, setAllGraphs] = React.useState([])
    const [graphsSelect, setGraphsSelect] = React.useState([])
    const [textInput, setTextInput] = React.useState([])
    const [opDrop, setOpDrop] = React.useState([null, null])

    const open = Boolean(opDrop[0])

    const TextMenu = () => {
        return (
            <div className={classes.menuText}>
                <MySelect 
                id='textSize-select'
                label='Tamanho do texto'
                multiple={false} check={false}
                data={[
                    { value: 'h1', label: 'h1'},
                    { value: 'h2', label: 'h2'},
                    { value: 'h3', label: 'h2'},
                    { value: 'h4', label: 'h4'}
                ]}
                selectValue={textSizeSelect}
                selectHandler={(e) => setTextSizeSelect(e.target.value)} />

                <TextField 
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                />

                <Button className={classes.bt} variant='contained' color='primary' 
                    onClick={() => {
                        let element = document.createElement(textSizeSelect)
                        element.innerHTML = textInput

                        setReportData([ ...reportData, element])
                    }}>
                    Adicionar Texto
                </Button>
        </div>
        )
    }

    const DataMenu = () => {
        return (
            <div className={classes.form}>
            <MySelect 
                id='hostgroup-select'
                label='Grupos de Hosts'
                multiple={true} check={true}
                data={allHostGroup.map(group =>{ return {value: group.groupid, label: group.name} })}
                selectValue={hostGroupSelect}
                selectHandler={(e) => setHostGroupSelect(e.target.value)}    
            />
    
            <MySelect 
                id='host-select'
                label='Hosts'
                multiple={false} check={false}
                data={allHosts.map(host =>{ return {value: host.hostid, label: host.host} })}
                selectValue={hostSelect}
                selectHandler={(e) => setHostSelect(e.target.value)}    
            />
    
            <MySelect 
                id='graphs-select'
                label='Fonte de Dados'
                multiple={false} check={false}
                data={allGraphs.map(graph =>{ return {value: graph.graphid, label: graph.name} })}
                selectValue={graphsSelect}
                selectHandler={(e) => setGraphsSelect(e.target.value)} 
            />
    
            <DateTimeSelect value={dateFrom} label='Data Inicial' handleChange={(date) => setDateFrom(date)}/>
            <DateTimeSelect value={dateTill} label='Data Final' handleChange={(date) => setDateTill(date)}/>
    
            <Button className={classes.bt} variant='contained' color='primary' onClick={generateReport}>
                Buscar Dados
            </Button>
    
    {/*                             <Button className={classes.bt} variant='contained' color='primary' onClick={getPDF}>
                Gerar PDF
            </Button> */}
        </div>
        )
    }

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
                setHosts(hosts)
            })
    }

    const getGroupHosts = () => {
        fetch('http://172.16.10.65:4444/generate-report/grouphosts')
            .then(res => res.json())
            .then(grouphosts => {
                setHostGroup(grouphosts)
            })
    }

    const getGraphs = () => {
        const url = 'http://172.16.10.65:4444/generate-report/graphs?hostids='+hostSelect

        fetch(url)
            .then(res => res.json())
            .then(graph => {
                setAllGraphs(graph)
            })
    }

    const addGraph = dados => {
        console.log(dados)

        setReportData([ ...reportData, <div>Dados vieram...</div>])
    }

    const generateReport = () => {
            report
                .getHistory(
                    Math.trunc(dateFrom.getTime()/1000), 
                    Math.trunc(dateTill.getTime()/1000),
                    graphsSelect
                )
                .then(dados => addGraph(dados))
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
                </Grid>

                <Grid item container xs={7}>
                    <div className={classes.data} id='pdfArea'>
                        <div>
                            <IconButton
                                id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(e) => setOpDrop([e.currentTarget, 'textfieldicon'])}
                            >
                                <TextFieldsIcon />
                            </IconButton>
                            <IconButton
                                id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(e) => setOpDrop([e.currentTarget, 'insertcharticon'])}>
                                <InsertChartIcon />
                            </IconButton>
                            <IconButton
                                id="basic-button"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={(e) => setOpDrop([e.currentTarget, 'tocicon'])}>
                                <TocIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={opDrop[0]}
                                open={open}
                                onClose={() => setOpDrop([null, null])}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {opDrop[1] === 'textfieldicon' ? <TextMenu/> : <DataMenu/>}
                            </Menu>
                        </div>

                        {reportData.map(reportElement =>
                            <DraggableItem label='clique aqui...'>
                                {reportElement}
                            </DraggableItem>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}