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
    unique: true,
  },
});

Employee.belongsTo(Company, { foreignKey: "companyId" });
Employee.belongsTo(EmployeesPosition, { foreignKey: "employees_positionId" });

module.exports = Employee;
