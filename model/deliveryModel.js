module.exports = (sequelize, DataTypes) => {

    const Delivery = sequelize.define("delivery", {
        customerid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderid: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    })

    return Delivery

}