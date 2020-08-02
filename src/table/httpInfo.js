//delete//
const baseInfo = require('./baseInfo')
import { Table } from './utils'

const httpInfo = Table(
    'httpInfo',
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
        // 浏览器信息
        browserInfo: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'browserInfo'
        },
        // 接口请求的完整URL
        httpUrl: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'httpUrl'
        },
        // 接口请求的简洁URL
        simpleHttpUrl: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'simpleHttpUrl'
        },
        // 接口状态
        status: {
            type: Table.DataTypes.STRING(20),
            allowNull: true,
            field: 'status'
        },
        // 接口状态描述
        statusText: {
            type: Table.DataTypes.STRING(50),
            allowNull: true,
            field: 'statusText'
        },
        // 接口结果状态
        statusResult: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'statusResult'
        },
        // 接口耗时
        loadTime: {
            type: Table.DataTypes.STRING(13),
            allowNull: true,
            field: 'loadTime'
        },
        // 接口耗时
        type: {
            type: Table.DataTypes.STRING(13),
            allowNull: true
        },
        // 接口耗时
        timeStamp: {
            type: Table.DataTypes.STRING(13),
            allowNull: true
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

module.exports = httpInfo
