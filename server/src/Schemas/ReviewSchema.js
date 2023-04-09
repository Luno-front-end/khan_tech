const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Reviewer = require("./ReviewerSchema");

const Review = sequelize.define("review", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Review.belongsTo(Reviewer, { foreignKey: "reviewerId" });
Reviewer.hasMany(Review, { foreignKey: "reviewerId" });

module.exports = Review;
