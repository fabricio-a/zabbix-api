import express from 'express'
import cors from 'cors'
import serverRoutes from './routes'
import 'dotenv/config'

const server = express()

server.use(express.json())
server.use(cors())
server.use(serverRoutes)

const SERVER_PORT = process.env.SERVER_PORT

server.listen(SERVER_PORT, () => {
    console.log(`
        O SEU SERVIDOR ESTÁ NO AR...
        Porta hhtp: ${SERVER_PORT}
    `)
})