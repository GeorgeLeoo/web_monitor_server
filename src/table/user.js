import { Table } from './utils'

const user = Table('user', {
    id: {
        type: Table.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    username: {
        type: Table.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Table.DataTypes.STRING,
        allowNull: false
    }
})

export default user

