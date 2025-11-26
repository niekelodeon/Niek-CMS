import nodemailer from 'nodemailer'

import { Token } from '../global/token'
import { MailTypes } from '../global/interfaces'

export class mailServices {
    private static Config() {
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
                pass: serverPassword,
            },
        })
    }

    public static async sendResetMail(email: string, resetToken: string) {
        try {
            const serverEmail: string = `random@random.com`

            const mail = {
                from: serverEmail,
                to: email,
                subject: 'FTP - Reset Password',
                html: `
                    <h1>Password Reset</h1>
                    <p>You requested a password reset.</p>
                    <p>Click below to reset your password:</p>

                    <a href="http://localhost:5173/reset${resetToken}" 
                        style="background:#6366f1;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;">
                        Reset Password
                    </a>

                    <p>This link is valid for 15 minutes.</p>
                `,
            }

            const config = new mailServices.Config()
            config.sendMail(mail)

            return { success: true, message: 'Email sent', function: this.sendResetMail.name }
        } catch (err) {
            return { success: false, message: err.msg }
        }
    }
}
