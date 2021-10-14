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

        console.log(hostGetParams)

        const host = await zabbix.request('host.get', hostGetParams)

        res.json(host)
        zabbix.logout()

    } catch(error) {
        console.log(hostGetParams)
        res.json(error)
    }
})

generateReportRoute.get('/', async (req, res) => {
    const { id } = req.query

    if(id) {
        const relatorio = 'ISSO EH UM TESTE - com id '+id

        return res.json(relatorio)
    }

    const relatorio = 'ISSO EH UM TESTE - sem id '

    return res.json(relatorio)
})

generateReportRoute.post('/', async (req, res) => {
    const date = new Date
    const {
        dashboardId,
        hosts,
        abas
    } = req.body

    return res.json({
        message: 'Relatório Gerado com Sucesso!',
        id
    })
})

export default generateReportRoute