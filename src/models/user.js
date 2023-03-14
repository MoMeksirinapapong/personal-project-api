module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      conpass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  );
  // Relation between User and Course
  User.associate = (db) => {
    User.hasMany(db.Course, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  };
  return User;
};
