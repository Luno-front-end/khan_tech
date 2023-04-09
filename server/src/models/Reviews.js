const { Op } = require("sequelize");
const { sequelize } = require("../config/db");
const ReviewerSchema = require("../Schemas/ReviewerSchema");
const ReviewSchema = require("../Schemas/ReviewSchema");
const CompanySchema = require("../Schemas/CompanySchema");
const EmployeesPositionSchema = require("../Schemas/EmployeesPositionSchema");
const EmploeesSchema = require("../Schemas/EmployeeSchema");

class Reviews {
  constructor(colums, values) {
    this.columnWithValues = {};
    this.colums = colums;
    this.values = values;
    this.tables = [
      "employees",
      "employees_positions",
      "reviewers",
      "reviews",
      "companies",
    ];
  }

  async checkTables() {
    try {
      await ReviewerSchema.sync();
      await ReviewSchema.sync();
      await CompanySchema.sync();
      await EmployeesPositionSchema.sync();
      await EmploeesSchema.sync();
    } catch (error) {
      console.log(error);
    }
  }

  removeSpaces() {
    for (let i = 0; i < this.colums.length; i++) {
      this.columnWithValues[this.colums[i]] = this.values[i];
    }

    return this.columnWithValues;
  }

  async saveDataReviewer(data) {
    data.forEach(async (item) => {
      const { Reviewer, Email } = item;

      await ReviewerSchema.findOrCreate({
        where: {
          name: Reviewer,
          email: Email,
        },
      });
    });
  }

  async saveDataReview(data) {
    data.forEach(async (item) => {
      const { Email, Review } = item;

      const reviewer = await getOneReviewer(Email);

      await ReviewSchema.bulkCreate({
        message: Review,
        reviewerId: reviewer.id,
      });
    });
  }

  async saveDataCompany(data) {
    data.forEach(async (item) => {
      const { Company, Company_description } = item;

      await CompanySchema.findOrCreate({
        where: {
          name: Company,
          descroption: Company_description,
        },
      });
    });
  }

  async saveDataEmployeesPosition(data) {
    data.forEach(async (item) => {
      const { Employees_position } = item;

      await EmployeesPositionSchema.findOrCreate({
        where: {
          name: Employees_position,
        },
      });
    });
  }

  async saveDataEmploees(data) {
    data.forEach(async (item) => {
      const {
        Email,
        Rating,
        Employee,
        Employees_position,
        Unique_employee_number,
        Company,
      } = item;

      const reviewer = await getOneReviewer(Email);
      const company = await this.getOneCompany(Company);
      const position = await this.getOnePosition(Employees_position);

      await EmploeesSchema.create({
        name: Employee,
        rating: Number(Rating),
        unique_employee_number: Unique_employee_number,
        companyId: company.id,
        employees_positionId: position.id,
        reviewerId: reviewer.id,
      })
        .then(() => console.log("Emploees created successfully"))
        .catch((err) => console.log("Error while creating Emploees", err));
    });
  }

  async getOneCompany(name) {
    const company = await CompanySchema.findOne({ where: { name: name } });

    return JSON.parse(JSON.stringify(company, null, 2));
  }

  async getOnePosition(name) {
    const position = await EmployeesPositionSchema.findOne({
      where: { name: name },
    });

    return JSON.parse(JSON.stringify(position, null, 2));
  }

  async getOneReviewer(email) {
    const reviewer = await ReviewerSchema.findOne({
      where: { email: email },
    });

    return JSON.parse(JSON.stringify(reviewer, null, 2));
  }

  async deleteTables() {
    // await CompanySchema.destroy({ where: {}, truncate: true })
    //   .then(() => console.log("Таблиця була видалена"))
    //   .catch((err) => console.log(err));
    // await EmployeesPositionSchema.destroy({ where: {}, truncate: true });
    // await ReviewSchema.destroy({ where: {}, truncate: true });
    // await EmploeesSchema.destroy({ where: {}, truncate: true });
    // await ReviewerSchema.destroy({ where: {}, truncate: true });
  }
}

module.exports = Reviews;
