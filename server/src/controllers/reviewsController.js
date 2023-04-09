const RecordReviews = require("../models/RecordReviews");
const ReceivingReviews = require("../models/receivingReviews");

const getAllReviws = async (req, res) => {
  try {
    const limit = req.query.limit;
    const ignore = req.query.ignore;

    // const allReviews = new RecordReviews()
    // await allReviews.get

    const receivingReviews = new ReceivingReviews();
    const cachEmployeeLength = receivingReviews.checkCachEmployee().length;

    if (cachEmployeeLength === 0) {
      const emmploees = await receivingReviews.getAllEmployee();

      const pagination = emmploees.slice(ignore, limit);

      const newData = await Promise.all(
        pagination.map(
          async ({
            id,
            employee,
            rating,
            unique_employee_number,
            createdAt,
            updatedAt,
            companyId,
            employees_positionId,
            reviewerId,
          }) => {
            const { company } = await receivingReviews.getOneCompany(companyId);
            const { reviewer } = await receivingReviews.getOneReviewer(
              reviewerId
            );
            const { employees_position } =
              await receivingReviews.getOneEmployeesPosition(
                employees_positionId
              );
            return {
              id,
              employee,
              rating,
              unique_employee_number,
              createdAt,
              updatedAt,
              company,
              employees_position,
              reviewer,
            };
          }
        )
      );
      return res.status(200).json({ employees: newData });
    } else {
      const emmploees = receivingReviews.checkCachEmployee();

      const pagination = emmploees.slice(ignore, limit);

      const newData = await Promise.all(
        pagination.map(
          async ({
            id,
            employee,
            rating,
            unique_employee_number,
            createdAt,
            updatedAt,
            companyId,
            employees_positionId,
            reviewerId,
          }) => {
            const { company } = await receivingReviews.getOneCompany(companyId);
            const { reviewer } = await receivingReviews.getOneReviewer(
              reviewerId
            );
            const { employees_position } =
              await receivingReviews.getOneEmployeesPosition(
                employees_positionId
              );
            return {
              id,
              employee,
              rating,
              unique_employee_number,
              createdAt,
              updatedAt,
              company,
              employees_position,
              reviewer,
            };
          }
        )
      );

      return res.status(200).json({ employees: newData });
    }

    // await receivingReviews.getAllEmployee();
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

// Reviewers
// Company
// Reviews
// Employee
// Rating

module.exports = { getAllReviws };
