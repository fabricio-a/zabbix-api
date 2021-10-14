import express, { Router } from 'express'
import generateReportRoute from './generateReportRoute'
import path from 'path'

const clientPath = path.resolve(__dirname, '..', '..', 'statics')

const serverRoutes = Router()

serverRoutes.use('/generate-report', generateReportRoute)
serverRoutes.use('/report', express.static(clientPath))

export default serverRoutes