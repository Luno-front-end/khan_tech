const EmployeeSchema = require("../Schemas/EmployeeSchema");
const CompanySchema = require("../Schemas/CompanySchema");
const EmployeesPositionSchema = require("../Schemas/EmployeesPositionSchema");
const ReviewSchema = require("../Schemas/ReviewSchema");
const ReviewerSchema = require("../Schemas/ReviewerSchema");
const { getCaching, setCaching, checkKey } = require("../utils/caching");

class ReceivingReviews {
  constructor() {
    this.ttl = 3600000;
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
      const employee = await EmployeeSchema.findAll();

      const result = JSON.parse(JSON.stringify(employee, null, 2));

      setCaching(this.keysCahe[0], result, this.ttl);

      return JSON.parse(JSON.stringify(employee, null, 2));
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
    try {
      if (checkKey(this.keysCahe[0])) {
        console.log("ok");
        return getCaching(this.keysCahe[0]);
      } else {
        console.log("error");
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ReceivingReviews;
