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

  async myData() {
    try {
      const t = await sequelize.transaction();

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

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  }

  async saveDataReviewer(data, options) {
    try {
      await ReviewerSchema.bulkCreate(data, {
        ignoreDuplicates: true,
        ...options,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async saveDataReview(data, t) {
    try {
      await ReviewSchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async saveDataCompany(data, t) {
    try {
      await CompanySchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async saveDataEmployeesPosition(data, t) {
    try {
      await EmployeesPositionSchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async saveDataEmploees(data, t) {
    try {
      await EmploeesSchema.bulkCreate(data, {
        ignoreDuplicates: true,
      });

      console.log("seccessful");
    } catch (error) {
      console.log("error");
    }
  }

  async getAllCompany() {
    try {
      const company = await CompanySchema.findAll();

      const result = JSON.parse(JSON.stringify(company, null, 2));

      catching.setCaching(this.keysCahe[1], result, this.ttl);

      return JSON.parse(JSON.stringify(company, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPosition() {
    try {
      const position = await EmployeesPositionSchema.findAll();

      const result = JSON.parse(JSON.stringify(position, null, 2));

      catching.setCaching(this.keysCahe[2], result, this.ttl);

      return JSON.parse(JSON.stringify(position, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getAllReviewer() {
    try {
      const reviewer = await ReviewerSchema.findAll();

      const result = JSON.parse(JSON.stringify(reviewer, null, 2));

      catching.setCaching(this.keysCahe[0], result, this.ttl);

      return JSON.parse(JSON.stringify(reviewer, null, 2));
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

module.exports = RecordReviews;
