import { Router } from 'express'
import Zabbix from '../zabbix/zabbixConnect'

const generateReportRoute = Router()

generateReportRoute.get('/hosts', async (req, res) => {
    const reqType = 'host.get'
    let hostGetParams = {
        output: 'extend',
        
    }

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
})

export default generateReportRoute