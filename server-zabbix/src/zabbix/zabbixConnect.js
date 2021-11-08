import axios from 'axios'
import https from 'https'
import 'dotenv/config'

export default function Zabbix() {
    const url = process.env.API_URL
    const user = process.env.API_USR
    const password = process.env.API_PSW
    let auth = null
    
    const post = (method, params = {}) => {
        return axios
            .post(url, {
                jsonrpc: '2.0',
                id: String(Math.random()),
                auth,
                method,
                params
            }, {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            })
    }

    const request = async (method, params = {}) => {
        let response = await post(method, params)
            .then(res => res.data.result)
            .catch(err => err.error)

        return response
    }

    const login = async () => {
        let response = await post('user.login', { user, password })
            .then(res => res.data)
            .catch(err => {
                console.log(err.code)
                return err.data
            })

        if(response.error) throw new Error(response.error.data+response.error.code)

        auth = response.result

        return 'Successfuly authenticated'
    }

    const logout = async() => {
        let response = await post('user.logout')
            .then(res => res.data)
            .catch(err => {
                console.log(err.code)
                return err.data
            })

        if(response.error) throw new Error(response.error.data+response.error.code)

        auth = null

        return 'Successfuly logout'
    }

    return {
        request,
        login,
        logout
    }
}