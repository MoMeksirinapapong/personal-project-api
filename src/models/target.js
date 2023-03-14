module.exports = (sequelize, DataTypes) => {
    const Target = sequelize.define('Target',{
        title:{
            type: DataTypes.STRING,
            validate:{
                notEmpty: true
            }
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        }
    },
    {
        underscored: true
    }
    );

    Target.associate = db => {
        Target.hasMany(db.SubTarget,{
            foreignKey:{
                name:'targetId',
                allowNull:false
            }
        })
    }
    return Target;
};