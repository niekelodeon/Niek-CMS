import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export class Token {

    public static Create (id: number, email: string) {
        try {
            const privateKey: string = process.env.privateKey

            const currentTime: number = Math.floor(Date.now() / 1000)
            const tenDaysInMs = 8640000
            const expirationTime: number = currentTime + tenDaysInMs

            const claims = {
                'exp': expirationTime, 
                'iat': currentTime, 
                'iss': String(process.env.websiteName), 
                'id': id,
                'email': email 
            }

            const token = jwt.sign(claims, privateKey, { algorithm: 'HS256' })

            return token
        } catch (err) {
            return err
        }
    }

    // public static getLoad (token: string) {
    //     const decoded: string = jwt.decode(token)
    //     return decoded
    // }

    public static Verify (token: string) {
        if (!token) return false
        else {
            const verify: boolean = jwt.verify(token, process.env.privateKey)

            if (verify === true) return true
            else return false
        }
    }

}

export class mailToken {

    private static privateKey: string = "mail-random" // get privateKey trough .env

    public static async Create (type: string) {
        try {
            const currentTime: number = Math.floor(Date.now() / 1000)
            const expirationTime: number = currentTime + 432000 // five days
            const privateKey: string = this.privateKey
            const username: string = ''
            const claims = {
                'exp': expirationTime, // expiration at time
                'iat': currentTime, // issued at time
                'iss': 'website-name', // get the domain name trough .env
                'username': username, // get username from database
                'type': type // type of email
            }

            const token = jwt.sign(claims, privateKey, { algorithm: 'HS256' })

            return token
        } catch (err) {
            return err
        }
    }

    public static Verify (token: string) {
        if (!token) return 'wrong'
        else {
            const verify: boolean = jwt.verify(token, this.privateKey)

            if (verify === true) return 'token is valid whatever has been reset'
            else return 'wrong'
        }
    }
}