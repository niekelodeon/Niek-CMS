import bcrypt from 'bcrypt'

import { passwordStrength } from 'check-password-strength'

import { Database, Queries } from '../global/database'
import { Token } from '../global/token'
import { mailServices } from './mailServices'

export class authServices {

    private static validEmail (email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    } 

    public static async Register (email: string, password: string) {
        try {
            if (password.length < 10) return { success: false, file: __filename, function: this.Register.name, message: "Password too short", logMessage: "Password too short" }
            if (!this.validEmail(email)) return { success: false, file: __filename, function: this.Register.name, message: "Email invalid", logMessage: "Email invalid" }
            
            const success = await Queries.createUser(email, await bcrypt.hash(password, 10))

            if (!success) return { success: false, file: __filename, function: this.Register.name, message: "Email already exists", logMessage: "Email already exists" }
            return { success: true, file: __filename, function: this.Register.name, message: "Register succesful", logMessage: "Register succesful" }
        } catch (err) {
            return { success: false, file: __filename, function: this.Register.name, message: "Something went wrong, please try again", logMessage: err }
        }
    }

    public static async Login (email: string, id: number, password: string) {
        try {
            const user = await Queries.getUser(email || id)
            
            if (!user) return { success: false, file: __filename, function: this.Login.name, message: "Email does not exist", logMessage: "Email does not exist" }

            if (!this.validEmail(String(email))) return { success: false, file: __filename, function: this.Login.name, message: "Email invalid", logMessage: "Email invalid" }
            const databasePassword: string = user.password
            if (!await bcrypt.compare(password, databasePassword)) return { success: false, file: __filename, function: this.Login.name, message: "Incorrect password", logMessage: "Incorrect password" }
            else {
                const databaseId: number = user.id
                const databaseEmail: string = user.email

                const token: string = Token.Create(databaseId, databaseEmail)
                return { success: true, file: __filename, function: this.Login.name, token: token, message: "Login succesful", logMessage: "Login succesful" }
            } 
        } catch (err) {
            return { success: false, message: err.message, function: this.Login.name }
        }
    }

    // public static async ForgotPassword (email: string) {
    //     // user has forgot his password or wants to change it
    // }

    // public static async ChangeMail (email: string) {
    //     // user wants to change his email
    // }

    // public static async DeleteAccount (code: number) {
    //     // user deletes his account
    // }

    // try {

    //     const alreadyExists = await Database.User.findOne({ where: { email } })
    //     if (alreadyExists) {
    //         return { success: false, file: __filename, function: this.Register.name, message: `User already exists` }
    //     } else {
    //         const rounds: number = 10
    //         const hashedPassword: string = await bcrypt.hash(password, rounds)

    //         await Database.User.create({
    //             email,
    //             password: hashedPassword
    //         })

    //         return { success: true, file: __filename, function: this.Register.name, message: "Registration succesfull", logMessage: `Registration succesfull, ${email}, ${password}` }
    //     }

    // } catch (err) {
    //     return { success: true, file: __filename, function: this.Register.name, message: err.msg }
    // }

}