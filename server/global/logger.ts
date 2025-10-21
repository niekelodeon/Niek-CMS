import fs from 'fs-extra'
import path from 'path'

import { Request, Response, NextFunction} from 'express'
import { LogLevels } from './interfaces'

const logLevels: LogLevels = {
    TRACE: '\x1b[36m',     // cyan
    DEBUG: '\x1b[34m',     // blue
    INFO: '\x1b[32m',      // green
    WARNING: '\x1b[93m',   // light yellow
    ERROR: '\x1b[33m',     // yellow
    FATAL: '\x1b[31m',     // red

    PURPLE: '\x1b[35m',    // purple
    RESET: '\x1b[0m'       // reset 
}

abstract class BaseLogger {

    settings: any

    constructor (settings: any) {
        this.settings = settings
        console.log(settings)
    }
    
    abstract Logger (param_1?: any, param_2?: any, param_3?: any, param_4?: any, param_5?: any, param_6?: any, param_7?: any) 

}

export class MiddlewareLogger extends BaseLogger {
    
    constructor (settings: any) {
        super(settings)
    } 

    Logger (req?: Request, res?: Response, next?: NextFunction) {
        const { method, url, headers, body } = req

        const now: Date = new Date()

        const time: string = `${logLevels.PURPLE} ${String(now.getHours())}:${String(now.getMinutes())} ${logLevels.PURPLE} \t`
        const message = `${method + url + headers + body}`

        const log = time + message + '\n'

        const year: number = now.getFullYear()
        const month: number = now.getMonth() + 1
        const logDir: string = path.join('../server', 'logs/middleware', year.toString(), month.toString())

        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
        
        const filePath: string = path.join(logDir, `${now.getDate()}.log`)
        fs.appendFile(filePath, log)

        next() 
    }

}

export class Logger extends BaseLogger {

    constructor (settings: any) {
        super(settings)
    } 

    Logger (level: keyof LogLevels, username: string, ip: string, route: string, file: string, func: string, message: string) {      
        
        const now: Date = new Date()

        function formatDateTime(date) {
            return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
        }

        const log: string = `${logLevels[level]} [${level}] [${formatDateTime(now)}] | USER: ${username} | IP: ${ip} | ROUTE: ${route} | FILE: ${file} | FUNCTION: ${func} | MESSAGE: ${message} ${logLevels.RESET} \n`
        
        const year: number = now.getFullYear()
        const month: number = now.getMonth() + 1
        const logDir: string = path.join('../server', 'logs/application', year.toString(), month.toString())

        if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })
        
        const filePath: string = path.join(logDir, `${now.getDate()}.log`)
        fs.appendFile(filePath, log)
    }

} 

export let middlewareLogger: MiddlewareLogger

if (middlewareLogger == null)
{
    middlewareLogger = new MiddlewareLogger("MiddlewareLogger running - in derived class")
}

export let loggerService: Logger

if (loggerService == null)
{
    loggerService = new Logger("Logger running - in derived class")
}