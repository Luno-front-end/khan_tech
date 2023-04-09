const { Op } = require("sequelize");
const { sequelize } = require("../config/db");
const ReviewerSchema = require("../Schemas/ReviewerSchema");
const ReviewSchema = require("../Schemas/ReviewSchema");
const CompanySchema = require("../Schemas/CompanySchema");
const EmployeesPositionSchema = require("../Schemas/EmployeesPositionSchema");
const EmploeesSchema = require("../Schemas/EmployeeSchema");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const keyReviewer = "Reviewers";
const keyCompanyn = "Companyn";
const keyPosition = "Position";

const keys = ["Reviewers", "Companyn", "Position"];

const ttl = 300000;

class Test {
  constructor(newData) {
    this.data = newData;
  }

  async myData() {
    try {
      const t = await sequelize.transaction();
      let batchSize = 1000;
      let batches = [];

      const reviewerData = this.data
        .filter((d) => d.reviewer && d.email)
        .map((d) => ({ reviewer: d.reviewer, email: d.email }));

      for (let i = 0; i < reviewerData.length; i += batchSize) {
        batches.push(reviewerData.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        await this.saveDataReviewer(batch, t);
      }
      batches = [];

      await this.getOneReviewer();

      const cachedArrayReviewer = cache.get(keyReviewer);

      const arrayFromCacheReviewer = cachedArrayReviewer
        ? cachedArrayReviewer
        : [];

      const reviewData = await Promise.all(
        this.data
          .filter((d) => d.review)
          .map(async (d) => {
            const reviewer = arrayFromCacheReviewer.filter(
              (cech) => cech.email === d.email
            );

            return { review: d.review, reviewerId: reviewer[0].id };
          })
      );

      for (let i = 0; i < reviewData.length; i += batchSize) {
        batches.push(reviewData.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        await this.saveDataReview(batch, t);
      }
      batches = [];

      const companyData = this.data
        .filter((d) => d.company && d.company_description)
        .map((d) => ({
          company: d.company,
          company_description: d.company_description,
        }));

      for (let i = 0; i < companyData.length; i += batchSize) {
        batches.push(companyData.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        await this.saveDataCompany(batch, t);
      }
      batches = [];
      await this.getOneCompany();

      const cachedArrayCompanyn = cache.get(keyCompanyn);

      const arrayFromCacheCompanyn = cachedArrayCompanyn
        ? cachedArrayCompanyn
        : [];

      const employeesPositionData = this.data
        .filter((d) => d.employees_position)
        .map((d) => ({ employees_position: d.employees_position }));

      for (let i = 0; i < employeesPositionData.length; i += batchSize) {
        batches.push(employeesPositionData.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        this.saveDataEmployeesPosition(batch, t);
      }
      batches = [];

      await this.getOnePosition();

      const cachedArrayPosition = cache.get(keyPosition);

      const arrayFromCachePosition = cachedArrayPosition
        ? cachedArrayPosition
        : [];

      const employeeData = await Promise.all(
        this.data
          .filter((d) => d.employee && d.rating && d.unique_employee_number)
          .map(async (d) => {
            // const findReviewer = await this.getOneReviewer(d.email);
            const findReviewer = arrayFromCacheReviewer.filter(
              (cech) => cech.email === d.email
            );
            const findCompany = arrayFromCacheCompanyn.filter(
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

      for (let i = 0; i < employeeData.length; i += batchSize) {
        batches.push(employeeData.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        await this.saveDataEmploees(batch, t);
      }
      batches = [];
      // await t.commit();
    } catch (error) {
      console.log(error);
      // await t.rollback();
    }
  }

  async saveDataReviewer(data, t) {
    try {
      await ReviewerSchema.bulkCreate(data, {
        ignoreDuplicates: true,
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

    // .then(() => {console.log("seccess")})
    // .catch(() => console.log("error"));
  }

  async getOneCompany(name) {
    try {
      const company = await CompanySchema.findAll();

      // {
      //   where: { company: name },
      // }

      cache.set(keyCompanyn, JSON.parse(JSON.stringify(company, null, 2)), ttl);

      return JSON.parse(JSON.stringify(company, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getOnePosition(name) {
    try {
      const position = await EmployeesPositionSchema.findAll();

      // {
      //   where: { employees_position: name },
      // }

      cache.set(
        keyPosition,
        JSON.parse(JSON.stringify(position, null, 2)),
        ttl
      );

      return JSON.parse(JSON.stringify(position, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getOneReviewer(email) {
    try {
      const reviewer = await ReviewerSchema.findAll();

      cache.set(
        keyReviewer,
        JSON.parse(JSON.stringify(reviewer, null, 2)),
        ttl
      );

      return JSON.parse(JSON.stringify(reviewer, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async dellCeche() {
    keys.forEach((key) => {
      cache.del(key);
    });
  }
}

module.exports = Test;
