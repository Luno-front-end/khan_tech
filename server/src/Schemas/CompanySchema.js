const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Company = sequelize.define(
  "company",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    company_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["company"],
      },
    ],
  }
);

module.exports = Company;
