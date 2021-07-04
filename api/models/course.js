'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "An entry is required for the course title"
        },
        notEmpty: {
          msg: "Please enter a valid value for the course title"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "An entry is required for the course description"
        },
        notEmpty: {
          msg: "Please enter a valid value for the course description"
        }
      }
    },
    estimatedTime: DataTypes.STRING,
    materialsNeeded: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
        foreignKey: {
          fieldName: "userId"
        }
      })
  }
  return Course;
};