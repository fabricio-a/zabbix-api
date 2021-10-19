import { Router } from 'express'
import Zabbix from 'zabbix-promise'

const generateReportRoute = Router()

generateReportRoute.get('/hosts', async (req, res) => {
    let hostGetParams = {}

    if(req.query.id !== undefined) {
        hostGetParams = {
            filter: {
                host: req.query.id
            },
            limit: 1000
        }
    } else {
        hostGetParams = {
            limit: 1000
        }
    }

    const zabbixConfig = {
        url: 'http://172.16.100.245/api_jsonrpc.php',
        user: 'Admin',
        password: 'zabbix'
    }

    const zabbix = new Zabbix(zabbixConfig)

    try {
        await zabbix.login()

        const host = await zabbix.request('host.get', hostGetParams)

        res.json(host)
        zabbix.logout()

    } catch(error) {
        console.log(error)
        res.json(error)
    }
})

generateReportRoute.get('/dashboard', async (req, res) => {
    let hostGetParams = {}

    if(req.query.id !== undefined) {
        hostGetParams = {
            filter: {
                host: req.query.id
            },
            limit: 1000
        }
    } else {
        hostGetParams = {
            limit: 1000
        }
    }

    const zabbixConfig = {
        url: 'http://172.16.100.245/api_jsonrpc.php',
        user: 'Admin',
        password: 'zabbix'
    }

    const zabbix = new Zabbix(zabbixConfig)

    try {
        await zabbix.login()

        const host = await zabbix.request('dashboard.get', hostGetParams)

        res.json(host)
        zabbix.logout()

    } catch(error) {
        console.log(error)
        res.json(error)
    }
})

generateReportRoute.get('/template', async (req, res) => {
    let hostGetParams = {}

    if(req.query.id !== undefined) {
        hostGetParams = {
            filter: {
                host: req.query.id
            },
            limit: 1000
        }
    } else {
        hostGetParams = {
            limit: 1000
        }
    }

    const zabbixConfig = {
        url: 'http://172.16.100.245/api_jsonrpc.php',
        user: 'Admin',
        password: 'zabbix'
    }

    const zabbix = new Zabbix(zabbixConfig)

    try {
        await zabbix.login()

        const host = await zabbix.request('template.get', hostGetParams)

        res.json(host)
        zabbix.logout()

    } catch(error) {
        console.log(error)
        res.json(error)
    }
})



export default generateReportRoute