const dbConfig = require('../config/db.config');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.registered = require('./regModel.js')(sequelize, DataTypes)
db.menu = require('./menuModel.js')(sequelize, DataTypes)
db.delivery = require('./deliveryModel.js')(sequelize, DataTypes)
db.order = require('./orderModel.js')(sequelize, DataTypes)
db.product = require('./productModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('Sequalized!')
})
module.exports = db
