import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'

import { Token } from '../global/token'
import { loggerService } from '../global/logger'

export class tokenMiddleware {

    private static privateKey: string = "auth-random" // get privateKey trough .env

    public static Verify (req: Request, res: Response, next: NextFunction) {
        if (!req.body.token) res.redirect('/Login')
        else {
            const verify: boolean = jwt.verify(req.body.token, this.privateKey) // should not be in req.body.token

            if (verify === true) next()
            else res.redirect('/Login')
        }
    }

    // middleware
    public static async updatePath (req: Request, res: Response, next: NextFunction) {
        try {
            // prevent ../../ exploit with RegEx

            const token: any = jwt.decode(req.body.token) // should not be in req.body.token
    
            const username: string = token.username
            const path: string = req.body.path

            req.body.path = `projects/${username}/${path}`

            next()
        } catch (err) {
            return err
        }
    }

}

export class rateLimiter {

    public static globalLimiter = rateLimit({
        windowMs: 1 * 60 * 1000, // first number = minutes
        max: 70,
        message: 'Something went wrong, please try again later'
    })

    public static authLimiter = rateLimit({
        windowMs: 1 * 60 * 1000, // first number = minutes
        max: 70,
        message: 'Something went wrong, please try again later'
    })

} 
