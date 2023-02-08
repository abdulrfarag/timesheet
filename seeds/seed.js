const sequelize = require('../config/connection');
const { User, Timesheet } = require('../models');

const userData = require('./userData.json');
const timesheetData = require('./timesheetData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const timesheet of timesheetData) {
    await Timesheet.create({
      ...timesheet,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
