const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EmployeesPosition = sequelize.define(
  "employees_position",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employees_position: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["employees_position"],
      },
    ],
  }
);

module.exports = EmployeesPosition;
