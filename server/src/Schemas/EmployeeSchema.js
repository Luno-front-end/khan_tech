const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Company = require("./CompanySchema");
const EmployeesPosition = require("./EmployeesPositionSchema");

const Employee = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  employee: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  unique_employee_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Employee.belongsTo(Company, {
  foreignKey: {
    name: "companyId",
    allowNull: false,
  },
  sourceKey: "id",
});
Employee.belongsTo(EmployeesPosition, {
  foreignKey: {
    name: "employees_positionId",
    allowNull: false,
  },
  sourceKey: "id",
});

module.exports = Employee;
