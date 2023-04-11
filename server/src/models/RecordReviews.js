const { sequelize } = require("../config/db");
const ReviewerSchema = require("../Schemas/ReviewerSchema");
const ReviewSchema = require("../Schemas/ReviewSchema");
const CompanySchema = require("../Schemas/CompanySchema");
const EmployeesPositionSchema = require("../Schemas/EmployeesPositionSchema");
const EmploeesSchema = require("../Schemas/EmployeeSchema");

const catching = require("../utils/caching");
const { batchingAndRecording } = require("../utils/batching");

class RecordReviews {
  constructor(data, colums, values) {
    this.columnWithValues = {};
    this.data = data;
    this.colums = colums;
    this.values = values;
    this.tables = [];
    this.batchSize = 1000;
    this.ttl = 30000;

    this.keysCahe = ["Reviewers", "Companyn", "Position"];
  }

  async checkTables() {
      await ReviewerSchema.sync();
      await ReviewSchema.sync();
      await CompanySchema.sync();
      await EmployeesPositionSchema.sync();
      await EmploeesSchema.sync();
   
  }

  async myData() {

      const reviewerData = this.data.map((d) => ({
        reviewer: d.reviewer,
        email: d.email,
      }));

      await batchingAndRecording(
        reviewerData,
        this.ttl,
        this.saveDataReviewer,
        { transaction: t }
      );

      await this.getAllReviewer();

      const arrayFromCacheReviewer = catching.getCaching(this.keysCahe[0]);

      const reviewData = await Promise.all(
        this.data.map(async (d) => {
          const reviewer = arrayFromCacheReviewer.filter(
            (cech) => cech.email === d.email
          );

          return { review: d.review, reviewerId: reviewer[0].id };
        })
      );

      await batchingAndRecording(
        reviewData,
        this.batchSize,
        this.saveDataReview,
        {
          transaction: t,
        }
      );

      const companyData = this.data.map((d) => ({
        company: d.company,
        company_description: d.company_description,
      }));

      await batchingAndRecording(
        companyData,
        this.batchSize,
        this.saveDataCompany,
        {
          transaction: t,
        }
      );

      await this.getAllCompany();

      const arrayFromCacheCompany = catching.getCaching(this.keysCahe[1]);

      const employeesPositionData = this.data.map((d) => ({
        employees_position: d.employees_position,
      }));

      await batchingAndRecording(
        employeesPositionData,
        this.batchSize,
        this.saveDataEmployeesPosition,
        {
          transaction: t,
        }
      );

      await this.getAllPosition();

      const arrayFromCachePosition = catching.getCaching(this.keysCahe[2]);

      const employeeData = await Promise.all(
        this.data.map(async (d) => {
          const findReviewer = arrayFromCacheReviewer.filter(
            (cech) => cech.email === d.email
          );
          const findCompany = arrayFromCacheCompany.filter(
            (cech) => cech.company === d.company
          );
          const findPosition = arrayFromCachePosition.filter(
            (cech) => cech.employees_position === d.employees_position
          );

          return {
            employee: d.employee,
            rating: d.rating,
            unique_employee_number: d.unique_employee_number,
            companyId: findCompany[0].id,
            employees_positionId: findPosition[0].id,
            reviewerId: findReviewer[0].id,
          };
        })
      );

      await batchingAndRecording(
        employeeData,
        this.batchSize,
        this.saveDataEmploees,
        {
          transaction: t,
        }
      );

   
  }

  async saveDataReviewer(data, options) {
      await ReviewerSchema.bulkCreate(data, {
        ignoreDuplicates: true,
        ...options,
      });
 
  }

  async saveDataReview(data, t) {
      await ReviewSchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });
  }

  async saveDataCompany(data, t) {
      await CompanySchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });
  }

  async saveDataEmployeesPosition(data, t) {
      await EmployeesPositionSchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });
  }
  async saveDataEmploees(data, t) {
      await EmploeesSchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });

  }

  async getAllCompany() {
      const company = await CompanySchema.findAll();

      const result = JSON.parse(JSON.stringify(company, null, 2));

      catching.setCaching(this.keysCahe[1], result, this.ttl);

      return JSON.parse(JSON.stringify(company, null, 2));
  }

  async getAllPosition() {
      const position = await EmployeesPositionSchema.findAll();

      const result = JSON.parse(JSON.stringify(position, null, 2));

      catching.setCaching(this.keysCahe[2], result, this.ttl);

      return JSON.parse(JSON.stringify(position, null, 2));
  }

  async getAllReviewer() {
      const reviewer = await ReviewerSchema.findAll();

      const result = JSON.parse(JSON.stringify(reviewer, null, 2));

      catching.setCaching(this.keysCahe[0], result, this.ttl);

      return JSON.parse(JSON.stringify(reviewer, null, 2));
  }

  removeSpaces() {
    for (let i = 0; i < this.colums.length; i++) {
      this.columnWithValues[this.colums[i]] = this.values[i];
    }

    return this.columnWithValues;
  }

  async deleteTables() {
    await EmploeesSchema.sync({ force: true });

    await ReviewSchema.sync({ force: true });

    await ReviewerSchema.sync({ force: true });

    await CompanySchema.sync({ force: true });

    await EmployeesPositionSchema.sync({ force: true });
  }
}

module.exports = RecordReviews;
