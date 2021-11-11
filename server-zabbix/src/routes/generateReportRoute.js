import { Router } from 'express'
import Zabbix from '../zabbix/zabbixConnect'

const generateReportRoute = Router()

async function getDataFromZabbix(res, reqType, hostGetParams) {
    try {
        const zabbix = Zabbix()

        await zabbix.login()

        const host = await zabbix.request(reqType, hostGetParams)

        await zabbix.logout()

        res.send(host)

    } catch(error) {
        console.log(error)
        res.json({
            error: 'An error occured!'
        })

    }
}

generateReportRoute.get('/hosts', (req, res) => {
    const groupids = req.query.groupids

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
    const {
        hostids
    } = req.query
    
    const graphsGetParams = {
        output: 'extend',
        hostids: [10465,10466],
        sortfield: 'name'
    }

    console.log(graphsGetParams)

    getDataFromZabbix(res, 'graph.get', graphsGetParams)
})

generateReportRoute.get('/history', (req, res) => {
    const {
        hostids,
        time_from,
        time_till
    } = req.query

    let historyGetParams = {
        output: 'extend',
        sortfield: 'clock',
/*         hostids,
        time_from,
        time_till, */
        limit: 10
    }

    getDataFromZabbix(res, 'history.get', historyGetParams)
})

export default generateReportRoute