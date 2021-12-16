import { React, useState, useEffect } from 'react'
import logo from '../assets/logo-roost.png'
import DraggableItem from '../components/DraggableItem'
import Dialog from '@mui/material/Dialog'
import SimpleChart from '../components/charts/SimpleChart'
import Report from '../requests/report'
import TextMenu from '../components/menu/TextMenu'
import DataMenu from '../components/menu/DataMenu'
import { useSelector, useDispatch } from 'react-redux'
import './MainScreen.css'
import html2canva from 'html2canvas'
import jsPDF from 'jspdf'

import TocIcon from '@mui/icons-material/Toc'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import RefreshIcon from '@mui/icons-material/Refresh'
import SettingsIcon from '@mui/icons-material/Settings'

const report = Report()

export default function MainScreen() {
    const [reportData, setReportData] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [modalItem, setModalItem] = useState('')

    const graphsElements = useSelector(state => state.report.graphs)
    const textsElements = useSelector(state => state.report.texts)
    const tablesElements = useSelector(state => state.report.tables)

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
                    {textsElements.map(textElement =>
                        <DraggableItem label={'Clique para arrastar...'}>
                            {textElement}
                        </DraggableItem>
                    )}

                    {graphsElements.map(graphElement =>
                        <DraggableItem label={'Clique para arrastar...'}>
                            <SimpleChart
                                
                            />
                        </DraggableItem>
                    )}
                </div>
            </div>
        </div>
    )
}