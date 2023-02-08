const router = require('express').Router();
const userRoutes = require('./userRoutes');
const timesheetRoutes = require('./timesheetRoutes');

router.use('/users', userRoutes);
router.use('/timesheets', timesheetRoutes);

module.exports = router;
