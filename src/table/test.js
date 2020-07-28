import { Table } from './utils'
const moment = require('moment');

const history = Table('history', {
    id: {
        type: Table.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: Table.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: Table.DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: Table.DataTypes.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
})

export default history

