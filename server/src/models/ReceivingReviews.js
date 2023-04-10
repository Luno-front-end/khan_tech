const EmployeeSchema = require("../Schemas/EmployeeSchema");
const CompanySchema = require("../Schemas/CompanySchema");
const EmployeesPositionSchema = require("../Schemas/EmployeesPositionSchema");
const ReviewSchema = require("../Schemas/ReviewSchema");
const ReviewerSchema = require("../Schemas/ReviewerSchema");
const { getCaching, setCaching, checkKey } = require("../utils/caching");

class ReceivingReviews {
  constructor(page, perPage) {
    this.page = page;
    this.perPage = perPage;
    this.ttl = 3600000;
    this.itemsPage = 15;
    this.keysCahe = [
      "employeeAll",
      "companyAll",
      "employeesPositionAll",
      "reviewAll",
      "reviewerAll",
    ];
  }

  async getAllEmployee() {
    try {
      const offset = (this.page - 1) * this.perPage;
      const limit = this.perPage;

      console.log(this.perPage);

      const employee = await EmployeeSchema.findAll({ offset, limit });

      const resault = JSON.parse(JSON.stringify(employee, null, 2));

      const count = await EmployeeSchema.count();

      const data = {
        resault,
        count,
        pages: Math.ceil(count / this.itemsPage),
      };

      setCaching(this.keysCahe[0], data, this.ttl);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async getOneCompany(id) {
    try {
      const company = await CompanySchema.findOne({
        where: { id },
      });

      return JSON.parse(JSON.stringify(company, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async getOneEmployeesPosition(id) {
    try {
      const employee = await EmployeesPositionSchema.findOne({
        where: { id },
      });

      return JSON.parse(JSON.stringify(employee, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async getOneReview(id) {
    try {
      const revuew = await ReviewSchema.findOne({
        where: { id },
      });

      return JSON.parse(JSON.stringify(revuew, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async getOneReviewer(id) {
    try {
      const reviewer = await ReviewerSchema.findOne({
        where: { id },
      });

      return JSON.parse(JSON.stringify(reviewer, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  checkCachEmployee() {
    if (checkKey(this.keysCahe[0])) {
      return getCaching(this.keysCahe[0]);
    } else {
      return [];
    }
  }
}

module.exports = ReceivingReviews;
