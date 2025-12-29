import sequelize from 'sequelize'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import { Sequelize, DataTypes } from '@sequelize/core'
import { MariaDbDialect } from '@sequelize/mariadb'

dotenv.config()

export class Database {
    
    public static sequelize = new Sequelize({
            dialect: MariaDbDialect,
            host: String(process.env.host),
            port: Number(process.env.databasePort),
            database: String(process.env.database),
            user: String(process.env.user),
            password: String(process.env.password),
            showWarnings: Boolean(true),
            connectTimeout: Number(1000)
    })  

    public static User = this.sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'Users',
            timestamps: true,
            paranoid: true,
            hooks: {
                beforeCreate: (user, options) => {
                    // user.password = hashPassword(user.password)
                }
            }
        }
    )

    public static Connection = this.sequelize.define(
        'User Connection',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    model: this.User, 
                    key: 'id',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            host: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            port: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'User Connection',
            timestamps: true,
            paranoid: false,
            hooks: {
                beforeCreate: (user, options) => {
                    // user.password = hashPassword(user.password)
                }
            }
        }
    )

    public static async Sync () {
        try {
            Database.sequelize.sync()
            console.log(`Database synchronized successful`)
        } catch (err) {
            console.log(`Database synchronized unsuccessful`, err)
        }
    }

}

export class Queries {
    // Auth:
    public static async createUser (email: string, password: string) {
        try {
            const exists = await Database.User.findOne({ where: { email } })

            if (exists) return false
            else {
                const user = await Database.User.create({
                    email,
                    password
                })

                const userId = user.getDataValue('id')

                await Database.Connection.create({
                    userId: userId,
                    name: null,
                    host: null,
                    port: null,
                    user: null,
                    password: null,
                })

                return true
            }
        } catch (err) {
            return err
        }
    }

    public static async getUser (identifier: string | number) {
        try {
            const where = typeof identifier === 'string' 
            ? { email: identifier } 
            : { id: identifier }

            const user = await Database.User.findOne({ where: where })

            if (!user) return false
            else return user    
        } catch (err) {
            return err
        }
    }

    public static async updateEmail (id: number, email: string) {
        try {
            await Database.User.update(
                { email: email },
                { where: {id} }
            )

            return true
        } catch (err) {
            return err
        }
    }

    public static async updatePassword (id: number, password: string) {
        try {
            await Database.User.update(
                { password: password }, 
                { where: { id } }
            )
            
            return true
        } catch (err) {
            return err
        }
    }


    public static async deleteUser (id: number, userId: number) {
        try {
            const destroyUser = await Database.User.destroy({ where: { id } })
            const destroyConnection = await Database.Connection.destroy({ where: { userId } })

            if (!destroyUser && !destroyConnection) return false 
            else return true
        } catch (err) {
            return err
        }        
    }

    // Connections:
    public static async getConnection (userId: number) {
        try {
            const connection = await Database.Connection.findOne({
                where: { userId },
                attributes: ['userId', 'name', 'host', 'port', 'user', 'password'],
            })

            if (!connection) return null

            return connection.get({ plain: true })
        } catch (err) {
            return err
        }
    }

    public static async saveConnection (userId: number, name: string, host: string, port: string, user: string, password: string) {
        try {
            await Database.Connection.update(
                {
                    name,
                    host,
                    port,
                    user,
                    password,
                },
                {
                    where: { userId }
                }
            )

            return true
        } catch (err) {
            return err
        }
    }
}

