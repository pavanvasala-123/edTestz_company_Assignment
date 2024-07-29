const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("appointmentsdata", "root", "pavan123", {
  host: "localhost",
  dialect: 'mysql'
});

module.exports = sequelize;

