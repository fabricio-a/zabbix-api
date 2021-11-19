import { Router } from 'express'
import Zabbix from '../zabbix/zabbixConnect'

const generateReportRoute = Router()

async function getDataFromZabbix(reqType, hostGetParams) {
    try {
        const zabbix = Zabbix()

        await zabbix.login()

        const response = await zabbix.request(reqType, hostGetParams)

        await zabbix.logout()

        return response

    } catch(error) {
        console.log(error)
        return {
            error: 'An error occured!'
        }
    }
}

generateReportRoute.get('/hosts', (req, res) => {
    let {
        groupids
    }  = req.query

    groupids = groupids.split(',').map(host => parseInt(host))

    let hostGetParams = {
        output: 'extend',
        groupids
    }

    getDataFromZabbix('host.get', hostGetParams)
        .then(reponse => res.send(reponse))
        .catch(error => res.json(error))
})

generateReportRoute.get('/grouphosts', (req, res) =>  getDataFromZabbix('hostgroup.get', {
    output: 'extend'
})        
    .then(reponse => res.send(reponse))
    .catch(error => res.json(error))
)

generateReportRoute.get('/graphs', (req, res) =>  {
    let {
        hostids
    } = req.query

    hostids = hostids.split(',').map(host => parseInt(host))
    
    const graphsGetParams = {
        output: 'extend',
        hostids,
        sortfield: 'name'
    }

    getDataFromZabbix('graph.get', graphsGetParams)
        .then(reponse => res.send(reponse))
        .catch(error => res.json(error))
})

generateReportRoute.get('/history', (req, res) => {
    let {
        time_from,
        time_till,
        graphids
    } = req.query

    graphids = graphids.split(',').map(graph => parseInt(graph))

    let allItems = []

    getDataFromZabbix('item.get', { output: 'extend', graphids })
        .then(items => {
            const itemids = items.map(item => parseInt(item.itemid))

            let historyGetParams = {
                output: 'extend',
                sortfield: 'clock',
                itemids,
                time_from,
                time_till
            }

            allItems = items

            return getDataFromZabbix('history.get', historyGetParams)
        })
        .then(response => {
            res.send({ response, allItems })
        })
        .catch(error => res.send(error))
})

export default generateReportRoute