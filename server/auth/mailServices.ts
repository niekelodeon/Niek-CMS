import nodemailer from 'nodemailer'

import { Token } from '../global/token'
import { MailTypes } from '../global/interfaces'

export class mailServices {

    private static async createToken () {
        const token: string = await Token.Create()

        return token
    } 

    private static mailTypes: Object = {
        resetPassword: { subject: `Reset your password`, text: `Reset your password` },
        resetMail: { subject: '', text: '' },
        deleteAccount: { subject: '', text: '' },
    }

    private static Config () {
        const serverHost: string = 'smtp.bitsmail.com' // get the mail server through .env
        const serverPort: number = 587 // get the mail server port through .env
        const serverEmail: string = `random@random.com`
        const serverPassword: string = `random-password` // the senders password

        nodemailer.createTransport({
            host: serverHost,
            port: serverPort,
            secure: false, // should be true on deployment
            auth: {
                user: serverEmail,
                pass: serverPassword
            }
        })
    }

    public static async sendMail (email: string, type: keyof MailTypes) {
        try {
            const serverEmail: string = `random@random.com` 

            const subject: string = this.mailTypes[type].subject
            const text: string = this.mailTypes[type].text

            const mail = {
                from: serverEmail,
                to: email,
                subject: subject,
                text: text
            }

            const config = new mailServices.Config()
            config.sendMail(mail)

            return { success: true, message: "Email sent", function: this.sendMail.name }
        } catch (err) {
            return { success: false, message: err.msg }
        }
    }
}

