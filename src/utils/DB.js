import Sequelize, { DataTypes as dts } from 'sequelize'

export class DB {
    init (database, username, password, ...options) {
        this.sequelize = new Sequelize(database, username, password, ...options)
        return this.sequelize
    }
    
    open (cb) {
        this.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.')
            typeof cb === 'function' && cb()
        }).catch(err => {
            console.log('Unable to connect to the database:', err)
        })
        return this.sequelize
    }
}

DB.DataTypes = dts

export default new DB()
