import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addGraph } from '../../store/reportArea/reportSlice'
import MySelect from './MySelect'
import { Button } from '@mui/material'
import DateTimeSelect from './DateTimeSelect'
import Report from '../../requests/report'

import './DataMenu.css'

const report = Report()

export default function DataMenu () {
    const [allHosts, setHosts] = useState([])
    const [allHostGroup, setHostGroup] = useState([])
    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTill, setDateTill] = useState(new Date())
    const [hostSelect, setHostSelect] = useState([])
    const [hostGroupSelect, setHostGroupSelect] = useState([])
    const [graphsSelect, setGraphsSelect] = useState([])
    const [allGraphs, setAllGraphs] = useState([])

    const dispatch = useDispatch()

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

    const addData = dados => {
        console.log(dados.response)
        dispatch(addGraph(dados.response))
    }

    const generateReport = () => {
        report
            .getHistory(
                Math.trunc(dateFrom.getTime()/1000), 
                Math.trunc(dateTill.getTime()/1000),
                graphsSelect
            )
            .then(dados => addData(dados))
    }

    useEffect(() => {
        getHosts()
        getGroupHosts()
        getGraphs()
    }, [])

    useEffect(() => {
        getHosts()
        getGraphs()
    }, [hostGroupSelect])

    useEffect(() => {
        getGraphs()
    }, [hostSelect])

    return (
        <div className='formulario'>
            <MySelect 
                id='hostgroup-select'
                label='Grupos de Hosts'
                multiple={false} check={false}
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
        </div>
    )
}