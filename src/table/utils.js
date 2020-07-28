import sequelize, { DataTypes } from './../config/db'

const TableOptions = {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    underscored: true,
    freezeTableName: true
}

export const Table = (tableName, tableAttributes = {}, tableOptions = TableOptions) => {
    const table = sequelize.define(tableName, tableAttributes, Object.assign(tableOptions, { tableName }))
    table.sync().then(() => {})
    return table
}

Table.DataTypes = DataTypes
