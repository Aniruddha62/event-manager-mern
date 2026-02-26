
const router = require('express').Router();
const Event = require('../models/Event');

router.post('/', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
