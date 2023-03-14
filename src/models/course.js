module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course',{
        specificdate:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        numberPeople:{
            type : DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        meal:{
            type : DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate:{
                notEmpty:true
            }
        },
        totalPrice:{
            type : DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate:{
                notEmpty:true
            }
        }
        
    },
    {
        underscored: true
    }
    );
// Relation between Course and User
    Course.associate = db => {
        Course.belongsTo(db.User,{
            foreignKey:{
                name:'userId',
                allowNull:false
            }
        })

        Course.belongsTo(db.Food,{
            foreignKey:{
                name:'foodId',
                allowNull:false
            }
        })
    }
    return Course;
};