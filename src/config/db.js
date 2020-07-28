import Sequelize, {DataTypes as dts} from 'sequelize'
import defaultConfig from './mysql'

const sequelize = new Sequelize(defaultConfig.dataBaseName, defaultConfig.userName, defaultConfig.password, {
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
    timezone: '+08:00' //东八时区
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.log('Unable to connect to the database:', err);
})

// module.exports = sequelize

export default sequelize

export const DataTypes = dts
