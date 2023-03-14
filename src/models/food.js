module.exports = (sequelize, DataTypes) => {
    const Food = sequelize.define('Food',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        picture:{
            type : DataTypes.STRING,
            validate:{
                notEmpty: true
            }
        },
        totalprice:{
            type : DataTypes.STRING,
            validate:{
                notEmpty: true
            }
        }
    },
    {
        underscored: true
    }
    );
    Food.associate = db =>{
        Food.hasMany(db.Course,{
            foreignKey:{
                name:'foodId',
                allowNull: false
            }
        })
        Food.belongsTo(db.SubTarget,{
            foreignKey:{
                name:'subtargetId',
                allowNull:false
            }
        })

        Food.hasMany(db.Ingredient,{
            foreignKey:{
                name:'foodId',
                allowNull:false            }
        })
    }
    return Food;
};