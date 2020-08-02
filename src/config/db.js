import db, { DB, Op } from '../lib/DB/DB'

import defaultConfig from './mysql'

const options = {
    host: defaultConfig.ip,
    port: defaultConfig.port,
    dialect: 'mysql',
    logging: (sql) => {
        // 这里处理sql的日志，暂时不打印
        // console.log(sql.length)
    },
    dialectOptions: {
        charset: 'utf8mb4',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 50,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00', //东八时区
    operatorsAliases: Op
}

const mysql = db.init(
    defaultConfig.dataBaseName,
    defaultConfig.userName,
    defaultConfig.password,
    options
)

db.open()

export default mysql

export const DataTypes = DB.DataTypes
