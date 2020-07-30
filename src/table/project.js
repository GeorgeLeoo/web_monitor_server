import { Table } from './utils'

const project = Table('project', {
    id: {
        type: Table.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    projectName: {
        type: Table.DataTypes.STRING,
        allowNull: false
    },
    projectKey: {
        type: Table.DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: Table.DataTypes.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: Table.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
})

export default project

