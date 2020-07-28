import { Table } from './utils'
const moment = require('moment');

const user = Table('user', {
    id: {
        type: Table.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: Table.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Table.DataTypes.STRING,
        allowNull: false
    }
})

export default user
