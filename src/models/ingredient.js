module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('Ingredient',{
        title : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        value : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        price: {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        nutrient : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        },
        description : {
            type : DataTypes.STRING,
            validate:{
                notEmpty:true
            }
        }
    },
    {
        underscored: true
    });

    Ingredient.associate = db =>{
        Ingredient.belongsTo(db.Food,{
            foreignKey:{
                name:'foodId',
                allowNull:false
            }
        })
    }
    return Ingredient;
}