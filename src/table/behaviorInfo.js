//delete//
const baseInfo = require('./baseInfo')
import { Table } from './utils'

const behaviorInfo = Table(
    'behaviorInfo',
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
        // 行为类型
        behaviorType: {
            type: Table.DataTypes.STRING(20),
            allowNull: true,
        },
        // 元素的类名
        className: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'className'
        },
        // Input 框的placeholder
        placeholder: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'placeholder'
        },
        // 输入的内容
        inputValue: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'inputValue'
        },
        // 输入的内容
        tagName: {
            type: Table.DataTypes.STRING(15),
            allowNull: true,
            field: 'tagName'
        },
        // 元素包含的内容
        innerText: {
            type: Table.DataTypes.TEXT,
            allowNull: true,
            field: 'innerText'
        }
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

module.exports = behaviorInfo
