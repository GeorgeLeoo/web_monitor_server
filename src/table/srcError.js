//delete//
import {formatDate} from '../utils';

const baseInfo = require('./baseInfo')
import { Table } from './utils'

const srcError = Table(
    'srcError',
    {
        ...baseInfo(Table.DataTypes),
        // ID 主键
        id: {
            type: Table.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // 页面标识
        pageKey: {
            type: Table.DataTypes.STRING(50),
            allowNull: true,
            field: 'pageKey'
        },
        // 设备名称
        deviceName: {
            type: Table.DataTypes.STRING(100),
            allowNull: true,
            field: 'deviceName'
        },
        // 系统信息
        os: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'os'
        },
        // 浏览器名称
        browserName: {
            type: Table.DataTypes.STRING(20),
            allowNull: true,
            field: 'browserName'
        },
        // 浏览器版本号
        browserVersion: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'browserVersion'
        },
        // 用户的IP
        monitorIp: {
            type: Table.DataTypes.STRING(50),
            allowNull: true,
            field: 'monitorIp'
        },
        // 国家
        country: {
            type: Table.DataTypes.STRING(20),
            allowNull: true,
            field: 'country'
        },
        // 省份
        province: {
            type: Table.DataTypes.STRING(30),
            allowNull: true,
            field: 'province'
        },
        // 城市
        city: {
            type: Table.DataTypes.STRING(30),
            allowNull: true,
            field: 'city'
        },
        // 静态资源的请求路径
        sourceUrl: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'sourceUrl'
        },
        // 静态资源的类型
        elementType: {
            type: Table.DataTypes.STRING(20),
            allowNull: true,
            field: 'elementType'
        },
        // 浏览器信息
        browserInfo: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'browserInfo'
        },
        // 仅日期，无时间
        date: {
            type: Table.DataTypes.STRING,
            allowNull: true,
            defaultValue: function () {
                return formatDate()
            }
        },
    },
    {
        indexes: [
            {
                name: 'userIdIndex',
                method: 'BTREE',
                fields: [
                    {
                        attribute: 'userId'
                    }
                ]
            },
            {
                name: 'webMonitorIdIndex',
                method: 'BTREE',
                fields: [
                    {
                        attribute: 'webMonitorId'
                    }
                ]
            },
            {
                name: 'customerKeyIndex',
                method: 'BTREE',
                fields: [
                    {
                        attribute: 'customerKey'
                    }
                ]
            },
            {
                name: 'createdAtIndex',
                method: 'BTREE',
                fields: [
                    {
                        attribute: 'createdAt'
                    }
                ]
            }
        ]
    })

module.exports = srcError
