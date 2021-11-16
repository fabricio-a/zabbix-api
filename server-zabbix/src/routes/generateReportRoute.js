import { Router } from 'express'
import Zabbix from '../zabbix/zabbixConnect'

const generateReportRoute = Router()

async function getDataFromZabbix(res, reqType, hostGetParams) {
    try {
        const zabbix = Zabbix()

        await zabbix.login()

        const response = await zabbix.request(reqType, hostGetParams)

        await zabbix.logout()

        res.send(response)

    } catch(error) {
        console.log(error)
        res.json({
            error: 'An error occured!'
        })

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

    getDataFromZabbix(res, 'host.get', hostGetParams)
})

generateReportRoute.get('/grouphosts', (req, res) =>  getDataFromZabbix(res, 'hostgroup.get', {
    output: 'extend'
}))

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

    getDataFromZabbix(res, 'graph.get', graphsGetParams)
})

generateReportRoute.get('/history', (req, res) => {
    let {
        hostids,
/*         time_from,
        time_till */
    } = req.query

    hostids = hostids.split(',').map(host => parseInt(host))

    let historyGetParams = {
        history: 0,
        output: 'extend',
        sortfield: 'clock',
        hostids,
/*         time_from,
        time_till,
        limit: 10 */
    }

    console.log(historyGetParams)

    getDataFromZabbix(res, 'history.get', historyGetParams)
})

export default generateReportRoute