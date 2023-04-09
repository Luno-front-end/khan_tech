const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Emploees = require("./EmployeeSchema");

const Reviewer = sequelize.define(
  "reviewer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reviewer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

Reviewer.hasMany(Emploees, { foreignKey: "reviewerId" });

module.exports = Reviewer;
