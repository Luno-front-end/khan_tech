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

Review.belongsTo(Reviewer, {
  foreignKey: {
    name: "reviewerId",
    allowNull: false,
  },
  sourceKey: "id",
});
Reviewer.hasMany(Review, {
  foreignKey: {
    name: "reviewerId",
    allowNull: false,
  },
  sourceKey: "id",
});

module.exports = Review;
