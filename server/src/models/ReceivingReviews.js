const EmployeeSchema = require("../Schemas/EmployeeSchema");
const CompanySchema = require("../Schemas/CompanySchema");
const EmployeesPositionSchema = require("../Schemas/EmployeesPositionSchema");
const ReviewSchema = require("../Schemas/ReviewSchema");
const ReviewerSchema = require("../Schemas/ReviewerSchema");

class ReceivingReviews {
  constructor(page, perPage) {
    this.page = page;
    this.perPage = perPage;
    this.itemsPage = 15;

  }

  async getAllEmployee() {
    const offset = (this.page - 1) * this.perPage;
    const limit = this.perPage;

    const employee = await EmployeeSchema.findAll({ offset, limit });

    const resault = JSON.parse(JSON.stringify(employee, null, 2));

    const count = await EmployeeSchema.count();

    const data = {
      resault,
      count,
      pages: Math.ceil(count / this.itemsPage),
    };


    return data;
  }
  async getOneCompany(id) {
    const company = await CompanySchema.findOne({
      where: { id },
    });

    return JSON.parse(JSON.stringify(company, null, 2));
  }

  async getOneEmployeesPosition(id) {
    const employee = await EmployeesPositionSchema.findOne({
      where: { id },
    });
    return JSON.parse(JSON.stringify(employee, null, 2));
  }

  async getOneReview(id) {
    const revuew = await ReviewSchema.findOne({
      where: { id },
    });

    return JSON.parse(JSON.stringify(revuew, null, 2));
  }

  async getOneReviewer(id) {
    const reviewer = await ReviewerSchema.findOne({
      where: { id },
    });

    return JSON.parse(JSON.stringify(reviewer, null, 2));
  }
}

module.exports = ReceivingReviews;
