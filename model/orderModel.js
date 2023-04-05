module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("order", {
        customerid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productid:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    
    })

    return Order

}