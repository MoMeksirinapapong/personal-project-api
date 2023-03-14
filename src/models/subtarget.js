module.exports = (sequelize, DataTypes) => {
    const SubTarget = sequelize.define('SubTarget',{
        title:{
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        underscored: true
    });
//Relation between SubTarget -> target,food
SubTarget.associate = db =>{
    SubTarget.hasMany(db.Food,{
        foreignKey:{
            name:'subtargetId',
            allowNull:false
        }
    })
    SubTarget.belongsTo(db.Target,{
        foreignKey:{
            name:'targetId',
            allowNull:false
        }
    })   
}
return SubTarget;
};