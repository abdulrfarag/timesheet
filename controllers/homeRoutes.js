const router = require('express').Router();
const { Timesheet, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all timesheets and JOIN with user data
      const timesheetData = await Timesheet.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });


    // Serialize data so the template can read it
    const timesheets = timesheetData.map((timesheet) => timesheet.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { 
        timesheets, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/timesheet/:id', async (req, res) => {
    try {
      const timesheetData = await Timesheet.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      const timesheet = timesheetData.get({ plain: true });

    res.render('timesheet', {
      ...timesheet,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Timesheet }],
      });

      const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;

