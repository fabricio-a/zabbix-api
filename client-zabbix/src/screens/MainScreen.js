import * as React from 'react'
import { Button, Grid }  from '@mui/material'
import logo from '../assets/logo-roost.png'
import MySelect from '../components/MySelect'
import DateTimeSelect from '../components/DateTimeSelect'
import DraggableItem from '../components/DraggableItem'
import TocIcon from '@mui/icons-material/Toc'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import SimpleChart from '../components/SimpleChart'

import AcUnitIcon from '@mui/icons-material/AcUnit'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import RefreshIcon from '@mui/icons-material/Refresh'
import SettingsIcon from '@mui/icons-material/Settings'

import Report from './report'
import './MainScreen.css'

import html2canva from 'html2canvas'
import jsPDF from 'jspdf'

const report = Report()

export default function MainScreen() {
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
    const [openModal, setOpenModal] = React.useState(false)
    const [modalItem, setModalItem] = React.useState('')

    const TextMenu = () => {
        return (
            <div className='menuText'>
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
                    selectHandler={(e) => setTextSizeSelect(e.target.value)} 
                />

                <TextField 
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                />

                <Button className='bt' variant='contained' color='primary' 
                    onClick={() => {
                        setReportData([ ...reportData, {label: 'Arraste...', value: textInput}])
                    }}>
                    Adicionar Texto
                </Button>
        </div>
        )
    }

    const DataMenu = () => {
        return (
            <div className='form'>
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
    
            <Button className='bt' variant='contained' color='primary' onClick={generateReport}>
                Buscar Dados
            </Button>
    
    {/*                             <Button className='bt' variant='contained' color='primary' onClick={getPDF}>
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
        <div className='root'>
            <header>
                <div className='title'>
                    <h2>Report Generator</h2>
                    <img src={logo} className='logo'></img>
                </div>
                <div>
                    <IconButton>
                        <SettingsIcon color='primary'/>
                    </IconButton>
                    <IconButton>
                        <SaveIcon color='primary'/>
                    </IconButton>
                    <IconButton>
                        <PictureAsPdfIcon color='primary'/>
                    </IconButton>
                    <IconButton>
                        <RefreshIcon color='primary'/>
                    </IconButton>
                </div>
            </header>

            <div className='pdfArea' id='pdfArea'>
                <div>
                    <IconButton onClick={() => {setOpenModal(true);setModalItem('text')}}>
                        <TextFieldsIcon />
                    </IconButton>

                    <IconButton onClick={() => {setOpenModal(true);setModalItem('graph')}}>
                        <InsertChartIcon />
                    </IconButton>

                    <IconButton onClick={() => {setOpenModal(true);setModalItem('table')}}>
                        <TocIcon />
                    </IconButton>
                </div>
                                    
                <Dialog
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                >
                    {
                        modalItem === 'text' ? <TextMenu /> :
                        modalItem === 'graph' ? <DataMenu /> :
                        modalItem === 'table' ? <DataMenu /> : "Ops!"
                    }
                </Dialog>
                
                <div className='dados'>
                    <DraggableItem label='Grafico que exemploifica aluma coisa'>
                        <SimpleChart />
                    </DraggableItem>

                    {reportData.map(reportElement =>
                        <DraggableItem label={reportElement.label}>
                            {reportElement.value}
                        </DraggableItem>
                    )}
                </div>
            </div>
        </div>
    )
}