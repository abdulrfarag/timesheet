const router = require('express').Router();
const { Timesheet } = require('../../models')
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newTimesheet = await Timesheet.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTimesheet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const timesheetData = await Timesheet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!timesheetData) {
      res.status(404).json({ message: 'No timesheet found with this id!' });
      return;
    }

    res.status(200).json(timesheetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
