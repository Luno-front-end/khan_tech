const ReceivingReviews = require("../models/ReceivingReviews");

const getDataReviews = async (data) => {
  const receivingReviews = new ReceivingReviews();

  const newData = await Promise.all(
    data.resault.map(async (item) => {
      const { company } = await receivingReviews.getOneCompany(item.companyId);
      const { reviewer, id } = await receivingReviews.getOneReviewer(
        item.reviewerId
      );
      const { employees_position } =
        await receivingReviews.getOneEmployeesPosition(
          item.employees_positionId
        );
      const { review } = await receivingReviews.getOneReview(id);

      return {
        id: item.id,
        employee: item.employee,
        rating: item.rating,
        unique_employee_number: item.unique_employee_number,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        company: company,
        employees_position: employees_position,
        reviewer: reviewer,
        review: review,
      };
    })
  );

  return newData;
};

module.exports = getDataReviews;
