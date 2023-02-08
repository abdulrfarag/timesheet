const User = require('./User');
const Timesheet = require('./Timesheet');


User.hasMany(Timesheet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Timesheet.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = {User, Timesheet};
