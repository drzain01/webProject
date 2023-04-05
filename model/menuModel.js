module.exports = (sequelize, DataTypes) => {

    const Menu = sequelize.define("menu", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        info: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    })

    return Menu

}